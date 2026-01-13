# Simple .env.local Setup Guide

## Minimal Configuration (No Google OAuth)

Create `.env.local` in project root with:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=Y3o9CNlXKJH0GkvV86uITHAnYMFTnOOH0bbX3jL2lqlU=

# n8n Webhook (Auth Events)
N8N_AUTH_WEBHOOK=https://n8n.fokusistatistik.com/webhook-test/bilgefokusauth

# Other n8n Webhooks
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.fokusistatistik.com/webhook
N8N_CHAT_WEBHOOK=https://n8n.fokusistatistik.com/webhook/bilge-chat
N8N_FILE_WEBHOOK=https://n8n.fokusistatistik.com/webhook/bilge-file-upload
N8N_ANALYSIS_WEBHOOK=https://n8n.fokusistatistik.com/webhook/bilge-analysis

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## For Production (bilge.fokusistatistik.com)

```env
# NextAuth Configuration
NEXTAUTH_URL=https://bilge.fokusistatistik.com
NEXTAUTH_SECRET=Y3o9CNlXKJH0GkvV86uITHAnYMFTnOOH0bbX3jL2lqlU=

# n8n Webhook
N8N_AUTH_WEBHOOK=https://n8n.fokusistatistik.com/webhook-test/bilgefokusauth

# App Configuration
NEXT_PUBLIC_APP_URL=https://bilge.fokusistatistik.com
NODE_ENV=production
```

## Testing Webhook

### Demo Login (No Google OAuth needed):
1. Go to `http://localhost:3000/login`
2. Click "Demo Hesabı ile Giriş"
3. Webhook will trigger with:
```json
{
  "event": "user_signin",
  "user": {
    "id": "1",
    "email": "demo@bilge.com",
    "name": "Demo User"
  },
  "provider": "credentials"
}
```

### Check n8n:
- Go to n8n executions
- Look for POST to `/webhook-test/bilgefokusauth`
- Verify payload received

---

**Note:** Google OAuth disabled - using demo login for webhook testing
