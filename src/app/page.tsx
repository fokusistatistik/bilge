'use client';

import { HeroSection } from "@/components/landing/HeroSection";
import { UseCaseSection } from "@/components/landing/UseCaseSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Navbar */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-slate-200 dark:border-slate-800" : "bg-transparent"
      )}>
        <div className="container px-4 md:px-6 mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif font-bold text-2xl text-slate-900 dark:text-white">
            {/* Logo */}
            <img
              src="https://static.fokusistatistik.com/bilge/logos/bilgelogo.jpg"
              alt="Bilge Logo"
              className="h-10 w-auto rounded-lg"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="#features" className="hover:text-[#860000] dark:hover:text-white transition-colors">Özellikler</Link>
            <Link href="#how-it-works" className="hover:text-[#860000] dark:hover:text-white transition-colors">Nasıl Çalışır</Link>
            <Link href="#pricing" className="hover:text-[#860000] dark:hover:text-white transition-colors">Fiyatlandırma</Link>
            <Link href="#faq" className="hover:text-[#860000] dark:hover:text-white transition-colors">SSS</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:inline-block text-sm font-medium text-slate-600 hover:text-[#860000] dark:text-slate-300">
              Giriş Yap
            </Link>
            <Link href="/login">
              <Button className="bg-[#860000] hover:bg-[#660000] text-white">Hemen Dene</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <UseCaseSection />
        <ComparisonSection />
        <PricingSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
