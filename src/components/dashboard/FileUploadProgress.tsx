'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploadProgressProps {
    onFileAccepted?: (file: File) => void;
    onFileRejected?: (error: string) => void;
    maxSize?: number; // in MB
    acceptedFormats?: string[];
}

export function FileUploadProgress({
    onFileAccepted,
    onFileRejected,
    maxSize = 10,
    acceptedFormats = ['.xlsx', '.xls', '.csv']
}: FileUploadProgressProps) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            const error = rejectedFiles[0].errors[0];
            let message = 'Dosya yüklenemedi';

            if (error.code === 'file-too-large') {
                message = `Dosya boyutu ${maxSize}MB'dan küçük olmalıdır`;
            } else if (error.code === 'file-invalid-type') {
                message = `Sadece ${acceptedFormats.join(', ')} formatları desteklenmektedir`;
            }

            setErrorMessage(message);
            setUploadStatus('error');
            onFileRejected?.(message);
            return;
        }

        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setUploadedFile(file);
            setUploadStatus('uploading');
            setErrorMessage('');

            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setUploadStatus('success');
                    onFileAccepted?.(file);
                }
                setUploadProgress(Math.min(progress, 100));
            }, 200);
        }
    }, [maxSize, acceptedFormats, onFileAccepted, onFileRejected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv']
        },
        maxSize: maxSize * 1024 * 1024,
        multiple: false
    });

    const resetUpload = () => {
        setUploadProgress(0);
        setUploadStatus('idle');
        setUploadedFile(null);
        setErrorMessage('');
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="w-full space-y-4">
            {/* Drop Zone */}
            <AnimatePresence mode="wait">
                {uploadStatus === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        {...getRootProps()}
                        className={`
                            border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                            ${isDragActive
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 scale-[1.02]'
                                : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                            }
                        `}
                    >
                        <input {...getInputProps()} />
                        <motion.div
                            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                                <Upload className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </motion.div>

                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            {isDragActive ? 'Dosyayı buraya bırakın' : 'Veri dosyanızı yükleyin'}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Sürükle-bırak veya tıklayarak dosya seçin
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {acceptedFormats.map((format) => (
                                <span key={format} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                                    {format}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                            Maksimum dosya boyutu: {maxSize}MB
                        </p>
                    </motion.div>
                )}

                {/* Uploading State */}
                {uploadStatus === 'uploading' && uploadedFile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                                        <FileSpreadsheet className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-slate-900 dark:text-white truncate">
                                                    {uploadedFile.name}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    {formatFileSize(uploadedFile.size)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={resetUpload}
                                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-2">
                                            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${uploadProgress}%` }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                                                <span>Yükleniyor...</span>
                                                <span>{Math.round(uploadProgress)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Success State */}
                {uploadStatus === 'success' && uploadedFile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div>
                                                <p className="font-medium text-green-900 dark:text-green-100">
                                                    Dosya başarıyla yüklendi!
                                                </p>
                                                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                                    {uploadedFile.name} ({formatFileSize(uploadedFile.size)})
                                                </p>
                                            </div>
                                            <button
                                                onClick={resetUpload}
                                                className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
                                            >
                                                <X className="h-4 w-4 text-green-700 dark:text-green-300" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Error State */}
                {uploadStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                                        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-medium text-red-900 dark:text-red-100 mb-1">
                                                    Dosya yüklenemedi
                                                </p>
                                                <p className="text-sm text-red-700 dark:text-red-300">
                                                    {errorMessage}
                                                </p>
                                            </div>
                                            <button
                                                onClick={resetUpload}
                                                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                            >
                                                <X className="h-4 w-4 text-red-700 dark:text-red-300" />
                                            </button>
                                        </div>
                                        <Button
                                            onClick={resetUpload}
                                            variant="outline"
                                            size="sm"
                                            className="mt-4 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
                                        >
                                            Tekrar Dene
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
