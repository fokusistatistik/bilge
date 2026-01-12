'use client';

import { useStore } from "@/store/useStore";
import { Coins } from "lucide-react";

export function CreditBadge() {
    const { creditBalance } = useStore();

    return (
        <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800">
            <Coins className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
                {creditBalance} Kredi
            </span>
        </div>
    );
}
