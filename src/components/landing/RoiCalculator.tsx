'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calculator, DollarSign, Clock } from "lucide-react";

export function RoiCalculator() {
    const [monthlyCount, setMonthlyCount] = useState(5);
    const [avgTime, setAvgTime] = useState(4);
    const [hourlyRate, setHourlyRate] = useState(50); // Default to $50 for realistic dollar context

    // Constants
    const BILGE_SPEED_FACTOR = 0.15; // 85% faster

    // Calculations
    const competitorTime = avgTime; // hours
    const bilgeTime = avgTime * BILGE_SPEED_FACTOR; // hours

    const competitorCostPerAnalysis = avgTime * hourlyRate;
    const bilgeCostPerAnalysis = bilgeTime * hourlyRate; // Cost of user's time spent using Bilge

    const competitorMonthlyCost = competitorCostPerAnalysis * monthlyCount;
    const bilgeMonthlyCost = bilgeCostPerAnalysis * monthlyCount;

    const monthlySavings = competitorMonthlyCost - bilgeMonthlyCost;
    const yearlySavings = monthlySavings * 12;
    const efficiencyIncrease = 85;

    return (
        <Card className="w-full max-w-4xl mx-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="bg-indigo-600 p-6 text-white text-center">
                <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Calculator className="h-6 w-6" /> Yatırım Getirisi (ROI) Hesaplayıcı
                </h3>
                <p className="opacity-80">Zamanınızın değerini hesaplayın</p>
            </div>
            <CardContent className="p-8 grid md:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="font-semibold text-slate-700 dark:text-slate-300">Aylık Analiz Sayısı</label>
                            <span className="font-bold text-indigo-600">{monthlyCount}</span>
                        </div>
                        <Slider
                            value={[monthlyCount]}
                            onValueChange={(v) => setMonthlyCount(v[0])}
                            max={50}
                            step={1}
                            className="py-2"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="font-semibold text-slate-700 dark:text-slate-300">Analiz Başına Ortalama Süre (Saat)</label>
                            <span className="font-bold text-indigo-600">{avgTime} Saat</span>
                        </div>
                        <Slider
                            value={[avgTime]}
                            onValueChange={(v) => setAvgTime(v[0])}
                            max={20}
                            step={0.5}
                            className="py-2"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="font-semibold text-slate-700 dark:text-slate-300">Saatlik Değeriniz ($)</label>
                            <span className="font-bold text-indigo-600">${hourlyRate}</span>
                        </div>
                        <Slider
                            value={[hourlyRate]}
                            onValueChange={(v) => setHourlyRate(v[0])}
                            max={500}
                            step={10}
                            className="py-2"
                        />
                    </div>

                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-4 pointer-events-none">
                        Otomatik Hesaplanıyor
                    </Button>
                </div>

                {/* Results Table */}
                <div className="flex flex-col justify-center">
                    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-sm">
                        <div className="grid grid-cols-4 bg-slate-100 dark:bg-slate-800 p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-center">
                            <div className="text-left pl-2">Metrik</div>
                            <div className="text-indigo-600">Bilge</div>
                            <div className="text-slate-500">Geleneksel</div>
                            <div className="text-green-600">Fark</div>
                        </div>

                        <div className="grid grid-cols-4 p-3 border-b border-slate-100 dark:border-slate-800 text-center items-center">
                            <div className="font-medium text-left pl-2 text-slate-700 dark:text-slate-300">Süre / Analiz</div>
                            <div className="font-bold text-slate-900 dark:text-white">{bilgeTime.toFixed(1)} sa</div>
                            <div className="text-slate-500">{competitorTime} sa</div>
                            <div className="text-green-600 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded text-xs font-bold">
                                {(competitorTime - bilgeTime).toFixed(1)} sa Hızlı
                            </div>
                        </div>

                        <div className="grid grid-cols-4 p-3 border-b border-slate-100 dark:border-slate-800 text-center items-center">
                            <div className="font-medium text-left pl-2 text-slate-700 dark:text-slate-300">Maliyet / Analiz</div>
                            <div className="font-bold text-slate-900 dark:text-white">${bilgeCostPerAnalysis.toFixed(0)}</div>
                            <div className="text-slate-500">${competitorCostPerAnalysis.toFixed(0)}</div>
                            <div className="text-green-600 text-xs font-bold">
                                ${(competitorCostPerAnalysis - bilgeCostPerAnalysis).toFixed(0)} Tasarruf
                            </div>
                        </div>

                        <div className="grid grid-cols-4 p-3 bg-indigo-50 dark:bg-indigo-900/10 text-center items-center">
                            <div className="font-bold text-left pl-2 text-indigo-900 dark:text-indigo-300">Aylık Maliyet</div>
                            <div className="font-bold text-indigo-700 dark:text-indigo-400">${bilgeMonthlyCost.toFixed(0)}</div>
                            <div className="text-slate-500 line-through">${competitorMonthlyCost.toFixed(0)}</div>
                            <div className="font-bold text-green-600 text-md">
                                %{efficiencyIncrease}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-green-800 dark:text-green-300 font-medium text-sm">Tahmini Yıllık Tasarruf</p>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                ${yearlySavings.toLocaleString()}
                            </p>
                        </div>
                        <div className="h-10 w-10 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-green-700 dark:text-green-300" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
