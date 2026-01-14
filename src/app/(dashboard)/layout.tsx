'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { SidebarLeft } from '@/components/dashboard/SidebarLeft';
import { SidebarRight } from '@/components/dashboard/SidebarRight';
import { CreditBadge } from '@/components/dashboard/CreditBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';
import { VirtualAssistantChatbot } from '@/components/dashboard/VirtualAssistantChatbot';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentProject } = useStore();
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        console.log('🚀 BİLGE SYSTEM V2.0.0 LOADED - ACTIVE PORT: ' + window.location.port);
    }, []);

    // Only show SidebarRight in main dashboard view when a project is selected
    // Hide it on /settings page
    const showSidebarRight = currentProject && pathname === '/dashboard';

    if (!isClient) return null;

    return (
        <AuthGuard>
            <div className="flex h-screen overflow-hidden bg-background">
                <SidebarLeft />

                <div className="flex-1 flex flex-col min-w-0">
                    <header className="h-16 border-b flex items-center justify-between px-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 sticky top-0">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>

                            {/* Logo for mobile */}
                            <div className="flex items-center md:hidden">
                                <Image
                                    src="https://static.fokusistatistik.com/bilge/logos/bilgelogo.jpg"
                                    alt="Bilge Logo"
                                    width={100}
                                    height={32}
                                    className="h-8 w-auto rounded"
                                />
                            </div>

                            {/* Header Title / Breadcrumb */}
                            <div className="hidden md:flex items-center gap-4">
                                <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                    {pathname === '/settings' ? 'Hesap Ayarları' :
                                        currentProject ? currentProject.title : 'Araştırma Laboratuvarı'}
                                </h1>
                                {currentProject && pathname === '/dashboard' && (
                                    <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full dark:bg-indigo-900/50 dark:text-indigo-300">
                                        Aktif
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <CreditBadge />

                            {/* User Menu for Mobile (Desktop uses SidebarLeft) */}
                            <div className="md:hidden flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={session?.user?.image || ''} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-hidden relative flex flex-col">
                        {children}
                    </main>
                </div>

                {showSidebarRight && <SidebarRight />}

                {/* Virtual Assistant Chatbot */}
                <VirtualAssistantChatbot />
            </div>
        </AuthGuard>
    );
}
