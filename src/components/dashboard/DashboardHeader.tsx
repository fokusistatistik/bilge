'use client';

import { Button } from "@/components/ui/button";
import { Home, Menu, User, LogOut, Settings, Languages, Coins, BrainCircuit, Sun, Moon } from "lucide-react";
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

export function DashboardNavbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { language, setLanguage, currentProject, aiMode } = useStore();
    const t = translations[language].dashboard;

    const getAiModeColor = () => {
        switch (aiMode) {
            case 'analysis': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'consultancy': return 'bg-purple-100 text-purple-700 border-purple-200';
            default: return 'bg-green-100 text-green-700 border-green-200';
        }
    };

    const getAiModeLabel = () => {
        switch (aiMode) {
            case 'analysis': return language === 'tr' ? 'Analiz Modu' : 'Analysis Mode';
            case 'consultancy': return language === 'tr' ? 'Danışmanlık Modu' : 'Consultancy Mode';
            default: return language === 'tr' ? 'Sohbet Modu' : 'Chat Mode';
        }
    };

    const getPageTitle = () => {
        if (pathname === '/dashboard' && currentProject) return currentProject.title;
        if (pathname === '/settings') return language === 'tr' ? 'Hesap Ayarları' : 'Account Settings';
        return 'Bilge Panel';
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="h-16 border-b flex items-center justify-between px-4 sm:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-30 sticky top-0 transition-all shadow-sm">
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
                        <span className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                            {getPageTitle()}
                        </span>

                        {pathname === '/dashboard' && currentProject && (
                            <>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentProject.targetLanguage === 'en' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                    {currentProject.targetLanguage === 'en' ? 'EN' : 'TR'}
                                </span>
                                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${getAiModeColor()}`}>
                                    <BrainCircuit className="h-3 w-3" />
                                    {getAiModeLabel()}
                                </div>
                            </>
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

                {/* Theme Toggle */}
                <Button variant="ghost" size="icon" className="hidden md:flex text-slate-500 hover:text-slate-900 dark:hover:text-amber-400" onClick={toggleTheme}>
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
                    <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
                    <span className="sr-only">Toggle theme</span>
                </Button>

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
