'use client';

import { Zap } from "lucide-react";

export function ComparisonSection() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950" id="comparison">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
                        Neden Bilge&apos;yi Seçmelisiniz?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Geleneksel yöntemlere göre %85 daha hızlı analiz süreci. Saatler süren işlemleri saniyeler içinde tamamlayın.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
                    <div className="grid grid-cols-12 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-bold p-4 text-sm md:text-base">
                        <div className="col-span-4 md:col-span-4 text-slate-500 flex items-center">Özellik</div>
                        <div className="col-span-4 md:col-span-4 text-[#860000] flex items-center gap-2">
                            <div className="h-6 w-6 bg-[#860000] rounded flex items-center justify-center text-white text-xs font-serif">B</div>
                            Bilge Platformu
                        </div>
                        <div className="col-span-4 md:col-span-4 text-slate-500 flex items-center">Geleneksel (SPSS, Python)</div>
                    </div>

                    {[
                        {
                            feature: "Analiz Süresi",
                            bilge: "Saniyeler (Anlık)",
                            trad: "Saatler / Günler",
                            highlight: true
                        },
                        {
                            feature: "Teknik Bilgi",
                            bilge: "Gerekmez (Sürükle-Bırak)",
                            trad: "İleri İstatistik / Kodlama",
                            highlight: false
                        },
                        {
                            feature: "Rapor Formatı",
                            bilge: "APA 7 (Hazır Word)",
                            trad: "Manuel Hazırlama",
                            highlight: true
                        },
                        {
                            feature: "Hata Riski",
                            bilge: "Minimum (Oto-Kontrol)",
                            trad: "Yüksek (Manuel Hata)",
                            highlight: false
                        },
                        {
                            feature: "Maliyet",
                            bilge: "Kullandıkça Öde (Ekonomik)",
                            trad: "Yüksek Lisans Ücretleri",
                            highlight: true
                        }
                    ].map((row, idx) => (
                        <div key={idx} className={`grid grid-cols-12 p-4 text-sm md:text-base border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}>
                            <div className="col-span-4 md:col-span-4 font-medium text-slate-700 dark:text-slate-200 flex items-center">
                                {row.feature}
                            </div>
                            <div className="col-span-4 md:col-span-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                {row.highlight && <Zap className="h-4 w-4 text-amber-500 fill-current" />}
                                {row.bilge}
                            </div>
                            <div className="col-span-4 md:col-span-4 text-slate-500 flex items-center">
                                {row.trad}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ROI Calculator Mini */}
                <div className="mt-16 max-w-4xl mx-auto bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

                    <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Maliyet Karşılaştırması</h3>
                            <p className="text-indigo-200 mb-6">
                                Aylık ortalama 5 analiz yapan bir araştırmacı için hesaplanmıştır.
                            </p>
                            <div className="flex gap-8">
                                <div>
                                    <div className="text-indigo-300 text-sm mb-1">Bilge</div>
                                    <div className="text-3xl font-bold">450 ₺</div>
                                </div>
                                <div>
                                    <div className="text-indigo-300 text-sm mb-1">Diğerleri</div>
                                    <div className="text-3xl font-bold text-slate-400 line-through">3.000 ₺</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-indigo-800/50 p-6 rounded-xl border border-indigo-700">
                            <div className="flex items-center justify-between mb-4 border-b border-indigo-700 pb-4">
                                <span>Verimlilik Artışı</span>
                                <span className="text-green-400 font-bold text-xl">%85</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Yıllık Tasarruf</span>
                                <span className="text-white font-bold text-xl">30.600 ₺</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
