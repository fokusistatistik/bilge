'use client';

import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container px-4 md:px-6 mx-auto py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg w-fit">
                            <img
                                src="https://static.fokusistatistik.com/bilge/logos/bilgelogo.jpg"
                                alt="Bilge Logo"
                                className="h-8 w-auto"
                            />
                        </div>
                        <h5 className="text-white font-semibold text-xs opacity-70">
                            Bilimsel İstatistik ve Literatür Geliştirme Enstrümanı
                        </h5>
                        <p className="text-slate-400 leading-relaxed">
                            Doğru veri, doğru analiz, bilimsel kanıt.
                            Akademik çalışmalarınız için yapay zeka destekli profesyonel çözüm ortağınız.
                        </p>
                        <div className="pt-2 text-xs text-slate-500">
                            <strong>Bilge</strong>, bir <a href="https://fokusistatistik.com" target="_blank" className="text-white hover:underline">Fokus İstatistik</a> markasıdır.
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold">Hızlı Erişim</h4>
                        <ul className="space-y-2">
                            <li><Link href="#features" className="hover:text-white transition-colors">Özellikler</Link></li>
                            <li><Link href="#how-it-works" className="hover:text-white transition-colors">Nasıl Çalışır?</Link></li>
                            <li><Link href="#pricing" className="hover:text-white transition-colors">Fiyatlandırma</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Giriş Yap</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold">Kurumsal</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Kullanım Koşulları</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold">İletişim</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-[#860000] shrink-0" />
                                <span>İzmit, Kocaeli</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-[#860000] shrink-0" />
                                <span>0535 404 07 12</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-[#860000] shrink-0" />
                                <span>bilgi@fokusistatistik.com</span>
                            </li>
                        </ul>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500">© 2026 Bilge Platformu. Tüm hakları saklıdır.</p>
                    <p className="text-slate-600 text-xs">
                        Developed with <span className="text-[#860000]">❤️</span> by Fokus İstatistik R&D Team.
                    </p>
                </div>
            </div>
        </footer>
    );
}
