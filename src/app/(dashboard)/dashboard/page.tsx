'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useStore } from "@/store/useStore";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewProjectModal } from '@/components/dashboard/NewProjectModal';
import { HelpModal } from '@/components/dashboard/HelpModal'; // Imported HelpModal
import { translations } from "@/lib/translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Send,
    Bot,
    Sparkles,
    BarChart3,
    MoreVertical,
    Plus,
    FileText,
    FileSpreadsheet,
    FileImage,
    Layout,
    FolderOpen,
    Download,
    UploadCloud,
    Settings,
    Database,
    Users,
    Trash2,
    HelpCircle,
    Coins // Added Coins Icon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
    const { currentProject, user, chatHistory, addMessage, addFileToProject, updateProject, deleteProject, language, creditBalance } = useStore(); // Added creditBalance
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false); // HelpModal state

    const t = translations[language].dashboard;
    const chatbotT = translations[language].chatbot;

    const initialMessage = {
        id: 'init',
        role: 'system' as const,
        content: chatbotT.welcome,
        timestamp: new Date()
    };

    const displayMessages = chatHistory.length > 0 ? chatHistory : [initialMessage];

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [displayMessages, isTyping]);

    const handleSend = (text: string = input) => {
        if (!text.trim() || !currentProject) return;

        const userMsg = {
            id: Date.now().toString(),
            role: 'user' as const,
            content: text,
            timestamp: new Date()
        };

        addMessage(userMsg);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                role: 'system' as const,
                content: language === 'tr'
                    ? 'Talebiniz alınmıştır (Simülasyon).'
                    : 'Request received (Simulation).',
                timestamp: new Date()
            };
            addMessage(aiMsg);
            setIsTyping(false);
        }, 1000);
    };

    // File Handling
    const handleFileProcess = (files: FileList | null) => {
        if (!files || files.length === 0 || !currentProject) return;

        Array.from(files).forEach(file => {
            const newFile = {
                name: file.name,
                url: URL.createObjectURL(file), // Mock URL
                type: file.type || 'unknown',
                date: new Date()
            };

            addFileToProject(currentProject.id, newFile);

            // Send standard notification message
            const fileMsg = {
                id: Date.now().toString(),
                role: 'user' as const,
                content: `Dosya yüklendi: ${file.name}`,
                type: 'file-upload' as const,
                timestamp: new Date()
            };
            addMessage(fileMsg);
        });
        setIsDragging(false);
    };

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileProcess(e.dataTransfer.files);
    }, [currentProject]);

    const getFileIcon = (type: string) => {
        if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
        if (type.includes('pdf')) return <FileText className="h-5 w-5 text-red-600" />;
        if (type.includes('image')) return <FileImage className="h-5 w-5 text-blue-600" />;
        return <FileText className="h-5 w-5 text-slate-500" />;
    };

    // Helper for updating project settings
    const updateProjectSettings = (key: string, value: any) => {
        if (currentProject) {
            updateProject(currentProject.id, { [key]: value });
        }
    };

    if (!currentProject) {
        return (
            <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800"
                >
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FolderOpen className="h-10 w-10 text-[#860000] dark:text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.noProject}</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        {t.selectProject}
                    </p>

                    <div className="flex flex-col gap-3">
                        <NewProjectModal className="w-full text-base py-6 shadow-lg" />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div
            className="flex h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 overflow-hidden relative"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {/* Drag Overlay */}
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-[#860000]/10 backdrop-blur-sm flex items-center justify-center border-4 border-dashed border-[#860000] m-4 rounded-3xl pointer-events-none"
                    >
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center">
                            <UploadCloud className="h-16 w-16 text-[#860000] mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dosyaları Buraya Bırakın</h3>
                            <p className="text-slate-500">Otomatik olarak projeye eklenecektir.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-slate-200 dark:border-slate-800">
                {/* Header */}
                <div className="h-16 border-b flex justify-between items-center px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur z-10 shrink-0">
                    <div className="flex items-center gap-4 overflow-hidden">
                        <div>
                            <h1 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-lg">
                                {currentProject.title}
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-100 dark:bg-slate-800">
                                    {currentProject.targetLanguage === 'en' ? 'EN' : 'TR'}
                                </span>
                            </h1>
                            <p className="text-xs text-slate-500 truncate max-w-md flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                {currentProject.description || "Analiz asistanı hazır."}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Credit Badge */}
                        <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm mr-2">
                            <Coins className="h-3 w-3" />
                            {creditBalance} Kredi
                        </div>

                        {/* Target Test Selector */}
                        <Select
                            value={currentProject.targetTest || ''}
                            onValueChange={(val) => updateProjectSettings('targetTest', val)}
                        >
                            <SelectTrigger className="w-[180px] h-9 text-xs hidden md:flex">
                                <SelectValue placeholder="Hedef Test Seçilmedi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ttest">Bağımsız Örneklem T-Testi</SelectItem>
                                <SelectItem value="anova">Tek Yönlü ANOVA</SelectItem>
                                <SelectItem value="correlation">Korelasyon Analizi</SelectItem>
                                <SelectItem value="regression">Regresyon Analizi</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
                            <Settings className="h-5 w-5 text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setShowHelp(true)}>
                            <HelpCircle className="h-5 w-5 text-slate-500" />
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="max-w-3xl mx-auto space-y-6 pb-4">
                        {displayMessages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <Avatar className={`h-8 w-8 mt-1 border shadow-sm ${msg.role === 'system' ? 'bg-[#860000] border-red-900' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    {msg.role === 'system' ? (
                                        <div className="flex items-center justify-center w-full h-full text-white font-serif font-bold text-xs"><Bot className="h-4 w-4" /></div>
                                    ) : (
                                        <AvatarImage src={user?.profileImage || session?.user?.image || ''} />
                                    )}
                                    <AvatarFallback>{msg.role === 'system' ? 'B' : 'U'}</AvatarFallback>
                                </Avatar>

                                <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-3.5 shadow-sm text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-[#860000] text-white rounded-2xl rounded-tr-sm'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-700'
                                        }`}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 px-1 opacity-70">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                        <div ref={scrollRef} className="h-1" />
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
                    <div className="max-w-3xl mx-auto relative">
                        <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-[#860000]/50 focus-within:ring-4 focus-within:ring-[#860000]/10 transition-all shadow-sm">

                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={(e) => handleFileProcess(e.target.files)}
                                multiple
                            />

                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 h-10 w-10 shrink-0 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Plus className="h-5 w-5" />
                            </Button>

                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder={t.placeholder}
                                className="min-h-[44px] max-h-48 border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 py-3 scrollbar-hide text-base"
                            />

                            <Button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                size="icon"
                                className={`h-10 w-10 shrink-0 rounded-xl transition-all ${input.trim()
                                    ? 'bg-[#860000] hover:bg-[#660000] text-white shadow-md transform hover:scale-105 active:scale-95'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Asset Sidebar */}
            <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col hidden xl:flex shrink-0">
                <Tabs defaultValue="files" className="flex-1 flex flex-col">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="files" className="text-xs">Dosyalar</TabsTrigger>
                            <TabsTrigger value="outputs" className="text-xs">Çıktılar</TabsTrigger>
                            <TabsTrigger value="vars" className="text-xs">Değişken</TabsTrigger>
                        </TabsList>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-4">
                            <TabsContent value="files" className="space-y-3 mt-0">
                                {(!currentProject.files || currentProject.files.length === 0) ? (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                                        <p className="text-xs text-slate-400">Henüz dosya yok</p>
                                    </div>
                                ) : (
                                    currentProject.files.map((file, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-[#860000]/50 transition-colors">
                                            <div className="mt-0.5 shrink-0">{getFileIcon(file.type)}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate" title={file.name}>{file.name}</p>
                                                <p className="text-[10px] text-slate-400">{new Date(file.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </TabsContent>

                            <TabsContent value="outputs" className="space-y-3 mt-0">
                                {(!currentProject.outputs || currentProject.outputs.length === 0) ? (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                                        <p className="text-xs text-slate-400">Henüz çıktı yok</p>
                                    </div>
                                ) : (
                                    currentProject.outputs.map((output, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 cursor-pointer">
                                            <div className="mt-0.5 shrink-0">
                                                {output.type === 'chart' ? <BarChart3 className="h-5 w-5 text-purple-600" /> : <FileText className="h-5 w-5 text-orange-600" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{output.name}</p>
                                                <p className="text-[10px] text-slate-400">{new Date(output.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </TabsContent>

                            <TabsContent value="vars" className="space-y-3 mt-0">
                                {(!currentProject.variables || currentProject.variables.length === 0) ? (
                                    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                                        <Database className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-xs text-slate-400">Değişkenler dosya yüklendiğinde otomatik taranır.</p>
                                    </div>
                                ) : (
                                    currentProject.variables.map((v, i) => (
                                        <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">{v.name}</span>
                                                <Badge variant="outline" className="text-[10px] bg-white">{v.type}</Badge>
                                            </div>
                                            <div className="text-[10px] text-slate-400 truncate">
                                                {v.values.join(', ')}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </TabsContent>
                        </div>
                    </ScrollArea>
                </Tabs>
            </div>

            {/* Project Settings Dialog */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Proje Ayarları</DialogTitle>
                        <DialogDescription>Bu proje için özel yapılandırmalar.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Ondalık Ayırıcı</Label>
                                <Select
                                    value={currentProject.decimalSeparator || '.'}
                                    onValueChange={(v) => updateProjectSettings('decimalSeparator', v)}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value=".">Nokta (.)</SelectItem>
                                        <SelectItem value=",">Virgül (,)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Basamak Hassasiyeti</Label>
                                <Input
                                    type="number"
                                    min="0" max="5"
                                    value={currentProject.decimalPrecision || 3}
                                    onChange={(e) => updateProjectSettings('decimalPrecision', parseInt(e.target.value))}
                                />
                                <p className="text-[10px] text-slate-500">Örnek: 1234.568</p>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <Label className="flex items-center gap-2"><Users className="h-4 w-4" /> Proje Üyeleri</Label>
                            {(!currentProject.members || currentProject.members.length === 0) ? (
                                <p className="text-sm text-slate-500 italic">Henüz üye eklenmedi.</p>
                            ) : (
                                <div className="space-y-2">
                                    {currentProject.members.map(m => (
                                        <div key={m.id} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded">
                                            <span>{m.email}</span>
                                            <Badge variant="secondary">{m.role}</Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2 mt-2">
                                <Input placeholder="ornek@gmail.com" className="h-8 text-xs" />
                                <Button size="sm" variant="outline" className="h-8">Davet Et</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
        </div>
    );
}
