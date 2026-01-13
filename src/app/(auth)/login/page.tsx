'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            console.error('Google sign in error:', error);
            setIsGoogleLoading(false);
        }
    };

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
                            Bilge'ye Hoşgeldiniz
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Yapay Zeka Araştırma Asistanınıza erişmek için giriş yapın
                        </p>
                    </div>
                </div>

                {/* Login Options */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-xl p-8 space-y-6">
                    {/* Google Sign In */}
                    <Button
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || isLoading}
                        className="w-full h-12 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 shadow-sm"
                        size="lg"
                    >
                        {isGoogleLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                                <span>Yönlendiriliyor...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="font-medium">Google ile Giriş Yap</span>
                            </div>
                        )}
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                                veya
                            </span>
                        </div>
                    </div>

                    {/* Demo Login */}
                    <Button
                        onClick={handleDemoLogin}
                        disabled={isLoading || isGoogleLoading}
                        className="w-full h-12 bg-[#860000] hover:bg-[#660000] text-white"
                        size="lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Giriş yapılıyor...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                <span>Demo Hesabı ile Giriş</span>
                            </div>
                        )}
                    </Button>

                    {/* Demo Credentials */}
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-xs text-amber-800 dark:text-amber-300 text-center">
                            <strong>Demo Hesap:</strong> demo@bilge.com / demo123
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
                        'nı kabul etmiş olursunuz.
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                        © 2026 Bilge Platform - Fokus İstatistik
                    </p>
                </div>
            </div>
        </div>
    );
}
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full relative py-6 text-base"
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            "Giriş yapılıyor..."
                        ) : (
                            <>
                                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google ile Devam Et
                            </>
                        )}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-50 dark:bg-slate-950 px-2 text-muted-foreground">
                                Veya e-posta ile devam et
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-2 opacity-50 pointer-events-none">
                    </div>
                </div >
            </div >
        </div >
    );
}
