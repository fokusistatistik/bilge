'use client';

import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <motion.div
            className={`bg-slate-200 dark:bg-slate-800 rounded ${className}`}
            animate={{
                opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export function ProjectCardSkeleton() {
    return (
        <div className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-2 gap-4 pt-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-10 w-full rounded-lg" />
        </div>
    );
}

export function ChatMessageSkeleton() {
    return (
        <div className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full rounded-xl" />
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
    );
}

export function DashboardStatsSkeleton() {
    return (
        <div className="grid md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border-2 border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-4 w-full" />
                </div>
            ))}
        </div>
    );
}

export function AnalysisWidgetSkeleton() {
    return (
        <div className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-20 w-full" />
        </div>
    );
}
