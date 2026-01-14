'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-red-50/10 to-slate-50 dark:from-slate-950 dark:via-red-950/10 dark:to-slate-950" id="hero">
            {/* Animated Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <motion.div
                    className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-gradient-to-br from-red-200/20 to-orange-200/20 dark:from-red-900/20 dark:to-orange-900/20 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-gradient-to-br from-rose-200/20 to-pink-200/20 dark:from-rose-900/20 dark:to-pink-900/20 blur-3xl hidden md:block"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 rounded-full bg-red-50 border border-red-100 text-[#860000] text-xs md:text-sm font-medium dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400 shadow-sm hover:shadow transition-shadow">
                            <img src="https://static.fokusistatistik.com/bilge/logos/bilgefavicon.png" alt="Bilge" className="h-3 w-3 md:h-4 md:w-4 object-contain" />
                            <span>Bilimsel İstatistik ve Literatür Geliştirme Enstrümanı</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-tight"
                    >
                        Verilerinizi <span className="text-[#860000] relative inline-block">
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
                        className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed px-4"
                    >
                        Akademik çalışmalarınızı daha ileriye taşımak için kapsamlı istatistiksel analizler ve profesyonel raporlama. Python tabanlı LLM ve AI destekli altyapı.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Link href="/login" className="w-full sm:w-auto">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-[#860000] hover:bg-[#660000] text-white gap-2 h-12 px-8 text-base shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Şimdi Analize Başla
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="#pricing" className="w-full sm:w-auto">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto h-12 px-8 text-base border-2 border-slate-300 dark:border-slate-700 hover:border-[#860000] hover:text-[#860000] dark:hover:border-[#860000] dark:hover:text-[#860000] transition-all duration-300"
                                >
                                    Fiyatlandırmayı Gör
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* New Value Props Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16 max-w-5xl mx-auto w-full px-2"
                    >
                        {/* 1. Sanal/AI Danışmanlık */}
                        <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all text-left group">
                            <div className="h-10 w-10 rounded-lg bg-red-100 text-[#860000] dark:bg-red-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Destekli Danışmanlık</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                7/24 erişilebilir sanal asistan ile metodoloji ve analiz süreçlerinde anlık rehberlik.
                            </p>
                        </div>

                        {/* 2. Etik ve Bilimsel */}
                        <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all text-left group">
                            <div className="h-10 w-10 rounded-lg bg-red-100 text-[#860000] dark:bg-red-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <CheckCircle className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Etik ve Bilimsel</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Akademik etik ilkelerine tam uyum ve bilimsel kanıta dayalı raporlama standartları.
                            </p>
                        </div>

                        {/* 3. Gerçek Danışman */}
                        <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all text-left group">
                            <div className="h-10 w-10 rounded-lg bg-red-100 text-[#860000] dark:bg-red-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Gerçek Uzman Desteği</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                İhtiyaç duyduğunuzda alanında uzman istatistikçilerle birebir görüşme imkanı.
                            </p>
                        </div>
                    </motion.div>

                    {/* Enhanced Animation Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative w-full max-w-6xl mt-12 md:mt-16 mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden p-4 md:p-6 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-red-50/20 to-orange-50/20 dark:from-red-950/10 dark:to-orange-950/10 pointer-events-none" />

                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
                            {/* Left: Chat/Interpretation */}
                            <div className="space-y-4 text-left order-2 md:order-1">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all hover:scale-[1.02]">
                                    <div className="h-10 w-10 rounded-full bg-red-100 text-[#860000] flex items-center justify-center font-bold shrink-0">B</div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            Analiz sonuçlarına göre, deney ve kontrol grupları arasında istatistiksel olarak anlamlı bir fark bulunmuştur (p &lt; .05).
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#860000] shadow-lg shadow-red-900/20 text-white transform transition-all md:translate-x-4">
                                    <FileText className="h-6 w-6 mt-1 shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <p className="text-sm font-medium">APA Raporu Oluşturuldu</p>
                                        <div className="text-xs opacity-90 font-serif bg-black/10 p-2 rounded">
                                            Table 1. Independent Samples T-Test Results...
                                        </div>
                                    </div>
                                    <CheckCircle className="h-5 w-5 text-green-300 shrink-0" />
                                </div>
                            </div>

                            {/* Right: Data Viz */}
                            <div className="relative h-48 md:h-64 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-end justify-center gap-2 md:gap-4 hover:shadow-inner transition-shadow order-1 md:order-2">
                                {[40, 65, 45, 80, 55].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="w-8 md:w-12 bg-gradient-to-t from-[#860000] to-red-400 rounded-t-lg relative group"
                                    >
                                        <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] md:text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
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
