# Authentication System - Google OAuth Only

## 🎯 Architecture Overview

The system strictly uses **Google OAuth** for authentication. No password-based login or demo accounts are enabled. All backend logic (user creation, profile management, session tracking) is handled externally via **n8n webhooks**.

### Webhook Flow

```mermaid
graph TD
    A[User Clicks 'Google ile Devam Et'] --> B[Google OAuth Consent]
    B --> C[NextAuth Callback]
    C -->|Trigger| D[n8n Webhook (SIGNUP/LOGIN)]
    D --> E{User Exists?}
    E -->|No| F[Create User & Profile]
    E -->|Yes| G[Update Last Login]
    F --> H[Create Session]
    G --> H
    H --> I[Return Success JSON]
```

## 🔗 Webhook Endpoints (Production)

| Event | URL | Description |
|-------|-----|-------------|
| **Signup/Login** | `https://n8n.fokusistatistik.com/webhook/bilgefokussignup` | Main entry point. Handles both registration and login logic. |
| **Signin (Log)** | `https://n8n.fokusistatistik.com/webhook/bilgefokussignin` | Optional secondary logging for access stats. |
| **Signout** | `https://n8n.fokusistatistik.com/webhook/bilgefokussignout` | Triggers when user logs out. |

## 📦 Data Payload Structure

When a user logs in, n8n receives the following JSON payload:

```json
{
  "event": "google_oauth_login",
  "isNewUser": false,
  "user": {
    "id": "1032...",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "https://lh3.googleusercontent.com/..."
  },
  "oauth": {
    "provider": "google",
    "access_token": "ya29...",
    "refresh_token": "1//0g...",
    "expires_at": 1705176762,
    "scope": "openid email profile"
  },
  "metadata": {
    "env": "production",
    "timestamp": "2026-01-14T12:00:00.000Z"
  }
}
```

## 🚀 Deployment

1.  **Environment Variables:** Ensure `.env` files use the production webhook URLs (without `-test` suffix).
2.  **n8n Configuration:** Ensure workflows are **Active**.
3.  **Google Cloud:** whitelist `https://bilge.fokusistatistik.com/api/auth/callback/google` in Google Cloud Console.

