'use client';

import { Check, X, Zap, Crown, Shield } from "lucide-react";

export function ComparisonSection() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950" id="comparison">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#860000]/10 text-[#860000] text-sm font-bold uppercase tracking-wider mb-4">
                        Neden Farklıyız?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                        Geleneksel Yöntemlere Göre <span className="text-[#860000]">Bilge</span> Farkı
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Karmaşık istatistik programlarıyla (SPSS, R, Minitab) saatler harcamayın.
                        Bilge ile analizleriniz saniyeler içinde, hatasız ve raporlanmaya hazır.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Features Column (Left) */}
                        <div className="hidden md:block col-span-1 bg-slate-50/50 dark:bg-slate-900/50 p-8 border-r border-slate-100 dark:border-slate-800">
                            <div className="h-20 flex items-center mb-8">
                                <h3 className="text-xl font-bold text-slate-400">Karşılaştırma Kriterleri</h3>
                            </div>
                            <div className="space-y-8">
                                {FEATURES.map((f, i) => (
                                    <div key={i} className="h-16 flex items-center font-medium text-slate-600 dark:text-slate-300">
                                        {f.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Traditional Column (Middle) */}
                        <div className="col-span-1 p-8 border-r border-slate-100 dark:border-slate-800 relative">
                            <div className="h-20 flex flex-col justify-center mb-8">
                                <h3 className="text-xl font-bold text-slate-500">Geleneksel Yöntemler</h3>
                                <p className="text-sm text-slate-400">SPSS, R, Minitab, Excel</p>
                            </div>
                            <div className="space-y-8">
                                {FEATURES.map((f, i) => (
                                    <div key={i} className="h-16 flex flex-col justify-center md:hidden">
                                        {/* Mobile Label */}
                                        <span className="text-xs font-bold text-slate-400 uppercase mb-1">{f.name}</span>
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <X className="h-5 w-5 text-red-400 shrink-0" />
                                            <span className="text-sm">{f.trad}</span>
                                        </div>
                                    </div>
                                ))}
                                {/* Desktop View for Trad */}
                                {FEATURES.map((f, i) => (
                                    <div key={i} className="hidden md:flex h-16 items-center gap-3 text-slate-500">
                                        <X className="h-5 w-5 text-red-400 shrink-0" />
                                        <span className="text-sm">{f.trad}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bilge Column (Right - Highlighted) */}
                        <div className="col-span-1 p-8 bg-gradient-to-b from-[#860000]/5 to-transparent relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#860000]/10 rounded-bl-full z-0"></div>

                            <div className="h-20 flex flex-col justify-center mb-8 relative z-10">
                                <h3 className="text-2xl font-bold text-[#860000] flex items-center gap-2">
                                    <Crown className="h-6 w-6 fill-current" />
                                    Bilge AI
                                </h3>
                                <p className="text-sm text-[#860000]/70 font-medium">Yeni Nesil Analiz Asistanı</p>
                            </div>

                            <div className="space-y-8 relative z-10">
                                {FEATURES.map((f, i) => (
                                    <div key={i} className="md:h-16 flex flex-col justify-center">
                                        {/* Mobile Label is handled in previous block for mobile, this is unified for desktop logic but simplified */}
                                        <div className="block md:hidden text-xs font-bold text-[#860000]/50 uppercase mb-1">{f.name}</div>
                                        <div className="flex items-center gap-3 text-slate-900 dark:text-white font-semibold">
                                            <div className="h-6 w-6 rounded-full bg-[#860000]/10 flex items-center justify-center shrink-0">
                                                <Check className="h-4 w-4 text-[#860000]" />
                                            </div>
                                            <span className="text-base">{f.bilge}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium">
                        <Shield className="h-4 w-4" />
                        Verileriniz şifrelenir ve asla 3. taraflarla paylaşılmaz.
                    </div>
                </div>
            </div>
        </section>
    );
}

const FEATURES = [
    {
        name: "Kullanım Kolaylığı",
        trad: "Karmaşık arayüzler, kodlama",
        bilge: "Sohbet eder gibi doğal dil"
    },
    {
        name: "Analiz Hızı",
        trad: "Saatler süren işlemler",
        bilge: "Saniyeler içinde sonuç"
    },
    {
        name: "Öğrenme Gereksinimi",
        trad: "Aylar süren eğitimler",
        bilge: "Sıfır bilgi ile hemen başla"
    },
    {
        name: "Raporlama",
        trad: "Manuel yazım ve formatlama",
        bilge: "Oto-APA 7 formatında rapor"
    },
    {
        name: "Hata Riski",
        trad: "Yüksek insan hatası riski",
        bilge: "AI destekli oto-kontrol"
    }
];
