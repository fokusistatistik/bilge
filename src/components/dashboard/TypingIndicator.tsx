'use client';

import { motion } from "framer-motion";

export function TypingIndicator() {
    return (
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none w-fit">
            <div className="flex gap-1">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"
                        animate={{
                            y: [0, -8, 0],
                            opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: index * 0.15,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                Bilge yazıyor...
            </span>
        </div>
    );
}

interface TypingIndicatorAvatarProps {
    showAvatar?: boolean;
}

export function TypingIndicatorWithAvatar({ showAvatar = true }: TypingIndicatorAvatarProps) {
    return (
        <div className="flex gap-3 items-end">
            {showAvatar && (
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm shrink-0">
                    B
                </div>
            )}
            <TypingIndicator />
        </div>
    );
}
