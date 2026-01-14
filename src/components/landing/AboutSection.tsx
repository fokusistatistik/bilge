'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Award, ShieldCheck, Microscope } from 'lucide-react';

export function AboutSection() {
    return (
        <section id="about" className="py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Background Decorations - Mobilde gizle veya küçült */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full bg-red-50/50 dark:bg-red-900/10 blur-3xl opacity-60" />
                <div className="absolute bottom-[10%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-slate-50/50 dark:bg-slate-800/10 blur-3xl opacity-60" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    {/* Text Content */}
                    <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-[#860000] dark:text-red-400 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0"
                        >
                            <Lightbulb className="h-3 w-3" />
                            <span>Hikayemiz & Vizyonumuz</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight"
                        >
                            Bilimsel Araştırmalarda <br />
                            <span className="text-[#860000]">Güvenilir Yol Arkadaşınız</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                        >
                            Bilge, akademik dünyada karşılaşılan en büyük zorluklardan biri olan "doğru istatistiksel analiz ve raporlama" sürecini demokratize etmek için tasarlandı.
                            Karmaşık analiz yöntemlerini, yapay zeka destekli algoritmalarla basitleştiriyor, araştırmacıların metodolojik hatalardan kaçınmasına yardımcı oluyoruz.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-900 rounded-lg sm:bg-transparent sm:p-0"
                            >
                                <div className="p-3 bg-red-50 dark:bg-red-900/10 text-[#860000] dark:text-red-400 rounded-xl shrink-0">
                                    <Target className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Misyonumuz</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Her araştırmacının, teknik bilgi bariyerine takılmadan bilimsel değeri yüksek çıktılar üretmesini sağlamak.</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-900 rounded-lg sm:bg-transparent sm:p-0"
                            >
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 rounded-xl shrink-0">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Etik Değerler</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Veri gizliliği, bilimsel dürüstlük ve metodolojik şeffaflık temel ilkelerimizdir.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Stats / Visuals */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 w-full max-w-lg"
                    >
                        <div className="relative bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl md:shadow-2xl">
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                <div className="text-center p-4 md:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <Users className="h-6 w-6 md:h-8 md:w-8 mx-auto text-[#860000] mb-2 md:mb-3" />
                                    <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">5K+</div>
                                    <div className="text-[10px] md:text-xs font-medium text-slate-500 uppercase">Araştırmacı</div>
                                </div>
                                <div className="text-center p-4 md:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <Award className="h-6 w-6 md:h-8 md:w-8 mx-auto text-orange-500 mb-2 md:mb-3" />
                                    <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">%98</div>
                                    <div className="text-[10px] md:text-xs font-medium text-slate-500 uppercase">Başarı</div>
                                </div>
                                <div className="text-center p-4 md:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <Microscope className="h-6 w-6 md:h-8 md:w-8 mx-auto text-blue-500 mb-2 md:mb-3" />
                                    <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">20+</div>
                                    <div className="text-[10px] md:text-xs font-medium text-slate-500 uppercase">Modül</div>
                                </div>
                                <div className="text-center p-4 md:p-6 bg-[#860000] rounded-xl shadow-md text-white flex flex-col justify-center items-center">
                                    <div className="text-3xl md:text-4xl font-black mb-1">∞</div>
                                    <div className="text-[10px] md:text-xs font-medium text-red-100 uppercase">Bilimsel Katkı</div>
                                </div>
                            </div>

                            <div className="mt-6 md:mt-8 text-center hidden sm:block">
                                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                                    "Bilge, sadece bir analiz aracı değil; akademik yolculuğunuzda size rehberlik eden dijital bir mentördür."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
