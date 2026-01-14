'use client';

import { Button } from "@/components/ui/button";
import { Home, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { CreditBadge } from '@/components/dashboard/CreditBadge';
import Image from "next/image";

interface DashboardNavbarProps {
    currentProjectTitle?: string;
}

export function DashboardNavbar({ currentProjectTitle }: DashboardNavbarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname === '/dashboard') return currentProjectTitle || 'Araştırma Laboratuvarı';
        if (pathname === '/settings') return 'Hesap Ayarları';
        if (pathname.includes('/project')) return 'Proje Detayları';
        return 'Panel';
    };

    return (
        <header className="h-16 border-b flex items-center justify-between px-4 sm:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-30 sticky top-0 transition-all shadow-sm supports-[backdrop-filter]:bg-white/60">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden text-slate-500">
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Mobile Logo */}
                <div className="flex items-center md:hidden">
                    <span className="font-bold text-lg tracking-tight text-[#860000]">BİLGE</span>
                </div>

                {/* Desktop Title / Breadcrumb */}
                <div className="hidden md:flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-tight">{getPageTitle()}</span>
                        {currentProjectTitle && pathname === '/dashboard' && (
                            <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] px-2 py-0.5 rounded-full font-medium">
                                Aktif Proje
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-[#860000] hover:bg-red-50 dark:hover:bg-red-900/20 gap-2 h-9 px-4 rounded-full transition-all hidden md:flex font-medium"
                    onClick={() => router.push('/')}
                >
                    <Home className="h-4 w-4" />
                    <span className="text-xs">Ana Sayfa</span>
                </Button>

                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                <CreditBadge />
            </div>
        </header>
    );
}
