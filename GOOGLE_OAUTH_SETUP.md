# Google OAuth Setup Guide

## 📋 Google Cloud Console Configuration

### Step 1: Create OAuth Client

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **OAuth client ID**
4. Select **Web application**
5. Name: **Bilge Platform**

### Step 2: Configure Authorized Origins

Add the following **Authorized JavaScript origins**:

```
https://bilge.fokusistatistik.com
http://localhost:3000
```

### Step 3: Configure Redirect URIs

Add the following **Authorized redirect URIs**:

```
https://bilge.fokusistatistik.com/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

### Step 4: Get Credentials

1. Click **Create**
2. Copy **Client ID**
3. Copy **Client Secret**

---

## 🔧 Environment Setup

### Local Development

Create `.env.local` file:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Production

Set environment variables on server:

```env
# NextAuth
NEXTAUTH_URL=https://bilge.fokusistatistik.com
NEXTAUTH_SECRET=same-secret-as-local

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

## 🔑 Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🧪 Testing

### Local Test

1. Start development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/login`

3. Click "Google ile Giriş Yap"

4. Should redirect to: `http://localhost:3000/api/auth/callback/google`

### Production Test

1. Deploy to server

2. Navigate to: `https://bilge.fokusistatistik.com/login`

3. Click "Google ile Giriş Yap"

4. Should redirect to: `https://bilge.fokusistatistik.com/api/auth/callback/google`

---

## ⚠️ Important Notes

### HTTPS Requirement
- Production **must** use HTTPS
- Local development can use HTTP

### Port Numbers
- **Must** include port for localhost
- ✅ `http://localhost:3000`
- ❌ `http://localhost`

### Trailing Slashes
- **Do not** include trailing slashes
- ✅ `https://bilge.fokusistatistik.com`
- ❌ `https://bilge.fokusistatistik.com/`

### Callback Path
- NextAuth automatically uses `/api/auth/callback/[provider]`
- Do not modify this path

---

## 🔍 Troubleshooting

### Error: redirect_uri_mismatch

**Problem:** Redirect URI doesn't match Google Console configuration

**Solution:**
1. Check exact match in Google Console (including port)
2. Wait 5-10 minutes after making changes
3. Clear browser cache

### Error: invalid_client

**Problem:** Client ID or Secret is incorrect

**Solution:**
1. Verify Client ID and Secret in `.env.local`
2. Restart development server
3. Check for typos or extra spaces

### Error: Access blocked

**Problem:** App not verified by Google

**Solution:**
1. Add test users in Google Console
2. Or complete app verification process

---

## 📊 Configuration Summary

| Environment | JavaScript Origin | Redirect URI |
|-------------|------------------|--------------|
| **Local** | `http://localhost:3000` | `http://localhost:3000/api/auth/callback/google` |
| **Production** | `https://bilge.fokusistatistik.com` | `https://bilge.fokusistatistik.com/api/auth/callback/google` |

---

## ✅ Checklist

- [ ] Create OAuth client in Google Cloud Console
- [ ] Add JavaScript origins (2 URLs)
- [ ] Add redirect URIs (2 URLs)
- [ ] Copy Client ID
- [ ] Copy Client Secret
- [ ] Create `.env.local` file
- [ ] Add environment variables
- [ ] Generate NEXTAUTH_SECRET
- [ ] Test local login
- [ ] Deploy to production
- [ ] Set production environment variables
- [ ] Test production login

---

## 🔗 Useful Links

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup](https://next-auth.js.org/providers/google)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**Last Updated:** January 13, 2026

