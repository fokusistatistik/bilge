'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, TrendingDown, Clock, Wallet } from "lucide-react";

export function InteractivePricingCalculator() {
    const [analysisCount, setAnalysisCount] = useState(10);
    const [hourlyRate, setHourlyRate] = useState(50);
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

    // ROI Logic
    const avgTraditionalTime = 4; // hours per analysis
    const traditionalCost = analysisCount * avgTraditionalTime * hourlyRate;
    const savings = traditionalCost - totalCost;
    const savingsPercent = Math.round((savings / traditionalCost) * 100);

    return (
        <Card className="w-full max-w-5xl mx-auto border-2 shadow-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <CardHeader className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/30 text-[#860000] dark:text-red-400 text-sm font-medium mx-auto mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span>Gelişmiş ROI Analizi</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl text-slate-900 dark:text-white">
                    Akademik Zaman ve Maliyet Analizi
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
                    Kendi saatlik değerinizi girin, Bilge ile ne kadar tasarruf edeceğinizi hesaplayın.
                </p>
            </CardHeader>

            <CardContent className="space-y-12 p-8">
                {/* Sliders Grid */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Analysis Count Slider */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#860000]" />
                                Aylık Analiz Sayısı
                            </label>
                            <div className="text-2xl font-bold text-[#860000] dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg">
                                {analysisCount}
                            </div>
                        </div>
                        <Slider
                            value={[analysisCount]}
                            onValueChange={(v: number[]) => setAnalysisCount(v[0])}
                            min={1}
                            max={50}
                            step={1}
                            className="py-4 cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-400 font-medium">
                            <span>1 Analiz</span>
                            <span>50 Analiz</span>
                        </div>
                    </div>

                    {/* Hourly Rate Slider */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-[#860000]" />
                                Sizin Saatlik Değeriniz ($)
                            </label>
                            <div className="text-2xl font-bold text-[#860000] dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg">
                                ${hourlyRate}
                            </div>
                        </div>
                        <Slider
                            value={[hourlyRate]}
                            onValueChange={(v: number[]) => setHourlyRate(v[0])}
                            min={10}
                            max={500}
                            step={5}
                            className="py-4 cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-400 font-medium">
                            <span>$10/saat</span>
                            <span>$500/saat</span>
                        </div>
                    </div>
                </div>

                {/* Plan Selection */}
                <div className="grid md:grid-cols-3 gap-6">
                    {Object.entries(plans).map(([key, plan]: [string, any]) => (
                        <motion.div
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card
                                className={`cursor-pointer transition-all duration-300 h-full ${selectedPlan === key
                                    ? 'border-2 border-[#860000] shadow-lg shadow-red-900/10 bg-red-50/50 dark:bg-red-900/10'
                                    : 'border border-slate-200 dark:border-slate-800 hover:border-red-300'
                                    }`}
                                onClick={() => setSelectedPlan(key as any)}
                            >
                                <CardContent className="p-5 relative">
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                            <span className="px-3 py-1 bg-[#860000] text-white text-xs font-bold rounded-full shadow-lg">
                                                Önerilen
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{plan.name}</h3>
                                            <p className="text-xs text-slate-500">{plan.credits} Kredi</p>
                                        </div>
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-md`}>
                                            <Sparkles className="h-5 w-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                            ${plan.price}
                                        </span>
                                    </div>
                                    {plan.discount && (
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold">
                                            <TrendingDown className="h-3 w-3" />
                                            %{plan.discount} daha uygun
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Results Area */}
                <div className="grid md:grid-cols-2 gap-8 items-stretch">

                    {/* Comparison Card */}
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-slate-400" />
                                Maliyet Karşılaştırması
                            </h4>

                            {/* Traditional Row */}
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300">Geleneksel Yöntem</p>
                                    <p className="text-xs text-slate-500">Ortalama {avgTraditionalTime * analysisCount} saat harcarsınız</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-bold text-slate-500 line-through">${traditionalCost}</span>
                                </div>
                            </div>

                            {/* Bilge Row */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-[#860000] dark:text-red-400 flex items-center gap-2">
                                        Bilge Platformu
                                        <span className="px-2 py-0.5 bg-red-100 text-[#860000] text-xs rounded-full dark:bg-red-900/30">Hızlı</span>
                                    </p>
                                    <p className="text-xs text-slate-500">Saniyeler içinde sonuçlanır</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-[#860000] dark:text-white">${totalCost}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Savings Highlight */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#860000] to-red-800 p-8 text-white flex flex-col justify-center items-center text-center shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

                        <p className="text-red-100 font-medium mb-2 uppercase tracking-wider text-sm">Toplam Kazancınız</p>
                        <div className="text-6xl font-extrabold mb-2 tracking-tight">
                            ${savings}
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20">
                            <TrendingDown className="h-4 w-4" />
                            %{savingsPercent > 0 ? savingsPercent : 0} Maliyet Avantajı
                        </div>
                        <Button className="w-full bg-white text-[#860000] hover:bg-slate-100 font-bold h-12">
                            Bu Tasarrufla Hemen Başla
                        </Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
