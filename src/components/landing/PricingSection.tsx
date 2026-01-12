'use client';

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Mini Package */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 relative hover:border-indigo-300 transition-all">
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            %10 İndirim
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Mini Paket</h3>
                        <p className="text-slate-500 text-sm mb-6">Küçük araştırma projeleri için mükemmel</p>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">6.750 ₺</span>
                            <span className="text-slate-400 line-through text-sm ml-2">7.500 ₺</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span className="font-bold">100 Kredi</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span>2 yıl geçerlilik süresi</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span>TR/EN Raporlama</span>
                            </li>
                        </ul>
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">Satın Al</Button>
                    </div>

                    {/* Standard Package (Featured) */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border-2 border-indigo-600 relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            EN POPÜLER
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Standart Paket</h3>
                        <p className="text-slate-500 text-sm mb-6">Orta ölçekli tez ve çalışmalar için</p>

                        <div className="mb-6">
                            <span className="text-3xl font-bold text-indigo-600">9.561 ₺</span>
                            <span className="text-slate-400 line-through text-sm ml-2">11.250 ₺</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-indigo-600 text-white"><Check className="h-3 w-3" /></div>
                                <span className="font-bold text-lg">150 Kredi</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span>%15 Avantajlı Fiyat</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span>Sınırsız Veri Saklama</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span>Öncelikli Destek</span>
                            </li>
                        </ul>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12">Hemen Başla</Button>
                    </div>

                    {/* Custom Package */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 relative hover:border-indigo-300 transition-all">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Özel Paket</h3>
                        <p className="text-slate-500 text-sm mb-6">İhtiyacınıza göre özelleştirilebilir</p>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">75 ₺</span>
                            <span className="text-sm text-slate-500"> / kredi</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span className="font-bold">Esnek Kredi Miktarı</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span>Kurumsal Faturalandırma</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="p-1 rounded-full bg-indigo-100 text-indigo-600"><Check className="h-3 w-3" /></div>
                                <span>Tüm Özellikler Dahil</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full">Paket Oluştur</Button>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 mb-4">Üniversiteler ve araştırma grupları için toplu alım fırsatları.</p>
                    <Button variant="link" className="text-[#860000]">Kurumsal Satış ile İletişime Geçin &rarr;</Button>
                </div>
            </div>
        </section>
    );
}
