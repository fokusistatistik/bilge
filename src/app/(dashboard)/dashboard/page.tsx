'use client';

import { useState, useRef, useEffect } from 'react';
import { useStore } from "@/store/useStore";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewProjectModal } from '@/components/dashboard/NewProjectModal';
import { HelpModal } from '@/components/dashboard/HelpModal';
import { TestSuggestionModal } from '@/components/dashboard/TestSuggestionModal'; // Imported
import { translations } from "@/lib/translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
    Plus,
    UploadCloud,
    Settings,
    Users,
    HelpCircle,
    Coins,
    Sun,
    Moon,
    PanelRightClose,
    PanelRightOpen,
    BrainCircuit,
    Lightbulb,
    FolderOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
    const {
        currentProject,
        user,
        chatHistory,
        addMessage,
        addFileToProject,
        updateProject,
        language,
        creditBalance,
        isRightSidebarOpen,
        toggleRightSidebar,
        aiMode
    } = useStore();
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showTestSuggestion, setShowTestSuggestion] = useState(false); // New State
    const [isDarkMode, setIsDarkMode] = useState(false);

    const t = translations[language].dashboard;
    const chatbotT = translations[language].chatbot;

    // Initial messages
    const initialMessage = {
        id: 'init',
        role: 'system' as const,
        content: chatbotT.welcome,
        timestamp: new Date()
    };
    const displayMessages = chatHistory.length > 0 ? chatHistory : [initialMessage];

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [displayMessages, isTyping]);

    // Theme Toggle
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        setIsDarkMode(isDark);
    };

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

        setTimeout(() => {
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                role: 'system' as const,
                content: language === 'tr' ? 'Talebiniz işleniyor... (Simülasyon)' : 'Processing request... (Simulation)',
                timestamp: new Date()
            };
            addMessage(aiMsg);
            setIsTyping(false);
        }, 1000);
    };

    const handleFileProcess = (files: FileList | null) => {
        if (!files || files.length === 0 || !currentProject) return;

        Array.from(files).forEach(file => {
            const newFile = {
                name: file.name,
                url: URL.createObjectURL(file), // Mock
                type: file.type || 'unknown',
                date: new Date()
            };
            addFileToProject(currentProject.id, newFile);

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

    const updateProjectSettings = (key: string, value: any) => {
        if (currentProject) {
            updateProject(currentProject.id, { [key]: value });
        }
    };

    // AI Mode Color Mapping
    const getAiModeColor = () => {
        switch (aiMode) {
            case 'analysis': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'consultancy': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
            default: return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
        }
    };

    const getAiModeLabel = () => {
        switch (aiMode) {
            case 'analysis': return language === 'tr' ? 'Analiz Modu' : 'Analysis Mode';
            case 'consultancy': return language === 'tr' ? 'Danışmanlık Modu' : 'Consultancy Mode';
            default: return language === 'tr' ? 'Sohbet Modu' : 'Chat Mode';
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
                    <p className="text-slate-600 dark:text-slate-400 mb-8">{t.selectProject}</p>
                    <NewProjectModal className="w-full text-base py-6 shadow-lg" />
                </motion.div>
            </div>
        );
    }

    // Dynamic Theme Color (Default Red)
    const activeColor = currentProject.color || '#860000';

    return (
        <div
            className="flex h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 overflow-hidden relative"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileProcess(e.dataTransfer.files); }}
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
                {/* Enhanced Dashboard Header */}
                <div className="h-16 border-b flex justify-between items-center px-4 md:px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur z-10 shrink-0">

                    {/* Left: Project Info */}
                    <div className="flex items-center gap-4 overflow-hidden">
                        <div>
                            <h1 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-lg">
                                {currentProject.title}
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentProject.targetLanguage === 'en' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                    {currentProject.targetLanguage === 'en' ? 'EN' : 'TR'}
                                </span>
                            </h1>
                            <p className="text-xs text-slate-500 truncate max-w-md flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                {currentProject.description || "Analiz asistanı hazır."}
                            </p>
                        </div>
                    </div>

                    {/* Middle: AI Mode Badge */}
                    <div className="hidden md:flex items-center">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${getAiModeColor()}`}>
                            <BrainCircuit className="h-3 w-3" />
                            {getAiModeLabel()}
                        </div>
                    </div>

                    {/* Right: Controls */}
                    <div className="flex items-center gap-2">
                        {/* Credits */}
                        <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm mr-2">
                            <Coins className="h-3 w-3" />
                            {creditBalance}
                        </div>

                        {/* Test Selection & Support */}
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-lg p-1 border">
                            <Select
                                value={currentProject.targetTest || ''}
                                onValueChange={(val) => updateProjectSettings('targetTest', val)}
                            >
                                <SelectTrigger className="w-[140px] h-7 text-xs border-0 bg-transparent focus:ring-0">
                                    <SelectValue placeholder="Test Seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ttest">T-Testi</SelectItem>
                                    <SelectItem value="anova">ANOVA</SelectItem>
                                    <SelectItem value="correlation">Korelasyon</SelectItem>
                                    <SelectItem value="regression">Regresyon</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                title="Hangi test uygun? Destek al."
                                onClick={() => setShowTestSuggestion(true)}
                            >
                                <Lightbulb className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

                        {/* Settings */}
                        <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)} title="Proje Ayarları">
                            <Settings className="h-5 w-5 text-slate-500" />
                        </Button>

                        {/* Help */}
                        <Button variant="ghost" size="icon" onClick={() => setShowHelp(true)}>
                            <HelpCircle className="h-5 w-5 text-slate-500" />
                        </Button>

                        {/* Theme Toggle */}
                        <Button variant="ghost" size="icon" onClick={toggleTheme} title="Karanlık Mod">
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        {/* Right Sidebar Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleRightSidebar}
                            className={!isRightSidebarOpen ? 'text-slate-400' : 'text-[#860000]'}
                            title={isRightSidebarOpen ? "Paneli Gizle" : "Paneli Göster"}
                        >
                            {isRightSidebarOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="max-w-3xl mx-auto space-y-6 pb-4">
                        {displayMessages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <Avatar className={`h-8 w-8 mt-1 border shadow-sm ${msg.role === 'system' ? 'bg-transparent border-transparent' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    {msg.role === 'system' ? (
                                        <AvatarImage src="https://static.fokusistatistik.com/bilge/logos/bilgefavicon.png" />
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

            {/* Project Settings Dialog (Tabbed) */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{language === 'tr' ? 'Proje Ayarları' : 'Project Settings'}</DialogTitle>
                        <DialogDescription>{language === 'tr' ? 'Proje detaylarını ve yapılandırmasını düzenleyin.' : 'Manage project details and configuration.'}</DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="general" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-4">
                            <TabsTrigger value="general">{language === 'tr' ? 'Genel' : 'General'}</TabsTrigger>
                            <TabsTrigger value="analysis">{language === 'tr' ? 'Analiz & Format' : 'Analysis & Format'}</TabsTrigger>
                            <TabsTrigger value="members">{language === 'tr' ? 'Üyeler' : 'Members'}</TabsTrigger>
                        </TabsList>

                        {/* General Settings */}
                        <TabsContent value="general" className="space-y-4">
                            <div className="space-y-2">
                                <Label>Proje Başlığı</Label>
                                <Input value={currentProject.title} onChange={(e) => updateProjectSettings('title', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Açıklama</Label>
                                <Textarea value={currentProject.description || ''} onChange={(e) => updateProjectSettings('description', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Proje Tipi</Label>
                                    <Select value={currentProject.type} onValueChange={(v) => updateProjectSettings('type', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="quantitative">Nicel</SelectItem>
                                            <SelectItem value="qualitative">Nitel</SelectItem>
                                            <SelectItem value="mixed">Karma</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Dil</Label>
                                    <Select value={currentProject.targetLanguage || 'tr'} onValueChange={(v) => updateProjectSettings('targetLanguage', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tr">Türkçe</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Analysis Settings */}
                        <TabsContent value="analysis" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Ondalık Ayırıcı</Label>
                                    <Select value={currentProject.decimalSeparator || '.'} onValueChange={(v) => updateProjectSettings('decimalSeparator', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value=".">Nokta (.)</SelectItem>
                                            <SelectItem value=",">Virgül (,)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Basamak (0-5)</Label>
                                    <Input type="number" min="0" max="5" value={currentProject.decimalPrecision || 3} onChange={(e) => updateProjectSettings('decimalPrecision', parseInt(e.target.value))} />
                                </div>
                            </div>
                        </TabsContent>

                        {/* Members - Simplified for brevity */}
                        <TabsContent value="members" className="space-y-4">
                            <div className="text-center py-4 border-2 border-dashed rounded-lg text-slate-400">
                                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>Henüz üye eklenmedi.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
            <TestSuggestionModal isOpen={showTestSuggestion} onClose={() => setShowTestSuggestion(false)} />
        </div>
    );
}
