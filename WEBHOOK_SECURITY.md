# Webhook Security Options

## Option 1: No Secret (Current - Simple)

**Pros:**
- Quick setup
- No configuration needed
- Works immediately

**Cons:**
- Anyone can POST to webhook
- No request validation

**Use Case:** Development, internal networks

---

## Option 2: API Key Header (Recommended)

Add to `.env.local`:
```env
N8N_WEBHOOK_SECRET=your-secret-key-here
```

Update `options.ts`:
```typescript
await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
  },
  body: JSON.stringify(data),
});
```

n8n Workflow:
```
Webhook → Function Node (Validate Secret) → Continue
```

**Pros:**
- Simple to implement
- Good security
- Easy to rotate

**Cons:**
- Requires n8n validation logic

---

## Option 3: HMAC Signature (Most Secure)

Add to `.env.local`:
```env
N8N_WEBHOOK_SECRET=your-secret-key-here
```

Update `options.ts`:
```typescript
import crypto from 'crypto';

const signature = crypto
  .createHmac('sha256', process.env.N8N_WEBHOOK_SECRET || '')
  .update(JSON.stringify(data))
  .digest('hex');

await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Webhook-Signature': signature,
  },
  body: JSON.stringify(data),
});
```

n8n Workflow:
```javascript
// Function Node
const crypto = require('crypto');
const secret = 'your-secret-key-here';
const payload = JSON.stringify($json);
const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

const receivedSignature = $node["Webhook"].json.headers['x-webhook-signature'];

if (expectedSignature !== receivedSignature) {
  throw new Error('Invalid signature');
}

return $json;
```

**Pros:**
- Maximum security
- Tamper-proof
- Industry standard (GitHub, Stripe use this)

**Cons:**
- More complex setup
- Requires crypto library

---

## Recommendation

**For Now (Development):**
- ✅ No secret - Keep it simple
- ✅ Focus on functionality first

**For Production:**
- ✅ Add API Key Header (Option 2)
- ✅ Or HMAC Signature (Option 3) for max security

---

## Quick Implementation (API Key)

If you want to add security now:

### 1. Add to `.env.local`:
```env
N8N_WEBHOOK_SECRET=bilge-webhook-secret-2026
```

### 2. Update `options.ts`:
```typescript
headers: {
  'Content-Type': 'application/json',
  'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
}
```

### 3. n8n Validation:
```javascript
// Function Node in n8n
const secret = $node["Webhook"].json.headers['x-webhook-secret'];
if (secret !== 'bilge-webhook-secret-2026') {
  throw new Error('Unauthorized');
}
return $json;
```

---

**Current Status:** No secret needed, works fine for development! 🚀
