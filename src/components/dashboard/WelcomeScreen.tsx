'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, FileUp, BarChart3, ArrowRight, X } from "lucide-react";
import { useState } from "react";

interface WelcomeScreenProps {
    userName: string;
    onClose: () => void;
    onCreateProject: () => void;
}

export function WelcomeScreen({ userName, onClose, onCreateProject }: WelcomeScreenProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            icon: FileUp,
            title: "Verilerinizi Yükleyin",
            description: "Excel veya CSV formatında verilerinizi sisteme yükleyin. Drag & drop ile kolayca!",
            color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
        },
        {
            icon: BarChart3,
            title: "Analiz Seçin",
            description: "AI destekli asistanımız size en uygun istatistiksel testi önerir.",
            color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30"
        },
        {
            icon: Sparkles,
            title: "Rapor Alın",
            description: "APA formatında profesyonel raporunuz hazır! PDF veya Word olarak indirin.",
            color: "text-green-600 bg-green-100 dark:bg-green-900/30"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full"
            >
                <Card className="relative overflow-hidden border-2 shadow-2xl">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />

                    <CardContent className="p-8 md:p-12 relative">
                        {/* Welcome Header */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                                <Sparkles className="h-4 w-4" />
                                <span>Hoş Geldiniz!</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                                Merhaba, {userName}! 👋
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                Bilge ile akademik çalışmalarınızı bir üst seviyeye taşımaya hazır mısınız?
                            </p>
                        </motion.div>

                        {/* Steps */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <Card className={`relative overflow-hidden border-2 transition-all duration-300 ${currentStep === index
                                                ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                                                : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                                            }`}>
                                            <CardContent className="p-6">
                                                <div className={`inline-flex p-3 rounded-xl ${step.color} mb-4`}>
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                                        Adım {index + 1}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                                                    {step.title}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Progress dots */}
                        <div className="flex justify-center gap-2 mb-8">
                            {steps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentStep(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentStep === index
                                            ? 'w-8 bg-indigo-600'
                                            : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-indigo-400'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button
                                size="lg"
                                onClick={onCreateProject}
                                className="bg-[#860000] hover:bg-[#660000] text-white gap-2 shadow-lg hover:shadow-xl transition-all"
                            >
                                İlk Projenizi Oluşturun
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={onClose}
                                className="border-2"
                            >
                                Daha Sonra
                            </Button>
                        </motion.div>

                        {/* Quick tip */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
                        >
                            <p className="text-sm text-amber-800 dark:text-amber-300 text-center">
                                💡 <strong>İpucu:</strong> Örnek bir veri seti ile başlamak ister misiniz?
                                <button className="underline ml-1 font-medium hover:text-amber-900 dark:hover:text-amber-200">
                                    Örnek veri setini indirin
                                </button>
                            </p>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
