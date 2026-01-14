# n8n Workflow - Google OAuth Tokens (Updated)

## What Changed?

NextAuth **already does the token exchange** for us. We don't get the `code`, we get the **tokens directly**.

---

## New Webhook Payload

### Event 1: `google_oauth_tokens`

```json
{
  "event": "google_oauth_tokens",
  "timestamp": "2026-01-13T19:59:00.000Z",
  "tokens": {
    "access_token": "ya29.a0AfB_byC...",
    "refresh_token": "1//0gXXX...",
    "expires_at": 1705176540,
    "token_type": "Bearer",
    "scope": "openid https://www.googleapis.com/auth/userinfo.email ..."
  },
  "oauth_config": {
    "client_id": "YOUR_GOOGLE_CLIENT_ID"
  },
  "user": {
    "id": "103268293102436136997",
    "email": "emrebostanoglu@gmail.com",
    "name": "Emre Bostanoğlu",
    "image": "https://lh3.googleusercontent.com/..."
  },
  "profile": {
    "email_verified": true,
    "locale": "tr"
  }
}
```

### Event 2: `user_signup_google`

```json
{
  "event": "user_signup_google",
  "timestamp": "2026-01-13T19:59:00.000Z",
  "user": {
    "id": "103268293102436136997",
    "email": "emrebostanoglu@gmail.com",
    "name": "Emre Bostanoğlu",
    "image": "https://lh3.googleusercontent.com/..."
  },
  "provider": "google",
  "metadata": {
    "loginMethod": "google",
    "environment": "development"
  }
}
```

---

## n8n Workflow (Simplified)

### 1. Webhook Node
- **Method:** POST
- **Path:** `/webhook-test/bilgefokusauth`

### 2. Switch Node
- **Expression:** `{{$json.body.event}}`
- **Routes:**
  - `google_oauth_tokens` → Save Tokens
  - `user_signup_google` → Create/Update User
  - `user_signin` → Update Last Login
  - `user_signout` → Log Activity

### 3. Save Tokens (google_oauth_tokens route)

**No HTTP Request needed!** Tokens are already in the payload.

**Database Insert:**
```sql
INSERT INTO user_tokens (
  user_id,
  access_token,
  refresh_token,
  expires_at,
  token_type,
  scope,
  created_at
) VALUES (
  '{{ $json.body.user.id }}',
  '{{ $json.body.tokens.access_token }}',
  '{{ $json.body.tokens.refresh_token }}',
  to_timestamp({{ $json.body.tokens.expires_at }}),
  '{{ $json.body.tokens.token_type }}',
  '{{ $json.body.tokens.scope }}',
  NOW()
)
ON CONFLICT (user_id) DO UPDATE SET
  access_token = EXCLUDED.access_token,
  refresh_token = EXCLUDED.refresh_token,
  expires_at = EXCLUDED.expires_at,
  updated_at = NOW();
```

### 4. Create/Update User (user_signup_google route)

```sql
INSERT INTO users (
  google_id,
  email,
  name,
  image,
  provider,
  created_at
) VALUES (
  '{{ $json.body.user.id }}',
  '{{ $json.body.user.email }}',
  '{{ $json.body.user.name }}',
  '{{ $json.body.user.image }}',
  'google',
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  image = EXCLUDED.image,
  last_login = NOW();
```

---

## n8n JSON Paths

### For `google_oauth_tokens` event:

```javascript
// Access Token
{{ $json.body.tokens.access_token }}

// Refresh Token
{{ $json.body.tokens.refresh_token }}

// Expires At (Unix timestamp)
{{ $json.body.tokens.expires_at }}

// User Email
{{ $json.body.user.email }}

// User ID
{{ $json.body.user.id }}
```

### For `user_signup_google` event:

```javascript
// User Email
{{ $json.body.user.email }}

// User Name
{{ $json.body.user.name }}

// User Image
{{ $json.body.user.image }}

// Provider
{{ $json.body.provider }}
```

---

## Complete Workflow Diagram

```
Webhook (POST)
    ↓
Switch (event type)
    ↓
├─ google_oauth_tokens
│   ↓
│   Save Tokens to DB (Direct - No HTTP Request!)
│   ↓
│   Encrypt Tokens (Optional)
│   ↓
│   Log Activity
│
├─ user_signup_google
│   ↓
│   Create/Update User in DB
│   ↓
│   Send Welcome Email
│   ↓
│   Log Activity
│
├─ user_signin (demo)
│   ↓
│   Update Last Login
│   ↓
│   Log Activity
│
└─ user_signout
    ↓
    Log Activity
```

---

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    image TEXT,
    provider VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tokens table (separate for security)
CREATE TABLE user_tokens (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE REFERENCES users(google_id),
    access_token TEXT NOT NULL, -- Encrypt this!
    refresh_token TEXT, -- Encrypt this!
    expires_at TIMESTAMP,
    token_type VARCHAR(50),
    scope TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity log
CREATE TABLE auth_events (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    event_type VARCHAR(50),
    provider VARCHAR(50),
    timestamp TIMESTAMP DEFAULT NOW(),
    metadata JSONB
);
```

---

## Security Best Practices

1. **Encrypt tokens** in database (use pgcrypto or application-level encryption)
2. **Don't log tokens** in n8n execution history
3. **Rotate refresh tokens** periodically
4. **Check token expiry** before using access_token
5. **Use HTTPS** for all communications

---

## Token Refresh (When access_token expires)

```javascript
// In n8n HTTP Request Node
// URL: https://oauth2.googleapis.com/token
// Method: POST
// Body (x-www-form-urlencoded):
{
  "client_id": "YOUR_GOOGLE_CLIENT_ID",
  "client_secret": "YOUR_GOOGLE_CLIENT_SECRET",
  "refresh_token": "{{ $json.refresh_token }}",
  "grant_type": "refresh_token"
}
```

---

**No more HTTP Request for initial token exchange!**  
**NextAuth does it for us, we just save the tokens.** ✅

