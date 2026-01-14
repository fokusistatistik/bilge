'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // 🧹 CACHE & SERVICE WORKER CLEANER
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
            if ('caches' in window) {
                caches.keys().then((names) => {
                    names.forEach((name) => {
                        caches.delete(name);
                    });
                });
            }
        }
    }, []);

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setError('');
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            console.error('Google sign in error:', error);
            setError('Google ile giriş başarısız oldu. Lütfen tekrar deneyin.');
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 px-4 py-8">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center text-center space-y-6"
                >
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-lg">
                        <Image
                            src="https://static.fokusistatistik.com/bilge/logos/bilgefavicon.png"
                            alt="Bilge Icon"
                            width={64}
                            height={64}
                            className="h-16 w-16"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-[#860000] dark:text-red-500 mb-3">
                            Bilge
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                            Akademik Araştırma ve Analiz Asistanı
                        </p>
                    </div>
                </motion.div>

                {/* Alerts */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
                        >
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 md:p-10"
                >
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Giriş Yap</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Hesabınıza erişmek için Google ile devam edin.
                            </p>
                        </div>

                        <Button
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading}
                            className="w-full h-14 text-base font-medium rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 relative overflow-hidden group"
                        >
                            {isGoogleLoading ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 className="h-5 w-5 animate-spin text-slate-600 dark:text-slate-300" />
                                    <span className="text-slate-600 dark:text-slate-300">Yönlendiriliyor...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="p-1 bg-white rounded-full">
                                        <svg className="h-6 w-6" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>
                                    <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Google ile Devam Et</span>
                                </div>
                            )}
                        </Button>

                        <div className="flex items-center gap-3 p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </div>
                            <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed font-medium">
                                Güvenli giriş sistemi ile verileriniz koruma altında.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center space-y-3"
                >
                    <div className="flex justify-center mb-2">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 gap-2">
                                ← Anasayfaya Dön
                            </Button>
                        </Link>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Devam ederek{' '}
                        <a href="#" className="text-[#860000] hover:text-[#a00000] underline underline-offset-2 transition-colors">Kullanım Koşulları</a>
                        {' '}ve{' '}
                        <a href="#" className="text-[#860000] hover:text-[#a00000] underline underline-offset-2 transition-colors">Gizlilik Politikası</a>
                        &apos;nı kabul etmiş olursunuz.
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        © 2026 Bilge Platform - Fokus İstatistik
                    </p>
                    <div className="pt-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
                            v2.0.2 - UPDATED
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
