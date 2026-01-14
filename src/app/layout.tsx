import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Bilge | Akademik Analiz Asistanı",
  description: "Araştırmacılar için Yapay Zeka destekli mentör",
  icons: {
    icon: [
      {
        url: 'https://static.fokusistatistik.com/bilge/logos/bilgefavicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: 'https://static.fokusistatistik.com/bilge/logos/bilgefavicon.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: 'https://static.fokusistatistik.com/bilge/logos/bilgefavicon.png',
    apple: {
      url: 'https://static.fokusistatistik.com/bilge/logos/bilgefavicon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  manifest: '/manifest.json',
  other: {
    "mobile-web-app-capable": "yes",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bilge',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">

      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
