'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { SidebarLeft } from '@/components/dashboard/SidebarLeft';
import { SidebarRight } from '@/components/dashboard/SidebarRight';
import { CreditBadge } from '@/components/dashboard/CreditBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const router = useRouter();
    const { user } = useStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Prevent hydration mismatch

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
                            <div className="flex items-center md:hidden">
                                <Image
                                    src="https://static.fokusistatistik.com/bilge/logos/bilgelogo.jpg"
                                    alt="Bilge Logo"
                                    width={100}
                                    height={32}
                                    className="h-8 w-auto rounded"
                                />
                            </div>
                            <div className="hidden md:flex items-center gap-4">
                                <div className="bg-white rounded px-2 py-1 border border-slate-100">
                                    <Image
                                        src="https://static.fokusistatistik.com/bilge/logos/bilgelogo.jpg"
                                        alt="Bilge Logo"
                                        width={100}
                                        height={32}
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
                                <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                    Araştırma Laboratuvarı
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <CreditBadge />
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                                    <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-hidden relative">
                        {children}
                    </main>
                </div>

                <SidebarRight />
            </div>
        </AuthGuard>
    );
}
