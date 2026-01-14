'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setTimeout(() => setIsVisible(true), 2000);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
                >
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1 text-sm text-slate-600 dark:text-slate-400">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Çerez Tercihlerinizi Yönetin</h4>
                            <p>
                                Size en iyi deneyimi sunmak için çerezleri kullanıyoruz. Sitemizi kullanmaya devam ederek
                                <Link href="/privacy" className="text-[#860000] hover:underline mx-1 font-medium">
                                    Çerez Politikası
                                </Link>
                                ve
                                <Link href="/kvkk" className="text-[#860000] hover:underline mx-1 font-medium">
                                    KVKK Aydınlatma Metni
                                </Link>
                                şartlarını kabul etmiş olursunuz.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                            <Button variant="outline" onClick={() => setIsVisible(false)} className="flex-1 md:flex-none">
                                Ayarlar
                            </Button>
                            <Button onClick={acceptCookies} className="bg-[#860000] hover:bg-[#660000] text-white flex-1 md:flex-none">
                                Kabul Et
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
