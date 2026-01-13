'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleDemoLogin = async () => {
        setIsLoading(true);
        try {
            await signIn('credentials', {
                email: 'demo@bilge.com',
                password: 'demo123',
                callbackUrl: '/dashboard'
            });
        } catch (error) {
            console.error('Demo login error:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 px-4">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-lg">
                        <Image
                            src="https://static.fokusistatistik.com/bilge/logos/bilgefavicon.png"
                            alt="Bilge Icon"
                            width={56}
                            height={56}
                            className="h-14 w-14"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-[#860000] dark:text-red-500 mb-2">
                            Bilge&apos;ye Hoşgeldiniz
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Yapay Zeka Araştırma Asistanınıza erişmek için giriş yapın
                        </p>
                    </div>
                </div>

                {/* Login Options */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-xl p-8 space-y-6">

                    {/* Demo Login */}
                    <Button
                        onClick={handleDemoLogin}
                        disabled={isLoading}
                        className="w-full h-14 bg-gradient-to-r from-[#860000] to-[#660000] hover:from-[#660000] hover:to-[#440000] text-white shadow-lg"
                        size="lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Giriş yapılıyor...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5" />
                                <span className="font-semibold">Demo ile Giriş Yap</span>
                            </div>
                        )}
                    </Button>

                    {/* Demo Credentials */}
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                        <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-1">
                                    Demo Hesap Bilgileri
                                </p>
                                <p className="text-xs text-indigo-700 dark:text-indigo-300">
                                    <strong>Email:</strong> demo@bilge.com<br />
                                    <strong>Şifre:</strong> demo123
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-xs text-amber-800 dark:text-amber-300 text-center">
                            <strong>Not:</strong> Bu demo hesap ile tüm özellikleri test edebilirsiniz.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center space-y-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Giriş yaparak{' '}
                        <a href="#" className="text-[#860000] hover:underline">
                            Kullanım Koşulları
                        </a>
                        {' '}ve{' '}
                        <a href="#" className="text-[#860000] hover:underline">
                            Gizlilik Politikası
                        </a>
                        &apos;nı kabul etmiş olursunuz.
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                        © 2026 Bilge Platform - Fokus İstatistik
                    </p>
                </div>
            </div>
        </div>
    );
}
