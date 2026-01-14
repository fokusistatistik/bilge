'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { SidebarLeft } from '@/components/dashboard/SidebarLeft';
import { DashboardNavbar } from '@/components/dashboard/DashboardHeader';
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
                    <DashboardNavbar currentProjectTitle={currentProject?.title} />

                    <main className="flex-1 overflow-hidden relative flex flex-col">
                        {children}
                    </main>
                </div>



                {/* Virtual Assistant Chatbot */}
                <VirtualAssistantChatbot />
            </div>
        </AuthGuard>
    );
}
