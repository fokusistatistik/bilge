'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    FileSpreadsheet,
    CheckCircle,
    AlertTriangle,
    Hash,
    Type,
    Calendar,
    ChevronRight,
    Eye,
    EyeOff
} from 'lucide-react';

interface ColumnInfo {
    name: string;
    type: 'numeric' | 'categorical' | 'date' | 'text';
    missingCount: number;
    uniqueCount: number;
    sample: string[];
}

interface FilePreviewProps {
    fileName: string;
    fileSize: number;
    rowCount: number;
    columnCount: number;
    columns: ColumnInfo[];
    previewData: any[][];
    onConfirm: () => void;
    onCancel: () => void;
}

export function FilePreview({
    fileName,
    fileSize,
    rowCount,
    columnCount,
    columns,
    previewData,
    onConfirm,
    onCancel
}: FilePreviewProps) {
    const [showAllColumns, setShowAllColumns] = useState(false);
    const displayColumns = showAllColumns ? columns : columns.slice(0, 5);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'numeric':
                return <Hash className="h-4 w-4 text-blue-600" />;
            case 'categorical':
                return <Type className="h-4 w-4 text-purple-600" />;
            case 'date':
                return <Calendar className="h-4 w-4 text-green-600" />;
            default:
                return <Type className="h-4 w-4 text-slate-600" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'numeric':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'categorical':
                return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            case 'date':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            default:
                return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* File Info Card */}
            <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                            <FileSpreadsheet className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{fileName}</CardTitle>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                                <span>{formatFileSize(fileSize)}</span>
                                <span>•</span>
                                <span>{rowCount.toLocaleString('tr-TR')} satır</span>
                                <span>•</span>
                                <span>{columnCount} sütun</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                            <CheckCircle className="h-4 w-4" />
                            <span>Geçerli</span>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Column Analysis */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Sütun Analizi</CardTitle>
                        {columns.length > 5 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAllColumns(!showAllColumns)}
                                className="gap-2"
                            >
                                {showAllColumns ? (
                                    <>
                                        <EyeOff className="h-4 w-4" />
                                        Daha Az Göster
                                    </>
                                ) : (
                                    <>
                                        <Eye className="h-4 w-4" />
                                        Tümünü Göster ({columns.length})
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayColumns.map((column, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {getTypeIcon(column.type)}
                                        <h4 className="font-semibold text-sm truncate">{column.name}</h4>
                                    </div>
                                </div>

                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mb-3 ${getTypeColor(column.type)}`}>
                                    {column.type === 'numeric' && 'Sayısal'}
                                    {column.type === 'categorical' && 'Kategorik'}
                                    {column.type === 'date' && 'Tarih'}
                                    {column.type === 'text' && 'Metin'}
                                </div>

                                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                                    <div className="flex justify-between">
                                        <span>Benzersiz:</span>
                                        <span className="font-medium">{column.uniqueCount}</span>
                                    </div>
                                    {column.missingCount > 0 && (
                                        <div className="flex justify-between items-center">
                                            <span>Eksik:</span>
                                            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                                                <AlertTriangle className="h-3 w-3" />
                                                {column.missingCount}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <span className="block mb-1">Örnek değerler:</span>
                                        <div className="text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded space-y-0.5">
                                            {column.sample.slice(0, 3).map((value, i) => (
                                                <div key={i} className="truncate">{value}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Data Preview */}
            <Card>
                <CardHeader>
                    <CardTitle>Veri Önizleme (İlk 10 Satır)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                                        #
                                    </th>
                                    {columns.map((column, index) => (
                                        <th
                                            key={index}
                                            className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase"
                                        >
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(column.type)}
                                                <span className="truncate max-w-[150px]">{column.name}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {previewData.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                                            {rowIndex + 1}
                                        </td>
                                        {row.map((cell, cellIndex) => (
                                            <td
                                                key={cellIndex}
                                                className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100"
                                            >
                                                {cell !== null && cell !== undefined ? String(cell) : (
                                                    <span className="text-slate-400 dark:text-slate-600 italic">null</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Confirmation */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-2 border-indigo-200 dark:border-indigo-800">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">
                                Veri doğru görünüyor mu?
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Sütun tipleri ve veri önizlemesini kontrol edin
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={onCancel}
                                className="border-2"
                            >
                                İptal
                            </Button>
                            <Button
                                onClick={onConfirm}
                                className="bg-[#860000] hover:bg-[#660000] text-white gap-2"
                            >
                                Devam Et
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

// Mock data example
export function FilePreviewExample() {
    const mockColumns: ColumnInfo[] = [
        {
            name: 'Yaş',
            type: 'numeric',
            missingCount: 0,
            uniqueCount: 45,
            sample: ['25', '32', '41']
        },
        {
            name: 'Cinsiyet',
            type: 'categorical',
            missingCount: 2,
            uniqueCount: 2,
            sample: ['Erkek', 'Kadın', 'Erkek']
        },
        {
            name: 'Puan',
            type: 'numeric',
            missingCount: 0,
            uniqueCount: 98,
            sample: ['78.5', '92.3', '65.8']
        },
        {
            name: 'Tarih',
            type: 'date',
            missingCount: 0,
            uniqueCount: 30,
            sample: ['2024-01-15', '2024-02-20', '2024-03-10']
        }
    ];

    const mockData = [
        [25, 'Erkek', 78.5, '2024-01-15'],
        [32, 'Kadın', 92.3, '2024-02-20'],
        [41, 'Erkek', 65.8, '2024-03-10'],
        [28, null, 88.2, '2024-01-22'],
        [35, 'Kadın', 74.6, '2024-02-15'],
    ];

    return (
        <FilePreview
            fileName="veri_seti.xlsx"
            fileSize={245678}
            rowCount={150}
            columnCount={4}
            columns={mockColumns}
            previewData={mockData}
            onConfirm={() => console.log('Confirmed')}
            onCancel={() => console.log('Cancelled')}
        />
    );
}
