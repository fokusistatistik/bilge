'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore, Message } from '@/store/useStore';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip, Send, Sparkles, AlertTriangle, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import { useDropzone } from 'react-dropzone';
import { AnalysisResultWidget } from './AnalysisResultWidget';
import { CreditConfirmationModal } from './CreditConfirmationModal';

export function ChatInterface() {
    const { chatHistory, addMessage, deductCredits, addProject, currentProject } = useStore();
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
    const [pendingAnalysisCost, setPendingAnalysisCost] = useState(0);

    // File Upload / Dropzone
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const userMsg: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: `Dosya yüklendi: ${file.name}`,
                timestamp: new Date(),
                type: 'file-upload'
            };
            addMessage(userMsg);

            // Trigger AI Flow
            setIsTyping(true);
            setTimeout(() => {
                handleAIResponse("upload");
            }, 1000);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv']
        }
    });

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, isTyping]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
            type: 'text'
        };
        addMessage(newUserMsg);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response logic
        setTimeout(() => {
            handleAIResponse(inputValue);
        }, 1000);
    };

    const handleAIResponse = (input: string) => {
        setIsTyping(false);
        let responseContent = "Bunu anlayamadım. Lütfen bir veri seti yükler misiniz?";
        let widgetType: Message['type'] = 'text';
        let widgetData: unknown = null;

        // Mock Logic for Demo Flow
        if (input.toLowerCase().includes('upload') || input.toLowerCase().includes('data') || input.toLowerCase().includes('verisi')) {
            responseContent = "Veri setini analiz ettim. İşte ilk bulgularım:";
            widgetType = 'widget';
            widgetData = {
                type: 'diagnostic_card',
                summary: '50 satır, 5 sütun tespit edildi.',
                issues: [
                    "⚠️ 'Yaş' sütununda 2 aykırı değer var.",
                    "⚠️ 'Cinsiyet' sütununda %5 eksik veri var."
                ],
                data: {
                    columns: [
                        { name: 'Yaş', type: 'Scale' },
                        { name: 'Tedavi Grubu', type: 'Nominal' }
                    ]
                }
            };

            // Also Create a Mock Project if none
            if (!currentProject) {
                addProject({
                    id: 'proj-1',
                    title: 'Hasta Tedavi Analizi',
                    files: [{ name: 'hasta_verisi.xlsx', url: '#', type: 'Excel' }],
                    reports: [],
                    createdAt: new Date(),
                    studyType: 'clinical_trial',
                    abstract: 'Hasta grupları üzerindeki tedavi etkilerinin analizi.'
                });
            }
        }

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: responseContent,
            timestamp: new Date(),
            type: widgetType,
            widgetData: widgetData
        };
        addMessage(aiMsg);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleWidgetAction = (action: string, _payload?: unknown) => {
        if (action === 'confirm_variables') {
            const msg: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Harika! Bu veriyle ne yapmak istersiniz?",
                timestamp: new Date(),
                type: 'widget',
                widgetData: {
                    type: 'method_selection',
                    options: ['Grup Farklılıklarını Analiz Et', 'Korelasyon Analizi', 'Tanımlayıcı İstatistikler']
                }
            };
            addMessage(msg);
        }
        if (action === 'select_method') {
            // Simulate Analysis Check
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const msg: Message = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: "⚠️ Veriler **normal dağılmıyor** (Shapiro-Wilk *p* < .05). \n\n**Mann-Whitney U Testi** öneririm. Devam edilsin mi?",
                    timestamp: new Date(),
                    type: 'widget',
                    widgetData: {
                        type: 'assumption_check',
                        warning: 'Normallik Varsayımı İhlal Edildi',
                        recommendation: 'Mann-Whitney U Testi'
                    }
                };
                addMessage(msg);
            }, 1500);
        }
        if (action === 'proceed_analysis') {
            setPendingAnalysisCost(20);
            setIsCreditModalOpen(true);
        }
    };

    const handleCreditConfirm = () => {
        const success = deductCredits(pendingAnalysisCost);
        setIsCreditModalOpen(false);

        if (success) {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const msg: Message = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: "**Analiz Tamamlandı.** İşte raporunuz.",
                    timestamp: new Date(),
                    type: 'widget',
                    widgetData: {
                        type: 'result_card',
                        id: 'res-1',
                        test_type: 'Mann-Whitney U Testi',
                        p_value: 0.02,
                        effect_size: 0.45,
                        summary: "Gruplar arasında istatistiksel olarak anlamlı fark bulunmuştur (*p* < .05). Deneysel grubun skorları kontrol grubuna göre anlamlı derecede yüksektir."
                    }
                };
                addMessage(msg);

                // Add Report to sidebar
                // In a real app we would call updateProject...
            }, 2000);
        } else {
            addMessage({
                id: Date.now().toString(),
                role: 'assistant',
                content: "Yetersiz kredi. Lütfen bakiye yükleyin.",
                timestamp: new Date(),
                type: 'text'
            });
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-950/50" {...getRootProps()}>
            <input {...getInputProps()} />

            {/* Overlay for Drag & Drop */}
            {isDragActive && (
                <div className="absolute inset-0 z-50 bg-indigo-500/10 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-indigo-500 rounded-lg m-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-xl flex flex-col items-center gap-3">
                        <FileSpreadsheet className="h-10 w-10 text-indigo-600 animate-bounce" />
                        <p className="font-bold text-lg text-indigo-700 dark:text-indigo-300">Dosyayı Buraya Bırakın</p>
                        <p className="text-sm text-slate-500">Excel veya CSV</p>
                    </div>
                </div>
            )}

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6 max-w-3xl mx-auto pb-8">
                    {chatHistory.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-4 w-full",
                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <Avatar className="h-8 w-8 shrink-0">
                                {msg.role === 'assistant' ? (
                                    <div className="bg-indigo-600 w-full h-full flex items-center justify-center">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                ) : (
                                    <AvatarFallback>ME</AvatarFallback>
                                )}
                            </Avatar>
                            <div
                                className={cn(
                                    "flex flex-col gap-2 max-w-[80%]",
                                    msg.role === 'user' ? "items-end" : "items-start"
                                )}
                            >
                                {/* Message Bubble */}
                                <div
                                    className={cn(
                                        "rounded-2xl px-4 py-3 text-sm max-w-full overflow-hidden shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-indigo-600 text-white rounded-br-none"
                                            : "bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none"
                                    )}
                                >
                                    {msg.role === 'assistant' ? (
                                        <div className="prose dark:prose-invert prose-sm max-w-none">
                                            <ReactMarkdown
                                                components={{
                                                    table: (props) => <div className="overflow-x-auto my-2"><table className="border-collapse border border-slate-200 text-xs w-full" {...props} /></div>,
                                                    th: (props) => <th className="border border-slate-200 px-2 py-1 bg-slate-100 font-semibold" {...props} />,
                                                    td: (props) => <td className="border border-slate-200 px-2 py-1" {...props} />,
                                                    p: (props) => <p className="mb-1 last:mb-0" {...props} />
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>

                                {/* Widgets */}
                                {msg.type === 'widget' && msg.widgetData && (
                                    <WidgetRenderer data={msg.widgetData} onAction={handleWidgetAction} />
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4 w-full">
                            <Avatar className="h-8 w-8 shrink-0">
                                <div className="bg-indigo-600 w-full h-full flex items-center justify-center">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>
                            </Avatar>
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1 shadow-sm">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t bg-white dark:bg-slate-950">
                <div className={cn(
                    "max-w-3xl mx-auto flex items-end gap-2 p-2 border rounded-xl bg-slate-50 dark:bg-slate-900 focus-within:ring-2 ring-indigo-500/20 transition-all",
                    isDragActive ? "ring-2 ring-indigo-500 bg-indigo-50" : ""
                )}>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-indigo-600">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={isDragActive ? "Dosyayı bırakın..." : "Araştırmanızı anlatın veya veri yükleyin..."}
                        className="border-0 bg-transparent focus-visible:ring-0 px-2 py-3 h-auto max-h-32 min-h-[44px]"
                    />
                    <Button
                        onClick={handleSendMessage}
                        size="icon"
                        className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white"
                        disabled={!inputValue.trim() && !isTyping}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-center text-xs text-slate-400 mt-2">
                    Bilge hata yapabilir. Lütfen önemli bilgileri doğrulayın.
                </p>
            </div>

            <CreditConfirmationModal
                isOpen={isCreditModalOpen}
                onClose={() => setIsCreditModalOpen(false)}
                onConfirm={handleCreditConfirm}
                cost={pendingAnalysisCost}
                operationName="Hipotez Testi ve Raporlama"
            />
        </div>
    );
}

// Widget Sub-Components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WidgetRenderer({ data, onAction }: { data: any, onAction: (action: string, payload?: any) => void }) {
    if (data.type === 'diagnostic_card') {
        return (
            <Card className="w-full max-w-sm border-indigo-100 dark:border-indigo-900 bg-white dark:bg-slate-900">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-indigo-500" /> Veri Teşhisi
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <div className="space-y-2">
                        <p className="font-semibold">{data.summary}</p>
                        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                            {data.issues.map((issue: string, idx: number) => (
                                <p key={idx}>{issue}</p>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => onAction('ignore_issues')}>
                        Yoksay
                    </Button>
                    <Button size="sm" className="flex-1 bg-indigo-600" onClick={() => onAction('confirm_variables')}>
                        Otomatik Düzelt & Devam Et
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    if (data.type === 'method_selection') {
        return (
            <div className="flex flex-col gap-2 w-full max-w-xs">
                {data.options.map((opt: string, idx: number) => (
                    <Button key={idx} variant="outline" className="justify-start text-left" onClick={() => onAction('select_method', opt)}>
                        {opt}
                    </Button>
                ))}
            </div>
        );
    }
    if (data.type === 'assumption_check') {
        return (
            <Card className="w-full max-w-sm border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-700 dark:text-amber-500">
                        <AlertTriangle className="h-4 w-4" /> Varsayım Uyarısı
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-700 dark:text-slate-300">
                    <p>{data.warning}</p>
                    <p className="mt-2 font-medium">Öneri: {data.recommendation}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-slate-500">Yoksay</Button>
                    <Button size="sm" className="bg-indigo-600" onClick={() => onAction('proceed_analysis')}>
                        Devam Et
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    if (data.type === 'result_card') {
        return <AnalysisResultWidget result={data} />;
    }
    return null;
}
