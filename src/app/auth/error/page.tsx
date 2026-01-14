'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'
import { Suspense } from 'react'

function AuthErrorContent() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const errorMap: Record<string, string> = {
        Configuration: "Sunucu yapılandırma hatası. Lütfen yönetici ile iletişime geçin.",
        AccessDenied: "Giriş reddedildi. Hesabınızın bu alana erişim yetkisi olmayabilir.",
        Verification: "Doğrulama bağlantısının süresi dolmuş veya daha önce kullanılmış.",
        Default: "Giriş yapılırken bir hata oluştu."
    }

    const errorMessage = error && error in errorMap ? errorMap[error] : errorMap.Default

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-slate-950 p-4 text-center">
            <div className="rounded-full bg-amber-100 p-6 dark:bg-amber-900/20">
                <ShieldAlert className="h-12 w-12 text-amber-600 dark:text-amber-500" />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    Oturum Açma Hatası
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-[500px]">
                    {errorMessage}
                </p>
                <p className="text-xs text-slate-400 mt-4">
                    Eğer bu hatayı sık alıyorsanız, tarayıcınızın çerezlerini temizlemeyi deneyin.
                </p>
            </div>
            <div className="flex gap-4">
                <Link href="/login">
                    <Button variant="outline">Tekrar Giriş Yap</Button>
                </Link>
                <Link href="/">
                    <Button className="bg-[#860000] hover:bg-[#660000] text-white">Anasayfaya Dön</Button>
                </Link>
            </div>
        </div>
    )
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <AuthErrorContent />
        </Suspense>
    )
}
