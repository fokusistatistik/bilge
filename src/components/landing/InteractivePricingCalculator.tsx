'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, TrendingDown } from "lucide-react";

export function InteractivePricingCalculator() {
    const [analysisCount, setAnalysisCount] = useState(10);
    const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'flexible'>('pro');

    const plans = {
        starter: {
            name: "Başlangıç",
            credits: 100,
            price: 150,
            originalPrice: 165,
            discount: 10,
            pricePerCredit: 1.50,
            color: "from-blue-500 to-cyan-500"
        },
        pro: {
            name: "Profesyonel",
            credits: 150,
            price: 200,
            originalPrice: 225,
            discount: 11,
            pricePerCredit: 1.33,
            color: "from-purple-500 to-pink-500",
            popular: true
        },
        flexible: {
            name: "Esnek",
            credits: 10,
            price: 2,
            pricePerCredit: 2.00,
            color: "from-green-500 to-teal-500",
            perCredit: true
        }
    };

    const selectedPlanData = plans[selectedPlan];
    const totalCost = selectedPlan === 'flexible'
        ? analysisCount * 2
        : Math.ceil(analysisCount / selectedPlanData.credits) * selectedPlanData.price;

    const traditionalCost = analysisCount * 15; // Geleneksel yöntem başına ~$15
    const savings = traditionalCost - totalCost;
    const savingsPercent = Math.round((savings / traditionalCost) * 100);

    return (
        <Card className="w-full max-w-4xl mx-auto border-2 shadow-xl">
            <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mx-auto mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span>Fiyat Hesaplayıcı</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                    Size En Uygun Planı Bulun
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Aylık analiz ihtiyacınıza göre en ekonomik seçeneği keşfedin
                </p>
            </CardHeader>

            <CardContent className="space-y-8">
                {/* Analysis Count Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold text-slate-700 dark:text-slate-300">
                            Aylık Analiz Sayısı
                        </label>
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {analysisCount}
                        </div>
                    </div>
                    <Slider
                        value={[analysisCount]}
                        onValueChange={(v: number[]) => setAnalysisCount(v[0])}
                        min={1}
                        max={50}
                        step={1}
                        className="py-4"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                        <span>1 analiz</span>
                        <span>50 analiz</span>
                    </div>
                </div>

                {/* Plan Selection */}
                <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(plans).map(([key, plan]) => (
                        <motion.div
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card
                                className={`cursor-pointer transition-all duration-300 ${selectedPlan === key
                                        ? 'border-2 border-indigo-500 shadow-lg shadow-indigo-500/20'
                                        : 'border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                                    }`}
                                onClick={() => setSelectedPlan(key as any)}
                            >
                                <CardContent className="p-4 relative">
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                                                En Popüler
                                            </span>
                                        </div>
                                    )}

                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3`}>
                                        <Sparkles className="h-6 w-6 text-white" />
                                    </div>

                                    <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                            ${plan.price}
                                        </span>
                                        {plan.originalPrice && (
                                            <span className="text-sm text-slate-400 line-through">
                                                ${plan.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                        {plan.credits} Kredi {plan.perCredit && '/ kredi'}
                                    </p>

                                    {plan.discount && (
                                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                                            <TrendingDown className="h-3 w-3" />
                                            %{plan.discount} İndirim
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Cost Breakdown */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Bilge Cost */}
                    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-2 border-indigo-200 dark:border-indigo-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-bold text-lg">Bilge ile</h3>
                            </div>
                            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                ${totalCost}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {analysisCount} analiz için toplam maliyet
                            </p>
                            <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800">
                                <p className="text-xs text-slate-500">
                                    Analiz başına: <span className="font-bold text-indigo-600">${(totalCost / analysisCount).toFixed(2)}</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Traditional Cost */}
                    <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-2 border-slate-300 dark:border-slate-700">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center">
                                    <span className="text-white text-xl">×</span>
                                </div>
                                <h3 className="font-bold text-lg">Geleneksel Yöntem</h3>
                            </div>
                            <div className="text-4xl font-bold text-slate-600 dark:text-slate-400 mb-2 line-through">
                                ${traditionalCost}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {analysisCount} analiz için tahmini maliyet
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-700">
                                <p className="text-xs text-slate-500">
                                    Analiz başına: <span className="font-bold">$15</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Savings Highlight */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-sm opacity-90 mb-1">Toplam Tasarruf</p>
                            <div className="text-4xl md:text-5xl font-bold">
                                ${savings}
                            </div>
                            <p className="text-sm opacity-90 mt-1">
                                Geleneksel yönteme göre %{savingsPercent} daha ekonomik!
                            </p>
                        </div>
                        <Button
                            size="lg"
                            className="bg-white text-green-600 hover:bg-green-50 shadow-xl"
                        >
                            Bu Planı Seç
                        </Button>
                    </div>
                </motion.div>

                {/* Additional Info */}
                <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                    * Hesaplamalar ortalama değerler üzerinden yapılmıştır. Gerçek tasarruf miktarı kullanım şeklinize göre değişebilir.
                </div>
            </CardContent>
        </Card>
    );
}
