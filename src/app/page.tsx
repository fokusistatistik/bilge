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
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, User, LogOut, Menu } from "lucide-react";
import { SupportedAnalyses } from "@/components/landing/SupportedAnalyses";
import { CampaignToast } from "@/components/landing/CampaignToast";
import { AboutSection } from "@/components/landing/AboutSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LegalModals, LegalDocType } from "@/components/modals/LegalModals";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [legalType, setLegalType] = useState<LegalDocType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "how-it-works", "features", "pricing", "faq"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 120)) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {[
        { href: "#hero", label: "Anasayfa", id: "hero" },
        { href: "#about", label: "Hakkımızda", id: "about" },
        { href: "#how-it-works", label: "Nasıl Çalışır", id: "how-it-works" },
        { href: "#features", label: "Özellikler", id: "features" },
        { href: "#pricing", label: "Fiyatlandırma", id: "pricing" },
        { href: "#faq", label: "SSS", id: "faq" },
      ].map((link) => (
        <Link
          key={link.id}
          href={link.href}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
          className={cn(
            "transition-colors",
            mobile ? "text-lg py-2 border-b border-slate-100 dark:border-slate-800" : "text-sm font-medium",
            activeSection === link.id
              ? "text-[#860000] font-bold"
              : "hover:text-[#860000] dark:hover:text-white text-slate-600 dark:text-slate-300"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      {/* Header / Navbar */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-transparent w-full",
        scrolled ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-slate-200 dark:border-slate-800" : "bg-transparent"
      )}>
        <div className="container px-4 md:px-6 mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif font-bold text-2xl text-slate-900 dark:text-white shrink-0">
            {/* Logo */}
            <Link href="/">
              <img
                src="https://static.fokusistatistik.com/bilge/logos/bilgelogo.jpg"
                alt="Bilge Logo"
                className="h-8 md:h-10 w-auto rounded-lg cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {status === 'loading' ? (
              <div className="h-9 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-md"></div>
            ) : session ? (
              <div className="flex items-center gap-2 md:gap-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Desktop User Info */}
                <div className="hidden lg:flex flex-col items-end leading-tight">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{session.user?.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{session.user?.email}</span>
                </div>

                <Link href="/dashboard" className="hidden sm:block">
                  <Button className="bg-[#860000] hover:bg-[#660000] text-white shadow-md shadow-red-900/10 gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden lg:inline">Panele Dön</span>
                    <span className="lg:hidden">Panel</span>
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 md:h-9 md:w-9 border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <AvatarImage src={(session.user as any)?.profileImage || session.user?.image || ''} />
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/login" className="hidden sm:inline-block text-sm font-medium text-slate-600 hover:text-[#860000] dark:text-slate-300 transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/login">
                  <Button className="bg-[#860000] hover:bg-[#660000] text-white shadow-lg shadow-red-900/20 transition-all hover:scale-105 text-xs md:text-sm px-3 md:px-4 h-8 md:h-10">
                    Hemen Dene
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden -mr-2">
                  <Menu className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <img
                      src="https://static.fokusistatistik.com/bilge/logos/bilgelogo.jpg"
                      alt="Bilge"
                      className="h-8 w-auto rounded"
                    />
                    <span className="font-serif font-bold text-slate-900">Bilge</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  <NavLinks mobile />
                  {!session && (
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">Giriş Yap</Button>
                      </Link>
                    </div>
                  )}
                  {session && (
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full justify-start bg-[#860000] text-white">Panele Git</Button>
                      </Link>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[100vw] overflow-hidden">
        <HeroSection />
        <AboutSection />
        <HowItWorks />
        <EnhancedFeaturesSection />
        <UseCaseSection />
        <SupportedAnalyses />
        <ComparisonSection />
        <PricingSection />
        <FaqSection />
      </main>

      <Footer onLegalClick={setLegalType} />
      <CampaignToast />
      <LegalModals openType={legalType} onOpenChange={(open) => !open && setLegalType(null)} />
    </div>
  );
}
