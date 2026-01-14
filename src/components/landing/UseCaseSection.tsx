'use client';

import {
    GraduationCap,
    BookOpen,
    Briefcase,
    Users,
    Stethoscope,
    Activity,
    Microscope,
    Globe,
    School,
    Building2
} from "lucide-react";

export function UseCaseSection() {
    const mainCases = [
        {
            title: "Akademik Araştırmalar",
            description: "Tıp, diş hekimliği, sağlık bilimleri ve diğer fakültelerde makale analizleri.",
            icon: BookOpen,
            color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
            title: "Tez Araştırmaları",
            description: "Uzmanlık, doktora ve yüksek lisans tezleri için profesyonel analizler.",
            icon: GraduationCap,
            color: "bg-purple-50 text-purple-600 border-purple-200"
        },
        {
            title: "Profesyonel Araştırmalar",
            description: "Yönetici ve araştırmacılar için istatistik bilimi ile veriye dayalı kararlar.",
            icon: Briefcase,
            color: "bg-amber-50 text-amber-600 border-amber-200"
        },
        {
            title: "Genel Kullanım",
            description: "İstatistiksel analize ihtiyaç duyan herkes için hızlı ve güvenilir çözümler.",
            icon: Users,
            color: "bg-green-50 text-green-600 border-green-200"
        }
    ];

    const academicAreas = [
        { title: "Tıp Fakültesi", desc: "Klinik araştırmalar ve tıbbi veriler", icon: Stethoscope },
        { title: "Diş Hekimliği", desc: "Dental araştırmalar ve analizler", icon: Activity },
        { title: "Sağlık Bilimleri", desc: "Sağlık araştırmaları ve veri analizleri", icon: Microscope },
        { title: "Sosyal Bilimler", desc: "Toplumsal araştırmalar ve anketler", icon: Globe },
        { title: "Eğitim Bilimleri", desc: "Eğitim araştırmaları ve öğrenci analizleri", icon: School },
        { title: "Özel Sektör", desc: "Pazar araştırmaları ve iş analizleri", icon: Building2 },
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-950" id="use-cases">
            <div className="container px-4 md:px-6 mx-auto">

                {/* Main Use Cases */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
                        Kullanım Alanları
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Her alanda profesyonel istatistik analizi
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {mainCases.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 border ${item.color}`}>
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Academic Areas Detail */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Akademik Kullanım Alanları</h3>
                        <p className="text-slate-500 dark:text-slate-400">Hangi fakülte ve bölümde olursanız olun, Bilge yanınızda.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8">
                        {academicAreas.map((area, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="mt-1 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm text-[#860000]">
                                    <area.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{area.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        {area.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
