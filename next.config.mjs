import withPWAInit from "@ducanh2912/next-pwa";

// 1. PWA Konfigürasyonunu Başlat
const withPWA = withPWAInit({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    // API rotalarını kesinlikle cacheleme (502 hatasının ilacı)
    workboxOptions: {
        disableDevLogs: true,
        exclude: [/\/api\//, /^api\/.*/, /middleware-manifest\.json$/, /app-build-manifest\.json$/]
    }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performans ve Stabilite
    output: "standalone",
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,

    // Hata Yoksayma (Build Garantisi)
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },

    // CDN ve Resim İzinleri
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'static.fokusistatistik.com' },
            { protocol: 'https', hostname: 'www.fokusistatistik.com' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' }, // Google Profil Fotoları İçin
            { protocol: 'https', hostname: 'api.dicebear.com' },
        ],
    },
};

// 2. Konfigürasyonu Export Et
export default withPWA(nextConfig);
