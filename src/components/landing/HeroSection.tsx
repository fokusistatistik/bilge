'use client';

import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950">
            {/* Animated Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 dark:from-indigo-900/30 dark:to-purple-900/30 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-teal-200/40 to-cyan-200/40 dark:from-teal-900/30 dark:to-cyan-900/30 blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium dark:bg-indigo-950/30 dark:border-indigo-800 dark:text-indigo-400 shadow-sm">
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
                        Verilerinizi <span className="text-[#860000] relative">
                            Bilimsel Kanıta
                            <motion.span
                                className="absolute bottom-0 left-0 w-full h-1 bg-[#860000]/20"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            />
                        </span> Dönüştürün.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed"
                    >
                        Akademik çalışmalarınızı daha ileriye taşımak için kapsamlı istatistiksel analizler ve profesyonel raporlama. Python tabanlı LLM ve AI destekli altyapı.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/login">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    className="bg-[#860000] hover:bg-[#660000] text-white gap-2 h-12 px-8 text-base shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Şimdi Analize Başla
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    {/* Ripple effect */}
                                    <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="#pricing">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-12 px-8 text-base border-2 border-slate-300 dark:border-slate-700 hover:border-[#860000] hover:text-[#860000] dark:hover:border-[#860000] dark:hover:text-[#860000] transition-all duration-300"
                                >
                                    Fiyatlandırmayı Gör
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Social Proof Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto"
                    >
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-[#860000] mb-1">
                                <CountUp end={5000} suffix="+" duration={2.5} />
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Aktif Araştırmacı</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-[#860000] mb-1">
                                <CountUp end={15000} suffix="+" duration={2.5} />
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Tamamlanan Analiz</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-[#860000] mb-1">
                                <CountUp end={50} suffix="+" duration={2} />
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Üniversite</p>
                        </div>
                    </motion.div>

                    {/* Enhanced Animation Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative w-full max-w-6xl mt-16 mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden p-4 md:p-6 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-teal-50/50 dark:from-indigo-950/20 dark:to-teal-950/20 pointer-events-none" />

                        {/* Floating Elements Animation */}
                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
                            {/* Left: Chat/Interpretation */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all hover:scale-[1.02]">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">B</div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            Analiz sonuçlarına göre, deney ve kontrol grupları arasında istatistiksel olarak anlamlı bir fark bulunmuştur (p &lt; .05).
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20 text-white transform transition-all translate-x-4">
                                    <FileText className="h-6 w-6 mt-1" />
                                    <div className="flex-1 space-y-2">
                                        <p className="text-sm font-medium">APA Raporu Oluşturuldu</p>
                                        <div className="text-xs opacity-80 font-serif">
                                            Table 1. Independent Samples T-Test Results...
                                        </div>
                                    </div>
                                    <CheckCircle className="h-5 w-5 text-green-300" />
                                </div>
                            </div>

                            {/* Right: Data Viz */}
                            <div className="relative h-64 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-end justify-center gap-4 hover:shadow-inner transition-shadow">
                                {[40, 65, 45, 80, 55].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="w-12 bg-gradient-to-t from-indigo-600 to-teal-400 rounded-t-lg relative group"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            %{h}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
