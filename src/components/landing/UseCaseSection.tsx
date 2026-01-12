'use client';

import {
    BarChart,
    Upload,
    FileCheck,
    Download,
    Database,
    Zap,
    Settings2,
    FileText
} from "lucide-react";

export function UseCaseSection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950" id="how-it-works">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
                        Profesyonel Analizin Dört Adımı
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Teknik bilgi gerektirmeden dakikalar içinde sonuç alın. Veriden rapora giden en kısa yol.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-100 dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-900 z-0" />

                    {[
                        {
                            step: 1,
                            title: "Veri Seti Yükleme",
                            desc: "Excel dosyanızı sürükleyin veya dosya seçin.",
                            icon: Upload,
                            color: "bg-blue-100 text-blue-600"
                        },
                        {
                            step: 2,
                            title: "Veri Düzenleme",
                            desc: "Diagnose işlemleri ile verilerinizi analize hazırlayın.",
                            icon: Settings2,
                            color: "bg-indigo-100 text-indigo-600"
                        },
                        {
                            step: 3,
                            title: "Analiz Seçimi",
                            desc: "İhtiyaç duyduğunuz analiz türünü seçin.",
                            icon: BarChart,
                            color: "bg-teal-100 text-teal-600"
                        },
                        {
                            step: 4,
                            title: "Raporlama",
                            desc: "APA formatında raporunuzu Türkçe/İngilizce indirin.",
                            icon: Download,
                            color: "bg-amber-100 text-amber-600"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-sm border-2 border-white dark:border-slate-900 ${item.color} transition-transform group-hover:scale-110 duration-300`}>
                                <item.icon className="h-10 w-10" />
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold border-4 border-white dark:border-slate-950">
                                    {item.step}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-[200px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="mt-32 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                                R Tabanlı Güvenilir Analiz Sonuçları
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Dünya standartlarında kabul gören R istatistik motoru üzerine kurulu altyapımız ile,
                                karmaşık analizleri saniyeler içinde gerçekleştirin.
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {[
                                "Doğru Veri Girişi ile %100 Doğruluk",
                                "APA Formatında Profesyonel Raporlar",
                                "Otomatik Varsayım Kontrolleri",
                                "Sınırsız Veri Yükleme ve Depolama",
                            ].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                                        <FileCheck className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 border text-slate-800 text-sm font-medium">
                                <Database className="h-4 w-4" />
                                R Core Team tarafından doğrulandı
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border p-6 md:p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent opacity-50 rounded-bl-full" />

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h4 className="font-bold flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-[#860000]" />
                                    APA Rapor Önizleme
                                </h4>
                                <div className="flex gap-2">
                                    <span className="text-xs font-bold px-2 py-1 bg-slate-200 rounded">TR</span>
                                    <span className="text-xs text-slate-400 px-2 py-1">EN</span>
                                </div>
                            </div>

                            <div className="font-serif text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 p-4 rounded border shadow-sm">
                                <p className="mb-4">
                                    <strong>Tablo 1.</strong> <em>Bağımsız Örneklem T-Testi Sonuçları</em>
                                </p>
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-slate-800">
                                            <th className="py-2">Değişken</th>
                                            <th className="py-2">Grup</th>
                                            <th className="py-2">N</th>
                                            <th className="py-2">Ort.</th>
                                            <th className="py-2">SS</th>
                                            <th className="py-2">t</th>
                                            <th className="py-2">p</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-slate-200">
                                            <td className="py-2" rowSpan={2}>Memnuniyet</td>
                                            <td className="py-2">Deneysel</td>
                                            <td>30</td>
                                            <td>85.4</td>
                                            <td>5.2</td>
                                            <td rowSpan={2} className="align-middle border-l pl-2">4.23</td>
                                            <td rowSpan={2} className="align-middle font-bold text-green-600">.001*</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Kontrol</td>
                                            <td>30</td>
                                            <td>72.1</td>
                                            <td>6.8</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="mt-4 italic text-xs text-slate-500">
                                    *p &lt; .05 düzeyinde anlamlı fark bulunmuştur.
                                </p>
                            </div>

                            <div className="bg-indigo-50 border border-indigo-100 rounded p-3 text-xs text-indigo-800 flex gap-2">
                                <Zap className="h-4 w-4 shrink-0" />
                                <p>
                                    <strong>Analiz Yorumu:</strong> Deneysel grubun memnuniyet puanları (M=85.4), kontrol grubuna (M=72.1) göre istatistiksel olarak anlamlı derecede yüksektir, t(58)=4.23, p=.001.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
