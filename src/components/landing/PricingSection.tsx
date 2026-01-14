'use client';

import { Button } from "@/components/ui/button";
import { InteractivePricingCalculator } from "./InteractivePricingCalculator";
import { Check, User, GraduationCap } from "lucide-react";

export function PricingSection() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950" id="pricing">
            <div className="container px-4 md:px-6 mx-auto">


                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
                        Esnek ve Şeffaf Fiyatlandırma
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Sadece ihtiyacınız olan analizler için ödeme yapın. Lisans ücreti yok, gizli maliyet yok.
                    </p>
                </div>

                {/* Interactive Calculator */}
                <div className="mb-16">
                    <InteractivePricingCalculator />
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Mini Package */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 relative hover:border-red-300 transition-all group">
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            %10 İndirim
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Başlangıç Paketi</h3>
                        <p className="text-slate-500 text-sm mb-6">Temel analiz ihtiyaçlarınız için ideal başlangıç.</p>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">$150</span>
                            <span className="text-slate-400 line-through text-sm ml-2">$165</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-red-100 text-[#860000]"><Check className="h-3 w-3" /></div>
                                <span className="font-bold">100 Kredi</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-red-100 text-[#860000]"><Check className="h-3 w-3" /></div>
                                <span>Python Güçlü Analiz Motoru</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-red-100 text-[#860000]"><Check className="h-3 w-3" /></div>
                                <span>7/24 Erişim</span>
                            </li>
                        </ul>
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">Satın Al</Button>
                    </div>

                    {/* Standard Package (Featured) */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border-2 border-[#860000] relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-[#860000] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            EN POPÜLER
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Profesyonel Paket</h3>
                        <p className="text-slate-500 text-sm mb-6">Kapsamlı tez ve araştırmalar için tam donanımlı çözüm.</p>

                        <div className="mb-6">
                            <span className="text-3xl font-bold text-[#860000]">$200</span>
                            <span className="text-slate-400 line-through text-sm ml-2">$250</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-[#860000] text-white"><Check className="h-3 w-3" /></div>
                                <span className="font-bold text-lg">150 Kredi + Bonus</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-red-100 text-[#860000]"><Check className="h-3 w-3" /></div>
                                <span>Gelişmiş Görselleştirme Araçları</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-red-100 text-[#860000]"><Check className="h-3 w-3" /></div>
                                <span>Öncelikli Destek Hattı</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-red-100 text-[#860000]"><Check className="h-3 w-3" /></div>
                                <span>Detaylı APA Raporlama</span>
                            </li>
                        </ul>
                        <Button className="w-full bg-[#860000] hover:bg-[#660000] text-white h-12">Hemen Başla</Button>
                    </div>

                    {/* Enterprise Package */}
                    <div className="bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-800 relative hover:border-red-500/50 transition-all text-white">
                        <div className="absolute top-0 right-0 bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            KURUMSAL
                        </div>
                        <h3 className="text-xl font-bold mb-2">Enterprise / Kurumsal</h3>
                        <p className="text-slate-400 text-sm mb-6">Üniversiteler ve araştırma grupları için sınırsız çözüm.</p>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">Özel Teklif</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-red-900/50 text-red-400"><Check className="h-3 w-3" /></div>
                                <span className="font-bold">Sınırsız Kredi Seçeneği</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="p-1 rounded-full bg-red-900/50 text-red-400"><Check className="h-3 w-3" /></div>
                                <span>API Erişimi</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="p-1 rounded-full bg-red-900/50 text-red-400"><Check className="h-3 w-3" /></div>
                                <span>Kurum İçi Eğitim & Destek</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="p-1 rounded-full bg-red-900/50 text-red-400"><Check className="h-3 w-3" /></div>
                                <span>Size Özel Sunucu Kurulumu</span>
                            </li>
                        </ul>
                        <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold transition-colors">İletişime Geçin</Button>
                    </div>
                </div>

                {/* Additional Services */}
                {/* Additional Services */}
                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {/* Consulting */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-red-100 dark:border-red-900/20 p-6 shadow-sm hover:border-red-300 transition-colors flex items-start gap-4 group">
                        <div className="h-12 w-12 rounded-full bg-red-100 text-[#860000] dark:bg-red-900/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Birebir Danışmanlık</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                Tez, makale ve projeleriniz için uzmanlarımızla görüntülü görüşün, yol haritanızı çizin.
                            </p>
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#860000] bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30">
                                20 Kredi / Saat
                                <span className="text-slate-300 dark:text-slate-600 font-normal">|</span>
                                <span className="text-slate-600 dark:text-slate-400">Panelden Randevu</span>
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-100 dark:border-blue-900/20 p-6 shadow-sm hover:border-blue-300 transition-colors flex items-start gap-4 group">
                        <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Metodoloji Eğitimi</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                İstatistiksel testler, SPSS/R kullanımı ve akademik raporlama üzerine özel ders alın.
                            </p>
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/10 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                30 Kredi / Saat
                                <span className="text-slate-300 dark:text-slate-600 font-normal">|</span>
                                <span className="text-slate-600 dark:text-slate-400">Panelden Randevu</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
