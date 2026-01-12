'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter, usePathname } from 'next/navigation';
import { ProfileOnboardingModal } from '@/components/onboarding/ProfileOnboardingModal';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user } = useStore();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !user && !pathname.startsWith('/login')) {
            // redirect to login if no user
            router.push('/login');
        }
    }, [user, mounted, pathname, router]);

    if (!mounted) return null; // or loading spinner

    return (
        <>
            {children}
            <ProfileOnboardingModal />
        </>
    );
}
