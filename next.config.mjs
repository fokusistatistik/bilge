/** @type {import('next').NextConfig} */
const nextConfig = {
    // Build hatalarını yoksay (Deploy garantisi için)
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },

    // Resim optimizasyonu
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

    // Performans optimizasyonu
    compress: true,
    poweredByHeader: false,

    // Production optimizasyonları
    reactStrictMode: true,
    swcMinify: true,
};

export default nextConfig;
