#!/bin/bash

echo "🚀 KURULUM BAŞLIYOR: Bilge V2 Complete (PWA Destekli)..."

# 1. GÜVENLİ BÖLGEYE GİT VE TEMİZLİK YAP
cd /var/www
echo "🛑 Eski süreçler temizleniyor..."
pm2 delete bilge 2>/dev/null
pm2 delete bilge-backend 2>/dev/null
sudo rm -rf /var/www/bilge.fokusistatistik.com

# 2. GITHUB'DAN DOĞRU DALI (BRANCH) ÇEK
echo "⬇️ GitHub'dan feature/v2-complete dalı çekiliyor..."
# GITHUB_TOKEN environment variable olarak tanımlanmalı
git clone -b feature/v2-complete https://${GITHUB_TOKEN}@github.com/fokusistatistik/bilge.git /var/www/bilge.fokusistatistik.com

# 3. KLASÖRE GİR VE ENV DOSYASINI YAZ
cd /var/www/bilge.fokusistatistik.com
echo "📝 .env.local ayarları yapılıyor..."
cat > .env.local << 'EOF'
NEXTAUTH_URL="https://bilge.fokusistatistik.com"
NEXT_PUBLIC_APP_URL="https://bilge.fokusistatistik.com"
NEXTAUTH_SECRET="bilge-v2-gizli-anahtar-2026"
NEXT_PUBLIC_N8N_WEBHOOK_URL="https://n8n.fokusistatistik.com/webhook/bilge"
NEXT_PUBLIC_N8N_CHATBOT_URL="https://n8n.fokusistatistik.com/webhook/bilge-chat"
NEXT_PUBLIC_N8N_PROJECTS_URL="https://n8n.fokusistatistik.com/webhook/bilge-projects"
NODE_ENV="production"
EOF

# 4. PAKETLERİ YÜKLE
echo "📦 NPM paketleri yükleniyor..."
npm install

# 5. BUILD AL
echo "🏗️ Uygulama derleniyor (Build)..."
NODE_ENV=production npm run build

# 6. PM2 İLE BAŞLAT (PORT 3004)
echo "🚀 Uygulama 3004 Portunda başlatılıyor..."
PORT=3004 pm2 start npm --name "bilge" -- start
pm2 save

echo ""
echo "✅ İŞLEM TAMAMLANDI!"
echo "🌐 Site: https://bilge.fokusistatistik.com"
echo "📱 PWA: Kullanıcılar siteyi mobil cihazlarına yükleyebilir"
echo "📊 Loglar: pm2 logs bilge"
echo "🔄 Yeniden Başlat: pm2 restart bilge"
echo ""
