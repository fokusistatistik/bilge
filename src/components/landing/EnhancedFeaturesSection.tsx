'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
    Brain,
    Zap,
    Shield,
    Clock,
    BarChart3,
    FileText,
    Users,
    Sparkles,
    ChevronRight,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function EnhancedFeaturesSection() {
    const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

    const features = [
        {
            icon: Brain,
            title: "AI Destekli Analiz",
            shortDesc: "Yapay zeka ile otomatik test önerisi",
            longDesc: "Python tabanlı LLM teknolojisi ile verilerinizi analiz eder, size en uygun istatistiksel testi önerir ve sonuçları yorumlar.",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            benefits: [
                "Otomatik test seçimi",
                "Akıllı veri temizleme",
                "Varsayım kontrolü",
                "Sonuç yorumlama"
            ]
        },
        {
            icon: Zap,
            title: "Hızlı Sonuçlar",
            shortDesc: "Dakikalar içinde profesyonel rapor",
            longDesc: "Geleneksel yöntemlerle saatler süren analizleri dakikalar içinde tamamlayın. Zamanınızı araştırmanıza odaklanmak için kullanın.",
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
            benefits: [
                "Ortalama 5 dakika",
                "Otomatik raporlama",
                "Toplu analiz desteği",
                "Gerçek zamanlı sonuçlar"
            ]
        },
        {
            icon: FileText,
            title: "APA Formatında Rapor",
            shortDesc: "Yayına hazır profesyonel raporlar",
            longDesc: "APA 7 formatında tablolar, grafikler ve metin açıklamaları ile doğrudan tezinize veya makalenize ekleyebileceğiniz raporlar.",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            benefits: [
                "APA 7 uyumlu",
                "Word & PDF export",
                "Özelleştirilebilir tablolar",
                "Otomatik referanslar"
            ]
        },
        {
            icon: BarChart3,
            title: "Görselleştirme",
            shortDesc: "İnteraktif grafikler ve tablolar",
            longDesc: "Verilerinizi anlaşılır grafiklerle görselleştirin. Tüm grafikleri yüksek çözünürlükte indirebilir veya özelleştirebilirsiniz.",
            color: "from-green-500 to-teal-500",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            benefits: [
                "10+ grafik tipi",
                "İnteraktif dashboard",
                "PNG/SVG export",
                "Renk özelleştirme"
            ]
        },
        {
            icon: Shield,
            title: "Veri Güvenliği",
            shortDesc: "Verileriniz güvende",
            longDesc: "Tüm verileriniz şifrelenmiş olarak saklanır. KVKK uyumlu altyapı ile verileriniz sadece size aittir.",
            color: "from-red-500 to-pink-500",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            benefits: [
                "End-to-end şifreleme",
                "KVKK uyumlu",
                "Otomatik yedekleme",
                "Veri silme garantisi"
            ]
        },
        {
            icon: Users,
            title: "Kolay Paylaşım",
            shortDesc: "Ekip çalışması için tasarlandı",
            longDesc: "Analizlerinizi danışmanınız veya ekip arkadaşlarınızla kolayca paylaşın. Yorum ve geri bildirim alın.",
            color: "from-indigo-500 to-purple-500",
            bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
            benefits: [
                "Paylaşılabilir linkler",
                "Yorum sistemi",
                "Versiyon kontrolü",
                "Ekip workspace (yakında)"
            ]
        }
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900" id="features">
            <div className="container px-4 md:px-6 mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/30 text-[#860000] dark:text-red-400 text-sm font-medium mb-4">
                            <Sparkles className="h-4 w-4" />
                            <span>Özellikler</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Akademik Başarınız İçin Her Şey
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Araştırmanızı hızlandıran, kolaylaştıran ve profesyonelleştiren özellikler
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    className="group cursor-pointer border-2 border-slate-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 hover:shadow-xl h-full"
                                    onClick={() => setSelectedFeature(index)}
                                >
                                    <CardContent className="p-6">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>

                                        <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white group-hover:text-[#860000] dark:group-hover:text-red-400 transition-colors">
                                            {feature.title}
                                        </h3>

                                        <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                            {feature.shortDesc}
                                        </p>

                                        <button className="inline-flex items-center gap-1 text-sm font-medium text-[#860000] dark:text-red-400 group-hover:gap-2 transition-all">
                                            Detayları Gör
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Feature Detail Modal */}
                <AnimatePresence>
                    {selectedFeature !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedFeature(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative max-w-2xl w-full"
                            >
                                <Card className="border-2 shadow-2xl">
                                    <button
                                        onClick={() => setSelectedFeature(null)}
                                        className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>

                                    <CardContent className="p-8">
                                        {(() => {
                                            const feature = features[selectedFeature];
                                            const Icon = feature.icon;
                                            return (
                                                <>
                                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                                                        <Icon className="h-8 w-8 text-white" />
                                                    </div>

                                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                                        {feature.title}
                                                    </h3>

                                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                                        {feature.longDesc}
                                                    </p>

                                                    <div className={`p-4 rounded-xl ${feature.bgColor} mb-6`}>
                                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                                            Temel Özellikler:
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {feature.benefits.map((benefit, i) => (
                                                                <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                                                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shrink-0`}>
                                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    </div>
                                                                    {benefit}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <Button
                                                        className="w-full bg-[#860000] hover:bg-[#660000] text-white"
                                                        size="lg"
                                                    >
                                                        Hemen Deneyin
                                                    </Button>
                                                </>
                                            );
                                        })()}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
