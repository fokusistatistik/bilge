'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-slate-950 p-4 text-center">
            <div className="rounded-full bg-red-100 p-6 dark:bg-red-900/20">
                <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-500" />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    Beklenmedik Bir Hata Oluştu
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-[500px]">
                    İşleminiz sırasında istenmeyen bir durum meydana geldi.
                </p>
            </div>
            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="outline">Tekrar Dene</Button>
                <Link href="/">
                    <Button className="bg-[#860000] hover:bg-[#660000] text-white">Anasayfaya Dön</Button>
                </Link>
            </div>
        </div>
    )
}
