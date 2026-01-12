'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, CheckCircle, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-100/50 dark:bg-teal-900/20 blur-3xl opacity-50" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium dark:bg-indigo-950/30 dark:border-indigo-800 dark:text-indigo-400">
                            <Zap className="h-4 w-4 fill-current" />
                            <span>Profesyonel İstatistiksel Analiz Platformu</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl"
                    >
                        Verilerinizi <span className="text-[#860000]">Bilimsel Kanıta</span> Dönüştürün.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl"
                    >
                        Akademik çalışmalarınızı daha ileriye taşımak için kapsamlı istatistiksel analizler ve profesyonel raporlama profesyonel ve analitik raporlama.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/login">
                            <Button size="lg" className="bg-[#860000] hover:bg-[#660000] text-white gap-2 h-12 px-8 text-base shadow-lg shadow-red-900/20">
                                Şimdi Analize Başla <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#pricing">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/50 backdrop-blur-sm">
                                Fiyatları İncele
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="relative w-full max-w-5xl mt-12 rounded-xl border bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-2xl overflow-hidden p-2"
                    >
                        <div className="rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border aspect-[16/9] md:aspect-[2/1] relative flex items-center justify-center group">
                            {/* Mockup or Image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 opacity-50" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 w-full max-w-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border flex flex-col gap-2">
                                    <div className="h-2 w-20 bg-slate-200 rounded" />
                                    <div className="h-32 bg-indigo-50 rounded flex items-end justify-center pb-2 gap-1">
                                        <div className="w-4 h-12 bg-indigo-400 rounded-t" />
                                        <div className="w-4 h-24 bg-indigo-500 rounded-t" />
                                        <div className="w-4 h-16 bg-indigo-300 rounded-t" />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border flex flex-col gap-2">
                                    <div className="h-2 w-24 bg-slate-200 rounded mb-2" />
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-slate-100 rounded" />
                                        <div className="h-2 w-5/6 bg-slate-100 rounded" />
                                        <div className="h-2 w-4/6 bg-slate-100 rounded" />
                                    </div>
                                    <div className="mt-auto flex gap-2">
                                        <div className="h-8 w-full bg-[#860000] rounded text-white text-[10px] flex items-center justify-center">Analiz Et</div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border flex flex-col gap-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="h-4 w-4 text-green-600" />
                                        <span className="text-xs font-bold">APA Raporu</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 space-y-1">
                                        <p>Table 1 independent samples t-test...</p>
                                        <div className="border p-1 rounded bg-slate-50">
                                            <div className="flex justify-between border-b pb-1">
                                                <span>Mean</span>
                                                <span>SD</span>
                                            </div>
                                            <div className="flex justify-between pt-1">
                                                <span>12.4</span>
                                                <span>2.1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
                    {[
                        { label: "Daha Hızlı Sonuçlar", value: "%85", icon: Zap },
                        { label: "Kullanıcı Sayısı", value: "5.000+", icon: CheckCircle },
                        { label: "Tamamlanan Analiz", value: "50.000+", icon: BarChart },
                        { label: "Doğruluk Oranı", value: "%100", icon: CheckCircle },
                    ].map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm border mb-2">
                                <stat.icon className="h-6 w-6 text-[#860000]" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                            <p className="text-sm text-slate-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
