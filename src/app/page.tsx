'use client';

import { HeroSection } from "@/components/landing/HeroSection";
import { EnhancedFeaturesSection } from "@/components/landing/EnhancedFeaturesSection";
import { UseCaseSection } from "@/components/landing/UseCaseSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LandingPage() {
  const { data: session, status } = useSession();
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
        scrolled ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-slate-200 dark:border-slate-800" : "bg-transparent"
      )}>
        <div className="container px-4 md:px-6 mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif font-bold text-2xl text-slate-900 dark:text-white">
            {/* Logo */}
            <Link href="/">
              <img
                src="https://static.fokusistatistik.com/bilge/logos/bilgelogo.jpg"
                alt="Bilge Logo"
                className="h-10 w-auto rounded-lg cursor-pointer"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="#features" className="hover:text-[#860000] dark:hover:text-white transition-colors">Özellikler</Link>
            <Link href="#how-it-works" className="hover:text-[#860000] dark:hover:text-white transition-colors">Nasıl Çalışır</Link>
            <Link href="#pricing" className="hover:text-[#860000] dark:hover:text-white transition-colors">Fiyatlandırma</Link>
            <Link href="#faq" className="hover:text-[#860000] dark:hover:text-white transition-colors">SSS</Link>
          </nav>

          <div className="flex items-center gap-4">
            {status === 'loading' ? (
              <div className="h-9 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-md"></div>
            ) : session ? (
              <div className="flex items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Desktop User Info */}
                <div className="hidden lg:flex flex-col items-end leading-tight">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{session.user?.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{session.user?.email}</span>
                </div>

                <Link href="/dashboard">
                  <Button className="bg-[#860000] hover:bg-[#660000] text-white shadow-md shadow-red-900/10 gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden sm:inline">Panele Dön</span>
                    <span className="sm:hidden">Panel</span>
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform">
                      <AvatarImage src={session.user?.image || ''} />
                      <AvatarFallback className="bg-[#860000] text-white font-medium">B</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Panel
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profil Ayarları
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/login" className="hidden sm:inline-block text-sm font-medium text-slate-600 hover:text-[#860000] dark:text-slate-300 transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/login">
                  <Button className="bg-[#860000] hover:bg-[#660000] text-white shadow-lg shadow-red-900/20 transition-all hover:scale-105">
                    Hemen Dene
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <EnhancedFeaturesSection />
        <UseCaseSection />
        <ComparisonSection />
        <PricingSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
