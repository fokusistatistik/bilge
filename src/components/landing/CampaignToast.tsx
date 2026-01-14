'use client';

import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CampaignToast() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    className="fixed top-24 left-6 z-[101] max-w-sm w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl border-l-4 border-l-[#860000] border-y border-r border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                    <div className="p-4 flex items-start gap-4">
                        <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg text-[#860000] shrink-0">
                            <Gift className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">2026 Kampanyası</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                Yeni üyeliklerde geçerli <span className="font-bold text-[#860000]">5 Kredi Hediye!</span>
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium mb-3">
                                *Tanımlanan kredi 1 ay boyunca geçerlidir.
                            </p>
                            <Link href="/login">
                                <Button size="sm" className="w-full bg-[#860000] hover:bg-[#660000] text-white h-7 text-xs">
                                    Hemen Üye Ol
                                </Button>
                            </Link>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
