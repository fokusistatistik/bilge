'use client';

import { motion } from 'framer-motion';
import {
    Activity,
    BarChart2,
    Binary,
    Calculator,
    CheckCircle2,
    FileSpreadsheet,
    GitGraph,
    LineChart,
    PieChart,
    Scale,
    ScatterChart,
    Sigma,
    Table2,
    Microscope
} from 'lucide-react';

export function SupportedAnalyses() {
    const categories = [
        {
            title: "Veri Ön Hazırlığı & Güvenilirlik",
            icon: FileSpreadsheet,
            description: "Verilerinizi analize hazırlayın ve ölçek güvenilirliğini test edin.",
            tests: [
                "Eksik Veri Analizi (Missing Value Analysis)",
                "Uç Değer (Outlier) Tespiti (Boxplot & Z-score)",
                "Normallik Testleri (Shapiro-Wilk, Kolmogorov-Smirnov)",
                "Q-Q Plotlar & Histogramlar",
                "Güvenilirlik Analizi (Cronbach's Alpha)"
            ],
            color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200"
        },
        {
            title: "Tanımlayıcı İstatistikler",
            icon: Calculator,
            description: "Veri setinizin genel fotoğrafını çekin.",
            tests: [
                "Merkezi Eğilim (Ortalama, Medyan, Mod)",
                "Dağılım Ölçüleri (SS, Varyans, Min-Max)",
                "Frekans Tabloları (Kategorik Veriler)",
                "Çeyrekler ve Yüzdelikler",
                "Çapraz Tablolar (Crosstabs)"
            ],
            color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200"
        },
        {
            title: "Hipotez Testleri (Parametrik & Non-Parametrik)",
            icon: Scale,
            description: "Gruplar arası farkları bilimsel olarak kanıtlayın.",
            tests: [
                "Independent Samples t-test / Mann-Whitney U",
                "Paired Samples t-test / Wilcoxon Signed Rank",
                "One-Way ANOVA / Kruskal-Wallis H",
                "Ki-Kare (Chi-Square) Bağımsızlık Testi",
                "Fisher's Exact Test"
            ],
            color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-200"
        },
        {
            title: "İlişki ve Etki Analizleri",
            icon: GitGraph,
            description: "Değişkenler arasındaki neden-sonuç ilişkilerini keşfedin.",
            tests: [
                "Korelasyon Analizi (Pearson & Spearman)",
                "Basit Doğrusal Regresyon (Simple Linear Regression)",
                "Etki Büyüklüğü (Effect Size) Hesaplamaları",
                "Korelasyon Matrisi",
                "Kısmi (Partial) Korelasyon"
            ],
            color: "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200"
        },
        {
            title: "Gelişmiş Görselleştirme",
            icon: PieChart,
            description: "Sonuçlarınızı etkileyici grafiklerle sunun.",
            tests: [
                "Bar Chart & Pie Chart",
                "Histogram & Boxplot (Kutu Grafik)",
                "Scatter Plot (Saçılım Grafiği)",
                "Korelasyon Isı Haritası (Heatmap)",
                "Violin Plot & Line Chart"
            ],
            color: "text-pink-600 bg-pink-50 dark:bg-pink-900/20 border-pink-200"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50" id="supported-analyses">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/30 text-[#860000] dark:text-red-400 text-xs md:text-sm font-medium mb-4">
                        <Microscope className="h-4 w-4" />
                        <span>Kapsamlı Analiz Kütüphanesi</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                        Desteklenen Test ve Analizler
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
                        Tez ve makalelerin %80'ini kapsayan temel yöntemler
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            • Aktif
                        </span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${category.color}`}>
                                <category.icon className={`h-6 w-6 ${category.color.split(' ')[0]}`} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                {category.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">
                                {category.description}
                            </p>

                            <ul className="space-y-3">
                                {category.tests.map((test, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        <span>{test}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 inline-block px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                        * Lojistik Regresyon, Çok Değişkenli İstatistikler (MANOVA, Faktör Analizi, SEM) ve Makine Öğrenmesi (ML) modülleri <span className="text-[#860000] font-bold">Çok Yakında</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
