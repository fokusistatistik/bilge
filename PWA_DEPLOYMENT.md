# BILGE V2 - PWA Destekli Deployment Rehberi

## Sunucuda Kurulum

### 1. GitHub Token'ı Environment Variable Olarak Tanımlayın

```bash
# Token'ı export edin (oturum için geçici)
export GITHUB_TOKEN="YOUR_GITHUB_TOKEN"

# VEYA kalıcı olarak .bashrc'ye ekleyin
echo 'export GITHUB_TOKEN="YOUR_GITHUB_TOKEN"' >> ~/.bashrc
source ~/.bashrc
```

### 2. Deployment Script'i Çalıştırın

```bash
# Tek komutla deployment
bash -c "$(curl -fsSL https://raw.githubusercontent.com/fokusistatistik/bilge/feature/v2-complete/deploy.sh)"
```

### 3. Manuel Kurulum (Adım Adım)

```bash
echo "🚀 KURULUM BAŞLIYOR: Bilge V2 Complete (PWA Destekli)..."

# 1. Temizlik
cd /var/www
pm2 delete bilge 2>/dev/null
pm2 delete bilge-backend 2>/dev/null
sudo rm -rf /var/www/bilge.fokusistatistik.com

# 2. GitHub'dan çek (Token'ı önceden export edin)
export GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
git clone -b feature/v2-complete https://${GITHUB_TOKEN}@github.com/fokusistatistik/bilge.git /var/www/bilge.fokusistatistik.com

# 3. Dizine git
cd /var/www/bilge.fokusistatistik.com

# 4. Environment variables
cat > .env.local << 'EOF'
NEXTAUTH_URL="https://bilge.fokusistatistik.com"
NEXT_PUBLIC_APP_URL="https://bilge.fokusistatistik.com"
NEXTAUTH_SECRET="bilge-v2-gizli-anahtar-2026"
NEXT_PUBLIC_N8N_WEBHOOK_URL="https://n8n.fokusistatistik.com/webhook/bilge"
NEXT_PUBLIC_N8N_CHATBOT_URL="https://n8n.fokusistatistik.com/webhook/bilge-chat"
NEXT_PUBLIC_N8N_PROJECTS_URL="https://n8n.fokusistatistik.com/webhook/bilge-projects"
NODE_ENV="production"
EOF

# 5. Paketleri yükle
npm install

# 6. Build
NODE_ENV=production npm run build

# 7. PM2 ile başlat
PORT=3004 pm2 start npm --name "bilge" -- start
pm2 save

echo "✅ TAMAMLANDI! https://bilge.fokusistatistik.com"
```

## PWA Özellikleri

✅ **Manifest.json**: PWA meta bilgileri
✅ **Service Worker**: Otomatik oluşturulur (@ducanh2912/next-pwa ile)
✅ **Offline Support**: Temel offline çalışma
✅ **Install Prompt**: Kullanıcılar uygulamayı cihazlarına yükleyebilir
✅ **App Icons**: Bilge favicon kullanılıyor

## PWA Test

1. Chrome DevTools > Application > Manifest
2. Lighthouse > Progressive Web App audit
3. Mobil cihazda "Add to Home Screen" seçeneği

## Güncelleme

```bash
cd /var/www/bilge.fokusistatistik.com
git pull origin feature/v2-complete
npm install
npm run build
pm2 restart bilge
```

## Sorun Giderme

### Build Hatası
```bash
rm -rf .next node_modules
npm install
npm run build
```

### PWA Çalışmıyor
- Manifest.json'ı kontrol edin: https://bilge.fokusistatistik.com/manifest.json
- HTTPS zorunlu (HTTP'de PWA çalışmaz)
- Service Worker: https://bilge.fokusistatistik.com/sw.js

### PM2 Logları
```bash
pm2 logs bilge --lines 100
pm2 monit
```

