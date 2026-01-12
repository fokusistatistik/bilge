'use client';

import { Zap } from "lucide-react";
import { RoiCalculator } from "./RoiCalculator";

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
                        <div className="col-span-4 md:col-span-4 text-slate-500 flex items-center">Geleneksel (SPSS, Manuel Kodlama)</div>
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

                {/* ROI Calculator */}
                <div className="mt-20">
                    <RoiCalculator />
                    <p className="text-center text-xs text-slate-500 mt-4 max-w-2xl mx-auto">
                        * Hesaplamalar ortalama değerler üzerinden yapılmıştır. Bilge ile analiz süresi geleneksel yöntemlere göre ortalama %85 daha hızlıdır.
                        Tasarruf miktarı, kendi saatlik ücretiniz ve iş yükünüze göre değişiklik gösterebilir.
                    </p>
                </div>
            </div>
        </section>
    );
}
