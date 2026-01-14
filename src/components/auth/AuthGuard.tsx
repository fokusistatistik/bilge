'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { ProfileOnboardingModal } from '@/components/onboarding/ProfileOnboardingModal';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && status === 'unauthenticated' && !pathname.startsWith('/login')) {
            // redirect to login if no session
            router.push('/login');
        }
    }, [status, mounted, pathname, router]);

    // Show loading while checking auth
    if (!mounted || status === 'loading') {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000]"></div>
            </div>
        );
    }

    // If not authenticated, don't render children
    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <>
            {children}
            <ProfileOnboardingModal />
        </>
    );
}
