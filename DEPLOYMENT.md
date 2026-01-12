# BILGE Platform - Deployment Guide

## Sunucuda Kurulum Talimatları

### 1. Gereksinimler
- Node.js 18+ veya 20+
- npm veya yarn
- Git

### 2. Projeyi Sunucuya Klonlama

```bash
# SSH ile sunucuya bağlanın
ssh user@bilge.fokusistatistik.com

# Proje dizinine gidin
cd /var/www/

# Repository'yi klonlayın
git clone https://github.com/YOUR_USERNAME/bilge.git
cd bilge

# Feature branch'e geçin
git checkout feature/v2-complete
```

### 3. Bağımlılıkları Yükleme

```bash
npm install
# veya
yarn install
```

### 4. Environment Variables (.env.local)

Proje kök dizininde `.env.local` dosyası oluşturun:

```env
# App URL
NEXT_PUBLIC_APP_URL=https://bilge.fokusistatistik.com
NEXTAUTH_URL=https://bilge.fokusistatistik.com

# NextAuth Secret (güvenli bir key oluşturun)
NEXTAUTH_SECRET=your-super-secret-key-here-change-this

# n8n Webhook URLs (kendi n8n instance'ınızı kullanın)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.fokusistatistik.com/webhook/bilge
NEXT_PUBLIC_N8N_CHATBOT_URL=https://n8n.fokusistatistik.com/webhook/bilge-chat
NEXT_PUBLIC_N8N_PROJECTS_URL=https://n8n.fokusistatistik.com/webhook/bilge-projects

# Database (eğer kullanıyorsanız)
DATABASE_URL=your-database-url
```

### 5. Production Build

```bash
npm run build
```

### 6. Sunucuda Çalıştırma Seçenekleri

#### Seçenek A: PM2 ile (Önerilen)

```bash
# PM2'yi global olarak yükleyin
npm install -g pm2

# Uygulamayı başlatın
pm2 start npm --name "bilge" -- start

# Otomatik başlatma için
pm2 startup
pm2 save

# Logları görüntüleme
pm2 logs bilge

# Yeniden başlatma
pm2 restart bilge
```

#### Seçenek B: Systemd Service

`/etc/systemd/system/bilge.service` dosyası oluşturun:

```ini
[Unit]
Description=Bilge Platform
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/bilge
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Servisi başlatın:

```bash
sudo systemctl daemon-reload
sudo systemctl enable bilge
sudo systemctl start bilge
sudo systemctl status bilge
```

#### Seçenek C: Docker (Opsiyonel)

Dockerfile zaten mevcut. Docker kullanmak için:

```bash
# Docker image oluştur
docker build -t bilge-platform .

# Container'ı çalıştır
docker run -d -p 3000:3000 --name bilge bilge-platform

# Docker Compose ile (docker-compose.yml varsa)
docker-compose up -d
```

### 7. Nginx Reverse Proxy Yapılandırması

`/etc/nginx/sites-available/bilge.fokusistatistik.com`:

```nginx
server {
    listen 80;
    server_name bilge.fokusistatistik.com;
    
    # SSL için Let's Encrypt redirect
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bilge.fokusistatistik.com;

    # SSL Sertifikaları (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/bilge.fokusistatistik.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bilge.fokusistatistik.com/privkey.pem;

    # SSL Ayarları
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Image optimization
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
```

Nginx'i yeniden başlatın:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 8. SSL Sertifikası (Let's Encrypt)

```bash
# Certbot yükleyin
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# SSL sertifikası alın
sudo certbot --nginx -d bilge.fokusistatistik.com

# Otomatik yenileme testi
sudo certbot renew --dry-run
```

### 9. Güvenlik Duvarı (UFW)

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 10. Monitoring ve Logs

```bash
# PM2 ile
pm2 logs bilge --lines 100

# Systemd ile
sudo journalctl -u bilge -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 11. Güncelleme Prosedürü

```bash
cd /var/www/bilge
git pull origin feature/v2-complete
npm install
npm run build
pm2 restart bilge
# veya
sudo systemctl restart bilge
```

## Önemli Notlar

1. **Diyagonal Çizgi Sorunu**: Footer'daki çizgi muhtemelen tarayıcı rendering'inden kaynaklanıyor. Production build'de görünmeyebilir.

2. **n8n Entegrasyonu**: 
   - Virtual Assistant Chatbot için webhook URL'i `.env.local`'de tanımlayın
   - Projects sayfası için CRUD webhook'ları ayarlayın
   - User settings için credit işlemleri webhook'u ekleyin

3. **Performance**:
   - Next.js Image Optimization otomatik çalışır
   - Static files CDN'e taşınabilir
   - Redis cache eklenebilir

4. **Backup**:
   - Düzenli database backup'ı alın
   - User uploaded files için ayrı backup stratejisi oluşturun

## Sorun Giderme

### Build Hatası
```bash
# Cache temizleme
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Port Çakışması
```bash
# 3000 portunu kullanan process'i bulun
lsof -i :3000
# veya
netstat -tulpn | grep 3000

# Process'i sonlandırın
kill -9 <PID>
```

### Memory Hatası
```bash
# Node.js memory limitini artırın
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## Destek

Herhangi bir sorun için:
- Email: bilgi@fokusistatistik.com
- Tel: 0535 404 07 12
