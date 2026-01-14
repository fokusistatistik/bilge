'use client';

import { Button } from "@/components/ui/button";
import { Home, Menu, User, LogOut, Settings, Languages, Coins } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { CreditBadge } from '@/components/dashboard/CreditBadge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/store/useStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { translations } from "@/lib/translations";

interface DashboardNavbarProps {
    currentProjectTitle?: string;
}

export function DashboardNavbar({ currentProjectTitle }: DashboardNavbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { language, setLanguage, currentProject } = useStore();
    const t = translations[language].dashboard;

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
                                {t.active}
                            </span>
                        )}
                        {currentProject && (
                            <span className="flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-100 text-[10px] px-2 py-0.5 rounded-full font-medium ml-1" title="Bu proje için harcanan toplam kredi">
                                <Coins className="h-3 w-3" />
                                {currentProject.usedCredits || 0}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Language Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="hidden md:flex gap-1 text-slate-500 hover:text-[#860000]">
                            <Languages className="h-4 w-4" />
                            <span className="text-xs uppercase font-semibold">{language}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setLanguage('tr')} className={language === 'tr' ? 'bg-slate-100 font-bold' : ''}>
                            🇹🇷 Türkçe
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-slate-100 font-bold' : ''}>
                            🇺🇸 English
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

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

                {/* User Dropdown for Navbar */}
                <div className="ml-2">
                    <UserNav />
                </div>
            </div>
        </header>
    );
}

function UserNav() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                        <AvatarImage src={session?.user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${session?.user?.name || 'User'}`} alt={session?.user?.name || ''} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.user?.name || 'Kullanıcı'}</p>
                        <p className="text-xs leading-none text-muted-foreground opacity-70">
                            {session?.user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ayarlar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600" onClick={() => signOut({ callbackUrl: '/login' })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
