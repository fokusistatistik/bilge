# n8n Google OAuth Token Exchange Workflow

## Webhook Payload

When user logs in with Google, n8n receives:

```json
{
  "event": "google_oauth_callback",
  "timestamp": "2026-01-13T19:50:00.000Z",
  "oauth": {
    "code": "4/0AeanS0...",
    "client_id": "398275435767-ckf3v121u35skmlgufhah8mccc7gja95.apps.googleusercontent.com",
    "client_secret": "GOCSPX-tbd3oG6t******************6b-",
    "redirect_uri": "http://localhost:3000/api/auth/callback/google",
    "grant_type": "authorization_code"
  },
  "user": {
    "id": "google_123456",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "https://..."
  },
  "profile": {
    "email_verified": true,
    "locale": "tr"
  }
}
```

---

## n8n Workflow Setup

### 1. Webhook Node
- **Method:** POST
- **Path:** `/webhook-test/bilgefokusauth`
- **Response:** Return 200 OK

### 2. Switch Node (Event Type)
- **Expression:** `{{$json.event}}`
- **Routes:**
  - `google_oauth_callback` → Token Exchange
  - `user_signin` → Regular Login
  - `user_signout` → Logout

### 3. HTTP Request Node (Token Exchange)

**Only for `google_oauth_callback` route:**

**Configuration:**
```
Method: POST
URL: https://oauth2.googleapis.com/token
Authentication: None
```

**Headers:**
```
Content-Type: application/x-www-form-urlencoded
```

**Body (x-www-form-urlencoded):**
```
code={{ $json.oauth.code }}
client_id={{ $json.oauth.client_id }}
client_secret={{ $json.oauth.client_secret }}
redirect_uri={{ $json.oauth.redirect_uri }}
grant_type=authorization_code
```

**Response:**
```json
{
  "access_token": "ya29.a0AfB_...",
  "expires_in": 3599,
  "refresh_token": "1//0gXXX...",
  "scope": "openid https://www.googleapis.com/auth/userinfo.email ...",
  "token_type": "Bearer",
  "id_token": "eyJhbGci..."
}
```

### 4. Save to Database

**User Table:**
```sql
INSERT INTO users (
  google_id,
  email,
  name,
  image,
  access_token,
  refresh_token,
  token_expires_at,
  created_at
) VALUES (
  '{{ $json.user.id }}',
  '{{ $json.user.email }}',
  '{{ $json.user.name }}',
  '{{ $json.user.image }}',
  '{{ $node["HTTP Request"].json.access_token }}',
  '{{ $node["HTTP Request"].json.refresh_token }}',
  NOW() + INTERVAL '{{ $node["HTTP Request"].json.expires_in }}' SECOND,
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  access_token = EXCLUDED.access_token,
  refresh_token = EXCLUDED.refresh_token,
  token_expires_at = EXCLUDED.token_expires_at,
  updated_at = NOW();
```

---

## Complete Workflow Diagram

```
Webhook (POST)
    ↓
Switch (event type)
    ↓
├─ google_oauth_callback
│   ↓
│   HTTP Request (Token Exchange)
│   ↓
│   Save Tokens to DB
│   ↓
│   Send Welcome Email
│
├─ user_signin
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

## Testing

### Localhost Test:
1. Go to `http://localhost:3000/login`
2. Click "Google ile Giriş Yap"
3. Authorize with Google
4. Check n8n executions for `google_oauth_callback` event
5. Verify token exchange response

### Production Test:
1. Go to `https://bilge.fokusistatistik.com/login`
2. Same process as localhost

---

## Environment Variables

### Localhost (.env.local):
```env
GOOGLE_CLIENT_ID=398275435767-ckf3v121u35skmlgufhah8mccc7gja95.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-tbd3oG6t******************6b-
NEXTAUTH_URL=http://localhost:3000
N8N_AUTH_WEBHOOK=https://n8n.fokusistatistik.com/webhook-test/bilgefokusauth
```

### Production:
```env
GOOGLE_CLIENT_ID=398275435767-ckf3v121u35skmlgufhah8mccc7gja95.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-tbd3oG6t******************6b-
NEXTAUTH_URL=https://bilge.fokusistatistik.com
N8N_AUTH_WEBHOOK=https://n8n.fokusistatistik.com/webhook-test/bilgefokusauth
```

---

## Security Notes

1. **Client Secret** is sent to n8n (secure server-to-server)
2. **Access Token** should be encrypted in database
3. **Refresh Token** should be encrypted in database
4. Use HTTPS for all communications
5. Rotate tokens periodically

---

**Ready to implement!** 🚀
