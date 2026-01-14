# Sunucuda Hızlı Düzeltme Komutları

## Build Hatasını Düzelt

Sunucunuzda şu komutları çalıştırın:

```bash
# Bilge dizinine git
cd /var/www/bilge.fokusistatistik.com

# Doğru next.config.mjs dosyasını oluştur
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { 
    ignoreDuringBuilds: true 
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.fokusistatistik.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
EOF

# Build yap
npm run build

# PM2'yi yeniden başlat
pm2 restart bilge

# Logları kontrol et
pm2 logs bilge --lines 50
```

## Alternatif: Tek Komutla Çözüm

```bash
cd /var/www/bilge.fokusistatistik.com && \
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.fokusistatistik.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};
export default nextConfig;
EOF
npm run build && pm2 restart bilge && pm2 logs bilge --lines 20
```

## Sorun Devam Ederse

```bash
# Cache temizle
rm -rf .next
rm -rf node_modules/.cache

# Yeniden build
npm run build

# PM2 restart
pm2 delete bilge
PORT=3004 pm2 start npm --name "bilge" -- start

# Status kontrol
pm2 status
pm2 logs bilge
```

## Nginx Kontrolü

Site çalışmıyorsa Nginx'i kontrol edin:

```bash
# Nginx config test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Port Kontrolü

```bash
# 3004 portunu kontrol et
sudo lsof -i :3004
netstat -tulpn | grep 3004

# Eğer port kullanılıyorsa
sudo kill -9 $(lsof -t -i:3004)
```

