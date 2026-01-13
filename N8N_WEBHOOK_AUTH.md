# n8n Webhook Integration - Authentication Events

## 📡 Webhook URL

```
https://n8n.fokusistatistik.com/webhook-test/bilgefokusauth
```

## 🔐 Google OAuth Configuration

**Client ID:**
```
398275435767-ckf3v121u35skmlgufhah8mccc7gja95.apps.googleusercontent.com
```

**Note:** Same Client ID is used for both login and signup (Google OAuth standard)

---

## 📨 Webhook Events

### 1. User Signup (New User)

**Trigger:** First time Google login or new credentials registration

**Payload:**
```json
{
  "event": "user_signup",
  "timestamp": "2026-01-13T19:23:11.000Z",
  "user": {
    "id": "google_123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "https://lh3.googleusercontent.com/..."
  },
  "provider": "google",
  "metadata": {
    "emailVerified": true,
    "locale": "tr"
  }
}
```

### 2. User Signin (Existing User)

**Trigger:** Returning user login

**Payload:**
```json
{
  "event": "user_signin",
  "timestamp": "2026-01-13T19:25:30.000Z",
  "user": {
    "id": "google_123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "https://lh3.googleusercontent.com/..."
  },
  "provider": "google",
  "metadata": {
    "emailVerified": true,
    "locale": "tr"
  }
}
```

### 3. Session Update

**Trigger:** User profile update or session refresh

**Payload:**
```json
{
  "event": "session_update",
  "timestamp": "2026-01-13T19:30:00.000Z",
  "user": {
    "id": "google_123456789",
    "email": "user@example.com",
    "name": "John Doe Updated"
  }
}
```

### 4. User Signout

**Trigger:** User logs out

**Payload:**
```json
{
  "event": "user_signout",
  "timestamp": "2026-01-13T19:35:00.000Z",
  "user": {
    "id": "google_123456789",
    "email": "user@example.com"
  }
}
```

---

## 🔧 n8n Workflow Setup

### Recommended Workflow Structure

```
1. Webhook Trigger (POST)
   ↓
2. Switch Node (based on event type)
   ↓
3a. user_signup → Create user in database
3b. user_signin → Update last login
3c. session_update → Update user profile
3d. user_signout → Log activity
   ↓
4. Send confirmation email (optional)
   ↓
5. Log to analytics (optional)
```

### Example n8n Nodes

**1. Webhook Node:**
- Method: POST
- Path: `/webhook-test/bilgefokusauth`
- Response: Return 200 OK

**2. Switch Node:**
- Mode: Expression
- Expression: `{{$json.event}}`
- Routes:
  - `user_signup`
  - `user_signin`
  - `session_update`
  - `user_signout`

**3. Database Operations:**
- For `user_signup`: INSERT new user
- For `user_signin`: UPDATE last_login timestamp
- For `session_update`: UPDATE user profile
- For `user_signout`: INSERT activity log

---

## 🗄️ Recommended Database Schema

```sql
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    image TEXT,
    provider VARCHAR(50),
    email_verified BOOLEAN DEFAULT FALSE,
    locale VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_events (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    event_type VARCHAR(50),
    provider VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 🧪 Testing

### Local Testing

1. Start development server:
```bash
npm run dev
```

2. Go to: `http://localhost:3000/login`

3. Click "Google ile Giriş Yap"

4. Check n8n webhook executions

### Production Testing

1. Deploy to server

2. Go to: `https://bilge.fokusistatistik.com/login`

3. Login with Google

4. Verify webhook received data

---

## 🔍 Debugging

### Check Webhook Logs

In n8n:
1. Go to Executions
2. Filter by workflow
3. Check webhook payload

### Console Logs

Application logs will show:
```
Successfully sent to n8n webhook: user_signup
```

Or errors:
```
n8n webhook error: 404 Not Found
Failed to send to n8n webhook: [error details]
```

---

## ⚙️ Environment Variables

### Required

```env
# n8n Webhook
N8N_AUTH_WEBHOOK=https://n8n.fokusistatistik.com/webhook-test/bilgefokusauth

# Google OAuth
GOOGLE_CLIENT_ID=398275435767-ckf3v121u35skmlgufhah8mccc7gja95.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret-here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

---

## 📊 Event Flow Diagram

```
User Action          →  NextAuth Callback  →  n8n Webhook  →  Database
─────────────────────────────────────────────────────────────────────────
First Google Login   →  signIn (isNewUser) →  user_signup  →  INSERT user
Returning Login      →  signIn             →  user_signin  →  UPDATE last_login
Profile Update       →  jwt (trigger)      →  session_update → UPDATE profile
Logout               →  signOut            →  user_signout →  LOG activity
```

---

## ✅ Checklist

- [x] Google Client ID configured
- [x] n8n webhook URL set
- [x] NextAuth callbacks implemented
- [x] Webhook helper function created
- [ ] n8n workflow created
- [ ] Database schema created
- [ ] Test signup flow
- [ ] Test signin flow
- [ ] Test signout flow
- [ ] Production deployment

---

## 🔗 Related Documentation

- [NextAuth.js Callbacks](https://next-auth.js.org/configuration/callbacks)
- [n8n Webhook Node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)

---

**Last Updated:** January 13, 2026
