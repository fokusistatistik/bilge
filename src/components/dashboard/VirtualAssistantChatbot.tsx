'use client';

import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function VirtualAssistantChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Welcome message on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                setMessages([{
                    id: '1',
                    role: 'assistant',
                    content: 'Merhaba! Ben Bilge Sanal Destek asistanınızım. Size nasıl yardımcı olabilirim? 😊',
                    timestamp: new Date(),
                }]);
            }, 500);
        }
    }, [isOpen, messages.length]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate API call to n8n webhook
        setTimeout(() => {
            const botResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: getMockResponse(inputValue),
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getMockResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('kredi') || lowerInput.includes('credit')) {
            return 'Kredi bakiyenizi kontrol etmek veya yeni kredi satın almak için Ayarlar > Krediler bölümünü ziyaret edebilirsiniz. Size yardımcı olabilir miyim?';
        }
        if (lowerInput.includes('analiz') || lowerInput.includes('analysis')) {
            return 'Analiz yapmak için öncelikle bir proje oluşturmanız ve veri setinizi yüklemeniz gerekiyor. Ardından uygun analiz türünü seçebilirsiniz. Detaylı yardım ister misiniz?';
        }
        if (lowerInput.includes('yardım') || lowerInput.includes('help')) {
            return 'Tabii ki! Size şu konularda yardımcı olabilirim:\n\n• Proje oluşturma\n• Veri yükleme\n• Analiz seçimi\n• Kredi yönetimi\n• Rapor indirme\n\nHangi konuda yardıma ihtiyacınız var?';
        }

        return 'Anladım. Bu konuda size yardımcı olmak için n8n sistemimiz üzerinden destek ekibimize yönlendirme yapabilirim. Detaylı bilgi için lütfen belirtin.';
    };

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-2 right-2 z-50"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="h-8 w-8 rounded-full bg-[#860000] hover:bg-[#660000] text-white shadow-lg hover:shadow-xl transition-all p-0 flex items-center justify-center"
                            size="icon"
                        >
                            <MessageCircle className="h-4 w-4" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#860000] to-[#660000] p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-white">
                                    <AvatarImage src="https://static.fokusistatistik.com/resimler/favicon.png" />
                                    <AvatarFallback className="bg-white text-[#860000] font-bold">B</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold">Bilge Asistan</h3>
                                    <p className="text-xs opacity-80">Akademik Analiz Rehberi</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        {msg.role === 'assistant' && (
                                            <Avatar className="h-8 w-8 shrink-0">
                                                <AvatarImage src="https://static.fokusistatistik.com/resimler/favicon.png" />
                                                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">B</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div
                                            className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm ${msg.role === 'user'
                                                ? 'bg-[#860000] text-white rounded-br-none'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
                                                }`}
                                        >
                                            <p className="whitespace-pre-line">{msg.content}</p>
                                            <p className="text-xs opacity-60 mt-1">
                                                {msg.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex gap-3">
                                        <Avatar className="h-8 w-8 shrink-0">
                                            <AvatarImage src="https://static.fokusistatistik.com/resimler/favicon.png" />
                                            <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">B</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Mesajınızı yazın..."
                                    className="flex-1"
                                />
                                <Button
                                    onClick={handleSend}
                                    size="icon"
                                    className="bg-[#860000] hover:bg-[#660000] text-white shrink-0"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-center">
                                n8n ile desteklenmektedir
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
