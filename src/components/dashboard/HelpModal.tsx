'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayCircle, FileText, HelpCircle } from "lucide-react";

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden">
                <div className="p-6 border-b bg-slate-50 dark:bg-slate-900">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <HelpCircle className="h-6 w-6 text-[#860000]" />
                            Bilge Yardım Merkezi
                        </DialogTitle>
                        <DialogDescription>
                            Sistem kullanımı ve istatistiksel analizler hakkında rehber.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Tabs defaultValue="system" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 pt-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="system">Sistem Kullanımı</TabsTrigger>
                            <TabsTrigger value="stats">İstatistik Rehberi</TabsTrigger>
                            <TabsTrigger value="faq">S.S.S</TabsTrigger>
                        </TabsList>
                    </div>

                    <ScrollArea className="flex-1 p-6">
                        <TabsContent value="system" className="space-y-6 mt-0">
                            {/* Video Placeholder */}
                            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center group cursor-pointer relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                <PlayCircle className="h-16 w-16 text-white opacity-80 group-hover:scale-110 transition-transform z-10" />
                                <span className="absolute bottom-4 left-4 text-white font-medium z-10">Bilge: Başlangıç Rehberi (Video)</span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                    <h3 className="font-semibold mb-2">Proje Oluşturma</h3>
                                    <p className="text-sm text-slate-500">Yeni bir araştırma projesi nasıl başlatılır ve ayarlanır?</p>
                                </div>
                                <div className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                    <h3 className="font-semibold mb-2">Veri Yükleme</h3>
                                    <p className="text-sm text-slate-500">Excel ve SPSS dosyaları sisteme nasıl yüklenir?</p>
                                </div>
                                <div className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                    <h3 className="font-semibold mb-2">Analiz İsteme</h3>
                                    <p className="text-sm text-slate-500">Chatbot ile etkileşim ve doğru prompt kullanımı.</p>
                                </div>
                                <div className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                    <h3 className="font-semibold mb-2">Raporlama</h3>
                                    <p className="text-sm text-slate-500">Sonuçların APA formatında raporlanması.</p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="stats" className="space-y-6 mt-0">
                            <div className="prose dark:prose-invert max-w-none">
                                <h3>Hangi Testi Seçmeliyim?</h3>
                                <p>Veri tipinize ve araştırma sorunuza göre doğru testi seçmek kritiktir.</p>

                                <div className="grid gap-4 mt-4">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900">
                                        <h4 className="text-blue-700 dark:text-blue-300 font-bold m-0">T-Testi</h4>
                                        <p className="text-sm mt-1 mb-0">İki grubun ortalamalarını karşılaştırmak için kullanılır (örn. Kadın/Erkek).</p>
                                    </div>
                                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-900">
                                        <h4 className="text-purple-700 dark:text-purple-300 font-bold m-0">ANOVA</h4>
                                        <p className="text-sm mt-1 mb-0">Üç veya daha fazla grubun ortalamalarını karşılaştırmak için kullanılır.</p>
                                    </div>
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900">
                                        <h4 className="text-green-700 dark:text-green-300 font-bold m-0">Korelasyon</h4>
                                        <p className="text-sm mt-1 mb-0">İki sayısal değişken arasındaki ilişkinin yönünü ve gücünü ölçer.</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="faq" className="space-y-4 mt-0">
                            {[
                                { q: "Verilerim güvende mi?", a: "Evet, verileriniz şifrelenerek saklanır ve analiz sonrası dilerseniz silinir." },
                                { q: "Hangi dosya formatlarını destekliyorsunuz?", a: ".xlsx, .csv, and .sav (SPSS) formatlarını destekliyoruz." },
                                { q: "Kredilerim ne zaman yenilenir?", a: "Otomatik yükleme açıksa bakiye bittiğinde, değilse manuel yükleme yapmanız gerekir." },
                                { q: "Power Analizi nasıl yapılır?", a: "Yeni proje oluştururken 'Güç Analizi' seçeneğini işaretleyerek talep edebilirsiniz." }
                            ].map((item, i) => (
                                <div key={i} className="p-4 border rounded-lg">
                                    <h4 className="font-semibold text-slate-900 dark:text-white">{item.q}</h4>
                                    <p className="text-sm text-slate-500 mt-1">{item.a}</p>
                                </div>
                            ))}
                        </TabsContent>
                    </ScrollArea>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
