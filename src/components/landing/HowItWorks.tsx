'use client';

import { UploadCloud, MessageSquare, LineChart, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorks() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden" id="how-it-works">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wider mb-4">
                        Kolay Kullanım
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                        Profesyonel Analizin Dört Adımı
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Teknik istatistik bilgisi gerekmez. Bilge, karmaşık süreçleri sizin için dört basit adıma indirger.
                        Dakikalar içinde veriden rapora ulaşın.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-200 dark:from-slate-800 dark:via-indigo-900 dark:to-slate-800 -z-0" />

                    {STEPS.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 duration-300">
                                    <step.icon className="h-10 w-10 text-[#860000]" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#860000] text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900">
                                        {index + 1}
                                    </div>
                                </div>
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-[#860000]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                                {step.desc}
                            </p>

                            {/* Mobile Arrow */}
                            {index < 3 && (
                                <div className="lg:hidden mt-8 text-slate-300">
                                    <ArrowRight className="h-6 w-6 rotate-90 md:rotate-0" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const STEPS = [
    {
        title: "Verini Yükle",
        desc: "Excel (.xlsx), CSV veya SPSS (.sav) dosyanızı sisteme güvenle yükleyin. Bilge değişkenleri otomatik tanır.",
        icon: UploadCloud
    },
    {
        title: "Sorunu Sor",
        desc: "Yapmak istediğiniz analizi veya hipotezi sohbet eder gibi doğal dille yazın. Teknik terim bilmenize gerek yok.",
        icon: MessageSquare
    },
    {
        title: "Analizi İzle",
        desc: "Bilge, en uygun istatistiksel testi seçer, uygular ve sonuçları anlık olarak yorumlayarak size sunar.",
        icon: LineChart
    },
    {
        title: "Raporu Al",
        desc: "Sonuçları APA 7 formatında, akademik yazım kurallarına uygun Word veya PDF raporu olarak indirin.",
        icon: FileText
    }
];
