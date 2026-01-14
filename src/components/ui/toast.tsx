'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
}

interface ToastContextType {
    showToast: (toast: Omit<Toast, 'id'>) => void;
    showSuccess: (title: string, description?: string) => void;
    showError: (title: string, description?: string) => void;
    showWarning: (title: string, description?: string) => void;
    showInfo: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { ...toast, id };

        setToasts((prev) => [...prev, newToast]);

        const duration = toast.duration || 5000;
        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, [removeToast]);

    const showSuccess = useCallback((title: string, description?: string) => {
        showToast({ type: 'success', title, description });
    }, [showToast]);

    const showError = useCallback((title: string, description?: string) => {
        showToast({ type: 'error', title, description });
    }, [showToast]);

    const showWarning = useCallback((title: string, description?: string) => {
        showToast({ type: 'warning', title, description });
    }, [showToast]);

    const showInfo = useCallback((title: string, description?: string) => {
        showToast({ type: 'info', title, description });
    }, [showToast]);

    return (
        <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
            case 'error':
                return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
            case 'warning':
                return <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
            case 'info':
                return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
        }
    };

    const getColors = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
            case 'error':
                return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
            case 'warning':
                return 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800';
            case 'info':
                return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 shadow-lg backdrop-blur-sm ${getColors()}`}
        >
            <div className="shrink-0 mt-0.5">{getIcon()}</div>
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {toast.title}
                </h4>
                {toast.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {toast.description}
                    </p>
                )}
            </div>
            <button
                onClick={() => onRemove(toast.id)}
                className="shrink-0 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
}

// Form Error Component
interface FormErrorProps {
    message?: string;
    className?: string;
}

export function FormError({ message, className = '' }: FormErrorProps) {
    if (!message) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-2 text-sm text-red-600 dark:text-red-400 ${className}`}
        >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{message}</span>
        </motion.div>
    );
}

// API Error Component
interface ApiErrorProps {
    error: Error | string;
    onRetry?: () => void;
    className?: string;
}

export function ApiError({ error, onRetry, className = '' }: ApiErrorProps) {
    const errorMessage = typeof error === 'string' ? error : error.message;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-xl ${className}`}
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-red-900 dark:text-red-100 mb-1">
                        Bir Hata Oluştu
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                        {errorMessage}
                    </p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Tekrar Dene
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Empty State Component
interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
        >
            {icon && (
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {title}
            </h3>
            {description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">
                    {description}
                </p>
            )}
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-6 py-2 bg-[#860000] hover:bg-[#660000] text-white rounded-lg font-medium transition-colors"
                >
                    {action.label}
                </button>
            )}
        </motion.div>
    );
}
