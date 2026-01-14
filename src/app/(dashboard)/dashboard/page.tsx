'use client';

import { useState, useRef, useEffect } from 'react';
import { useStore, Project } from "@/store/useStore";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewProjectModal } from '@/components/dashboard/NewProjectModal';
import { HelpModal } from '@/components/dashboard/HelpModal';
import { TestSuggestionModal } from '@/components/dashboard/TestSuggestionModal';
import { translations } from "@/lib/translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
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
    Plus,
    UploadCloud,
    FolderOpen,
    Settings,
    Lightbulb,
    PanelRightClose,
    PanelRightOpen,
    FileText,
    BarChart3,
    Database,
    HelpCircle,
    Trash2,
    PenTool,
    MessageSquarePlus,
    UserCheck,
    CheckCircle2,
    Palette,
    Coins,
    Mic,
    AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Consistent Color Palette
const PROJECT_COLORS = [
    { id: 'indigo', label: 'İndigo', class: 'bg-indigo-600', text: 'text-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200' },
    { id: 'red', label: 'Bordo', class: 'bg-[#860000]', text: 'text-[#860000]', light: 'bg-red-50', border: 'border-red-200' },
    { id: 'blue', label: 'Mavi', class: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
    { id: 'emerald', label: 'Zümrüt', class: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200' },
    { id: 'amber', label: 'Kehribar', class: 'bg-amber-600', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200' },
    { id: 'purple', label: 'Mor', class: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
    { id: 'cyan', label: 'Turkuaz', class: 'bg-cyan-600', text: 'text-cyan-600', light: 'bg-cyan-50', border: 'border-cyan-200' },
    { id: 'rose', label: 'Gül', class: 'bg-rose-600', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-200' },
    { id: 'teal', label: 'Teal', class: 'bg-teal-600', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200' },
    { id: 'lime', label: 'Limon', class: 'bg-lime-600', text: 'text-lime-600', light: 'bg-lime-50', border: 'border-lime-200' },
    { id: 'fuchsia', label: 'Fuçya', class: 'bg-fuchsia-600', text: 'text-fuchsia-600', light: 'bg-fuchsia-50', border: 'border-fuchsia-200' },
    { id: 'sky', label: 'Gök', class: 'bg-sky-600', text: 'text-sky-600', light: 'bg-sky-50', border: 'border-sky-200' },
];

export default function DashboardPage() {
    const {
        currentProject,
        user,
        chatHistory,
        addMessage,
        addFileToProject,
        updateProject,
        deleteProject,
        language,
        isRightSidebarOpen,
        toggleRightSidebar
    } = useStore();
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Modals
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showTestSuggestion, setShowTestSuggestion] = useState(false);
    const [activeToolModal, setActiveToolModal] = useState<'method' | 'comment' | 'visual' | 'expert' | null>(null);

    // Mock Process State
    const [isProcessing, setIsProcessing] = useState(false);
    const [toolResult, setToolResult] = useState<string | null>(null);

    const t = translations[language].dashboard;
    const chatbotT = translations[language].chatbot;

    // Get current project color styles or default to Red
    const currentColor = PROJECT_COLORS.find(c => c.id === currentProject?.color) || PROJECT_COLORS[1];

    const displayMessages = chatHistory.length > 0 ? chatHistory : [{
        id: 'init',
        role: 'system' as const,
        content: chatbotT.welcome,
        timestamp: new Date()
    }];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [displayMessages, isTyping]);

    const handleSend = (text: string = input) => {
        if (!text.trim() || !currentProject) return;
        const userMsg = { id: Date.now().toString(), role: 'user' as const, content: text, timestamp: new Date() };
        addMessage(userMsg);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            addMessage({
                id: (Date.now() + 1).toString(),
                role: 'system' as const,
                content: language === 'tr' ? 'Talebiniz işlendi. (Simülasyon)' : 'Request processed.',
                timestamp: new Date()
            });
            setIsTyping(false);
        }, 1000);
    };

    const handleFileProcess = (files: FileList | null) => {
        if (!files || files.length === 0 || !currentProject) return;
        Array.from(files).forEach(file => {
            const newFile = { name: file.name, url: URL.createObjectURL(file), type: file.type || 'unknown', date: new Date() };
            addFileToProject(currentProject.id, newFile);
            addMessage({
                id: Date.now().toString(),
                role: 'user' as const,
                content: `Dosya yüklendi: ${file.name}`,
                type: 'file-upload' as const,
                timestamp: new Date()
            });
        });
    };

    const handleDeleteWithConfirmation = () => {
        if (confirm('Bu projeyi kalıcı olarak silmek üzeresiniz. Emin misiniz?')) {
            if (currentProject) {
                deleteProject(currentProject.id);
                setShowSettings(false);
            }
        }
    };

    const handleToolSubmit = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setToolResult("İşlem başarıyla tamamlandı. Sonuçlar projeye eklendi.");
            addMessage({
                id: Date.now().toString(),
                role: 'system' as const,
                content: "✅ Talep ettiğiniz akademik işlem tamamlandı ve taslak oluşturuldu.",
                timestamp: new Date()
            });
        }, 1500);
    };

    const closeToolModal = () => {
        setActiveToolModal(null);
        setToolResult(null);
        setIsProcessing(false);
    };

    if (!currentProject) {
        return (
            <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 items-center justify-center p-6 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FolderOpen className="h-10 w-10 text-[#860000]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{t.noProject}</h2>
                    <p className="text-slate-600 mb-8">{t.selectProject}</p>
                    <NewProjectModal className="w-full text-base py-6 shadow-lg" />
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 overflow-hidden relative">

            {/* --- CENTRAL AREA (Chat) --- */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-slate-200 dark:border-slate-800 relative transition-all duration-300">

                {/* Header Tools */}
                <div className="h-14 border-b flex items-center justify-between px-4 bg-white dark:bg-slate-900 shrink-0 gap-4">
                    <div className="flex items-center gap-3">
                        {/* Target Test Selection */}
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 rounded-lg p-1 border shadow-sm">
                            <Select value={currentProject.targetTest || ''} onValueChange={(v) => updateProject(currentProject.id, { targetTest: v })}>
                                <SelectTrigger className="w-[160px] h-8 text-xs border-0 bg-transparent focus:ring-0">
                                    <SelectValue placeholder="Hedef Analizi Seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ttest">Bağımsız T-Testi</SelectItem>
                                    <SelectItem value="anova">Tek Yönlü ANOVA</SelectItem>
                                    <SelectItem value="correlation">Pearson Korelasyon</SelectItem>
                                    <SelectItem value="regression">Basit Regresyon</SelectItem>
                                    <SelectItem value="chi">Ki-Kare Testi</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="w-px h-5 bg-slate-200 mx-1"></div>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-amber-500 hover:bg-amber-50" onClick={() => setShowTestSuggestion(true)} title="Test Önerisi Al">
                                <Lightbulb className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Credits Display */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-100 text-xs font-semibold">
                            <Coins className="h-3.5 w-3.5" />
                            <span>Proje Kullanılan Kredi: {currentProject.usedCredits || 0}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-700" onClick={() => setShowSettings(true)} title="Proje Ayarları">
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-700" onClick={() => setShowHelp(true)} title="Yardım">
                            <HelpCircle className="h-4 w-4" />
                        </Button>
                        {!isRightSidebarOpen && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleRightSidebar}
                                className={`gap-2 text-xs font-medium ml-2 ${currentColor.text} ${currentColor.light}`}
                            >
                                <PanelRightOpen className="h-4 w-4" />
                                Tezgahı Aç
                            </Button>
                        )}
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950/50">
                    <div className="max-w-3xl mx-auto space-y-6 pb-4">
                        {displayMessages.map((msg) => (
                            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <Avatar className={`h-8 w-8 mt-1 border shadow-sm ${msg.role === 'system' ? 'bg-transparent border-transparent' : 'bg-slate-200'}`}>
                                    {msg.role === 'system' ? <AvatarImage src="https://static.fokusistatistik.com/resimler/favicon.png" /> : <AvatarImage src={user?.profileImage || session?.user?.image || ''} />}
                                    <AvatarFallback>{msg.role === 'system' ? 'B' : 'U'}</AvatarFallback>
                                </Avatar>
                                <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-3.5 shadow-sm text-sm leading-relaxed ${msg.role === 'user' ? `${currentColor.class} text-white rounded-2xl rounded-tr-sm` : 'bg-white text-slate-800 border rounded-2xl rounded-tl-sm'}`}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 opacity-70">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </motion.div>
                        ))}
                        <div ref={scrollRef} className="h-1" />
                    </div>
                </ScrollArea>

                {/* Input Area (No File Upload Here) */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t shrink-0">
                    <div className={`max-w-3xl mx-auto relative flex items-end gap-2 p-2 rounded-2xl border transition-all focus-within:ring-4 ${currentColor.light} focus-within:border-${currentColor.id}-300 focus-within:ring-${currentColor.id}-100`}>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-200 rounded-xl" title="Sesli Mesaj (Yakında)"><Mic className="h-5 w-5" /></Button>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                            placeholder={language === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}
                            className="min-h-[44px] max-h-48 border-0 bg-transparent resize-none focus-visible:ring-0 py-3 scrollbar-hide text-base bg-white/50"
                        />
                        <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping} size="icon" className={`rounded-xl transition-all ${input.trim() ? `${currentColor.class} text-white hover:brightness-110` : 'bg-slate-200 text-slate-400'}`}><Send className="h-4 w-4" /></Button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-slate-400">Dosya yüklemek için sağdaki Laboratuvar Tezgahını kullanın.</p>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDEBAR (Laboratuvar Tezgahı) --- */}
            <AnimatePresence>
                {isRightSidebarOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 340, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-xl z-20"
                    >
                        {/* Tezgah Header */}
                        <div className={`p-3 border-b flex items-center justify-between shrink-0 ${currentColor.light}`}>
                            <span className={`font-bold text-sm ${currentColor.text}`}>Laboratuvar Tezgahı</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white/50" onClick={toggleRightSidebar}><PanelRightClose className={`h-4 w-4 ${currentColor.text}`} /></Button>
                        </div>

                        {/* Tabs Container */}
                        <Tabs defaultValue="files" className="flex-1 flex flex-col min-h-0">
                            <TabsList className="w-full justify-start rounded-none border-b h-11 px-1 bg-transparent">
                                <TabsTrigger value="files" className={`data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-${currentColor.id}-600 data-[state=active]:${currentColor.text} rounded-none px-3 text-xs flex-1`}>
                                    <FolderOpen className="h-3 w-3 mr-2" /> Dosyalar
                                </TabsTrigger>
                                <TabsTrigger value="outputs" className={`data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-${currentColor.id}-600 data-[state=active]:${currentColor.text} rounded-none px-3 text-xs flex-1 truncate`}>
                                    <BarChart3 className="h-3 w-3 mr-2" /> Raporlar
                                </TabsTrigger>
                                <TabsTrigger value="variables" className={`data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-${currentColor.id}-600 data-[state=active]:${currentColor.text} rounded-none px-3 text-xs flex-1 truncate`}>
                                    <Database className="h-3 w-3 mr-2" /> Değişkenler
                                </TabsTrigger>
                            </TabsList>

                            {/* Files Content */}
                            <TabsContent value="files" className="flex-1 p-0 m-0 min-h-0 relative flex flex-col">
                                <ScrollArea className="flex-1">
                                    <div className="p-4 space-y-3">
                                        <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => handleFileProcess(e.target.files)} multiple />
                                        <div
                                            className={`border-2 border-dashed ${currentColor.border} ${currentColor.light} rounded-xl p-6 text-center cursor-pointer hover:bg-white transition-colors mb-4`}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <UploadCloud className={`h-8 w-8 mx-auto mb-2 ${currentColor.text} opacity-80`} />
                                            <p className={`text-xs font-semibold ${currentColor.text}`}>Dosya Yükle</p>
                                            <p className="text-[10px] text-slate-400 mt-1">Sürükle bırak veya tıkla</p>
                                        </div>

                                        {currentProject.files && currentProject.files.length > 0 && (
                                            currentProject.files.map((file, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border group hover:border-slate-300 transition-colors">
                                                    <div className={`h-8 w-8 ${currentColor.light} ${currentColor.text} rounded flex items-center justify-center shrink-0`}>
                                                        <FileText className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                                        <p className="text-[10px] text-slate-400">{new Date(file.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            {/* Reports Content */}
                            <TabsContent value="outputs" className="flex-1 p-0 m-0 min-h-0">
                                <div className="p-4 text-center text-slate-500 text-sm">
                                    <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                                    <p>Oluşturulan raporlar burada listelenir.</p>
                                </div>
                            </TabsContent>

                            {/* Variables Content */}
                            <TabsContent value="variables" className="flex-1 p-0 m-0 min-h-0">
                                <div className="p-4 text-center text-slate-500 text-sm">
                                    <Database className="h-8 w-8 mx-auto mb-2 opacity-30" />
                                    <p>Değişkenler otomatik çıkarılacak.</p>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* --- ACADEMIC TOOLS SECTION (Bottom of Sidebar) --- */}
                        <div className="border-t bg-slate-50/80 p-4 space-y-4 shrink-0 shadow-inner">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><PenTool className="h-3 w-3" /> Akademik Araçlar</h4>
                                <Select value={currentProject.reportFormat || 'APA7'} onValueChange={(v) => updateProject(currentProject.id, { reportFormat: v as any })}>
                                    <SelectTrigger className="h-6 text-[10px] bg-white w-24 px-2 min-w-0 shadow-sm border-slate-200">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="APA7">APA 7</SelectItem>
                                        <SelectItem value="Chicago">Chicago</SelectItem>
                                        <SelectItem value="MLA">MLA</SelectItem>
                                        <SelectItem value="IEEE">IEEE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className={`h-14 flex flex-col gap-1 items-center justify-center p-1 bg-white hover:border-${currentColor.id}-600 hover:${currentColor.text} hover:${currentColor.light} transition-all shadow-sm`} onClick={() => setActiveToolModal('method')}>
                                    <span className="text-[10px] font-bold">Yöntem Yaz</span>
                                </Button>
                                <Button variant="outline" className={`h-14 flex flex-col gap-1 items-center justify-center p-1 bg-white hover:border-${currentColor.id}-600 hover:${currentColor.text} hover:${currentColor.light} transition-all shadow-sm`} onClick={() => setActiveToolModal('comment')}>
                                    <span className="text-[10px] font-bold">Yorum Ekle</span>
                                </Button>
                                <Button variant="outline" className={`h-14 flex flex-col gap-1 items-center justify-center p-1 bg-white hover:border-${currentColor.id}-600 hover:${currentColor.text} hover:${currentColor.light} transition-all shadow-sm`} onClick={() => setActiveToolModal('visual')}>
                                    <span className="text-[10px] font-bold">Görselleştir</span>
                                </Button>
                                <Button variant="outline" className={`h-14 flex flex-col gap-1 items-center justify-center p-1 bg-white hover:border-${currentColor.id}-600 hover:${currentColor.text} hover:${currentColor.light} transition-all shadow-sm`} onClick={() => setActiveToolModal('expert')}>
                                    <span className="text-[10px] font-bold">Uzman Kontrolü</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MODALS --- */}

            {/* Detailed Project Settings Modal */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Proje Yapılandırması</DialogTitle>
                        <DialogDescription>Çalışmanızın temel parametrelerini ve görünümünü düzenleyin.</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="general" className="w-full h-[320px] flex flex-row gap-4 mt-2">
                        <TabsList className="flex flex-col h-full justify-start w-40 bg-slate-50 p-2 space-y-1">
                            <TabsTrigger value="general" className="w-full justify-start">Genel</TabsTrigger>
                            <TabsTrigger value="appearance" className="w-full justify-start">Görünüm</TabsTrigger>
                            <TabsTrigger value="analysis" className="w-full justify-start">Analiz</TabsTrigger>
                        </TabsList>

                        <div className="flex-1 h-full pl-2 overflow-y-auto pr-2">
                            <TabsContent value="general" className="mt-0 space-y-4">
                                <div className="space-y-2">
                                    <Label>Proje Başlığı</Label>
                                    <Input value={currentProject.title} onChange={e => updateProject(currentProject.id, { title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Araştırma Hipotezi / Amaç</Label>
                                    <Textarea
                                        value={currentProject.description || ''}
                                        onChange={e => updateProject(currentProject.id, { description: e.target.value })}
                                        placeholder="Bu çalışmanın temel amacı..."
                                        className="h-24 resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Proje Önemi</Label>
                                        <Select value={currentProject.importance || 'medium'} onValueChange={v => updateProject(currentProject.id, { importance: v as any })}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Düşük</SelectItem>
                                                <SelectItem value="medium">Orta</SelectItem>
                                                <SelectItem value="high">Yüksek</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Yöntem Seviyesi</Label>
                                        <Select value={currentProject.methodLevel || 'basic'} onValueChange={v => updateProject(currentProject.id, { methodLevel: v as any })}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="basic">Temel</SelectItem>
                                                <SelectItem value="intermediate">Orta</SelectItem>
                                                <SelectItem value="advanced">İleri</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="pt-4 border-t mt-4">
                                    <Button variant="destructive" size="sm" className="w-full" onClick={handleDeleteWithConfirmation}>
                                        <Trash2 className="h-4 w-4 mr-2" /> Projeyi Kalıcı Olarak Sil
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="appearance" className="mt-0 space-y-4">
                                <Label>Proje Rengi</Label>
                                <div className="flex flex-wrap gap-2">
                                    {PROJECT_COLORS.map(color => (
                                        <div
                                            key={color.id}
                                            onClick={() => updateProject(currentProject.id, { color: color.id })}
                                            className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center border-2 transition-all ${currentProject.color === color.id ? `border-slate-800 scale-110` : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'}`}
                                            title={color.label}
                                        >
                                            <div className={`w-full h-full rounded-full ${color.class}`}></div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="analysis" className="mt-0 space-y-4">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Hedef Dil</Label>
                                            <Select value={currentProject.targetLanguage || 'tr'} onValueChange={v => updateProject(currentProject.id, { targetLanguage: v as any })}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="tr">Türkçe</SelectItem>
                                                    <SelectItem value="en">İngilizce</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Ondalık Ayracı</Label>
                                            <Select value={currentProject.decimalSeparator || '.'} onValueChange={v => updateProject(currentProject.id, { decimalSeparator: v as any })}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value=".">Nokta (.)</SelectItem>
                                                    <SelectItem value=",">Virgül (,)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Virgülden Sonra Hane</Label>
                                            <Select value={currentProject.decimalPlaces?.toString() || '2'} onValueChange={v => updateProject(currentProject.id, { decimalPlaces: parseInt(v) })}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0">0 (Tam Sayı)</SelectItem>
                                                    <SelectItem value="1">1 (.x)</SelectItem>
                                                    <SelectItem value="2">2 (.xx) [Varsayılan]</SelectItem>
                                                    <SelectItem value="3">3 (.xxx)</SelectItem>
                                                    <SelectItem value="4">4 (.xxxx)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Anlamlılık Düzeyi (Alpha)</Label>
                                            <Select value={currentProject.alphaLevel?.toString() || '0.05'} onValueChange={v => updateProject(currentProject.id, { alphaLevel: parseFloat(v) })}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0.01">0.01 (%99 Güven)</SelectItem>
                                                    <SelectItem value="0.05">0.05 (%95 Güven)</SelectItem>
                                                    <SelectItem value="0.10">0.10 (%90 Güven)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSettings(false)}>Kapat</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Helper Tool Modals */}
            <Dialog open={!!activeToolModal} onOpenChange={closeToolModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {activeToolModal === 'method' && <><PenTool className={`h-5 w-5 ${currentColor.text}`} /> Yöntem Yazma Asistanı</>}
                            {activeToolModal === 'comment' && <><MessageSquarePlus className={`h-5 w-5 ${currentColor.text}`} /> İstatistiksel Yorumlayıcı</>}
                            {activeToolModal === 'visual' && <><BarChart3 className={`h-5 w-5 ${currentColor.text}`} /> Görüntüleme Aracı</>}
                            {activeToolModal === 'expert' && <><UserCheck className={`h-5 w-5 ${currentColor.text}`} /> Uzman Kontrolü</>}
                        </DialogTitle>
                        <DialogDescription>
                            {activeToolModal === 'method' && `${currentProject.reportFormat || 'APA7'} formatında yöntem bölümü oluşturulur.`}
                            {activeToolModal === 'expert' && 'Projeniz uzman ekibimize gönderilir (50 Kredi).'}
                        </DialogDescription>
                    </DialogHeader>

                    {!toolResult ? (
                        <div className="py-4 space-y-4">
                            <div className="p-3 bg-slate-50 rounded text-sm mb-4">
                                {activeToolModal === 'expert' ? 'İstatistikçiye iletmek istediğiniz notu yazın.' : 'Bu işlem için mevcut veri setiniz ve analiz sonuçlarınız kullanılacaktır.'}
                            </div>
                            {activeToolModal === 'expert' && <Textarea placeholder="Notunuz..." />}
                            <Button className={`w-full ${currentColor.class} text-white hover:brightness-110`} onClick={handleToolSubmit} disabled={isProcessing}>
                                {isProcessing ? 'İşleniyor...' : 'Başlat'}
                            </Button>
                        </div>
                    ) : (
                        <div className="py-6 text-center space-y-3">
                            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                            <p className="font-medium">{toolResult}</p>
                            <Button onClick={closeToolModal} variant="outline">Tamam</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
            <TestSuggestionModal isOpen={showTestSuggestion} onClose={() => setShowTestSuggestion(false)} />
        </div>
    );
}
