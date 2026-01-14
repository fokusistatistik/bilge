'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    PenTool,
    MessageSquarePlus,
    BarChart3,
    UserCheck,
    FileText,
    BrainCircuit,
    CheckCircle2
} from "lucide-react";
import { useStore } from "@/store/useStore";

export function ProjectActions() {
    const { currentProject, updateProject } = useStore();
    const [activeModal, setActiveModal] = useState<'method' | 'comment' | 'visual' | 'expert' | null>(null);
    const [methodText, setMethodText] = useState("");

    // Mock States for process simulation
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const closeModal = () => {
        setActiveModal(null);
        setIsProcessing(false);
        setResult(null);
    };

    const handleProcess = () => {
        setIsProcessing(true);
        // Simulate AI delay
        setTimeout(() => {
            setIsProcessing(false);
            setResult("İşlem başarıyla tamamlandı. Taslak proje dosyalarına eklendi.");
        }, 1500);
    };

    const handleReportFormat = (format: any) => {
        if (currentProject) {
            updateProject(currentProject.id, { reportFormat: format });
        }
    };

    if (!currentProject) return null;

    return (
        <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 border-b overflow-x-auto scrollbar-hide">

            {/* Report Format Selector */}
            <div className="flex items-center gap-2 mr-4 pl-2 border-r pr-4">
                <FileText className="h-4 w-4 text-slate-500" />
                <Select value={currentProject.reportFormat || 'APA7'} onValueChange={handleReportFormat}>
                    <SelectTrigger className="h-8 w-[110px] text-xs border-0 bg-slate-50 dark:bg-slate-800">
                        <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="APA7">APA 7</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="Harvard">Harvard</SelectItem>
                        <SelectItem value="MLA">MLA</SelectItem>
                        <SelectItem value="IEEE">IEEE</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button variant="ghost" size="sm" className="h-8 gap-2 text-slate-600 hover:text-[#860000] hover:bg-red-50" onClick={() => setActiveModal('method')}>
                <PenTool className="h-4 w-4" />
                <span className="hidden sm:inline">Yöntem Yaz</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-8 gap-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50" onClick={() => setActiveModal('comment')}>
                <MessageSquarePlus className="h-4 w-4" />
                <span className="hidden sm:inline">Yorum Ekle</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-8 gap-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50" onClick={() => setActiveModal('visual')}>
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Görselleştir</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-8 gap-2 text-slate-600 hover:text-green-600 hover:bg-green-50" onClick={() => setActiveModal('expert')}>
                <UserCheck className="h-4 w-4" />
                <span className="hidden sm:inline">İstatistikçi Kontrolü</span>
            </Button>

            {/* --- MODALS --- */}

            {/* Method Modal */}
            <Dialog open={activeModal === 'method'} onOpenChange={closeModal}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><PenTool className="h-5 w-5 text-[#860000]" /> Yöntem Yazma Asistanı</DialogTitle>
                        <DialogDescription>
                            Seçilen rapor formatına ({currentProject.reportFormat || 'APA7'}) uygun olarak yöntem bölümü oluşturulur.
                        </DialogDescription>
                    </DialogHeader>
                    {!result ? (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Dahil Edilecek Analizler</Label>
                                <div className="p-3 bg-slate-50 rounded text-sm text-slate-600">
                                    • Tanımlayıcı İstatistikler<br />
                                    • Normallik Testleri<br />
                                    • {currentProject.targetTest ? currentProject.targetTest.toUpperCase() : 'Hipotez Testleri'}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Ek Notlar (Opsiyonel)</Label>
                                <Textarea placeholder="Örn: Outlier analizi yapıldı, şu kriterlere göre veri temizlendi..." className="h-24 resize-none" value={methodText} onChange={e => setMethodText(e.target.value)} />
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center space-y-3">
                            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                            <p className="font-medium text-lg">Yöntem Bölümü Oluşturuldu</p>
                            <p className="text-slate-500 text-sm">Metin başarıyla Sohbet alanına ve Dosyalar'a eklendi.</p>
                        </div>
                    )}
                    <DialogFooter>
                        {!result ? (
                            <Button onClick={handleProcess} disabled={isProcessing} className="bg-[#860000] text-white">
                                {isProcessing ? 'Yazılıyor...' : 'Oluştur'}
                            </Button>
                        ) : (
                            <Button onClick={closeModal}>Tamam</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Comment Modal */}
            <Dialog open={activeModal === 'comment'} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><MessageSquarePlus className="h-5 w-5 text-blue-600" /> Bulguları Yorumla</DialogTitle>
                        <DialogDescription>Çıkan istatistiksel sonuçlar akademik dille yorumlanır.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                            <BrainCircuit className="h-5 w-5 shrink-0" />
                            <p>Son analiz çıktıları taranarak p-değerleri, etki büyüklükleri ve anlamlılık düzeyleri yorumlanacaktır.</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleProcess} className="bg-blue-600 text-white hover:bg-blue-700">Yorumlamayı Başlat</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Visual Modal */}
            <Dialog open={activeModal === 'visual'} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-purple-600" /> Gelişmiş Görselleştirme</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="border hover:border-purple-500 cursor-pointer p-4 rounded-lg text-center space-y-2 transition-all">
                            <BarChart3 className="h-8 w-8 mx-auto text-slate-400" />
                            <p className="text-sm font-medium">Korelasyon Matrisi</p>
                        </div>
                        <div className="border hover:border-purple-500 cursor-pointer p-4 rounded-lg text-center space-y-2 transition-all">
                            <BarChart3 className="h-8 w-8 mx-auto text-slate-400" />
                            <p className="text-sm font-medium">Dağılım Grafiği (Scatter)</p>
                        </div>
                        <div className="border hover:border-purple-500 cursor-pointer p-4 rounded-lg text-center space-y-2 transition-all">
                            <BarChart3 className="h-8 w-8 mx-auto text-slate-400" />
                            <p className="text-sm font-medium">Box Plot</p>
                        </div>
                        <div className="border hover:border-purple-500 cursor-pointer p-4 rounded-lg text-center space-y-2 transition-all">
                            <BarChart3 className="h-8 w-8 mx-auto text-slate-400" />
                            <p className="text-sm font-medium">Histogram</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Expert Modal */}
            <Dialog open={activeModal === 'expert'} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-green-600" /> İstatistikçi Kontrolü İste</DialogTitle>
                        <DialogDescription>Projeniz uzman istatistikçilerimiz tarafından incelenir.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h4 className="font-semibold text-yellow-800 text-sm mb-1">Premium Hizmet</h4>
                            <p className="text-xs text-yellow-700">Bu hizmet ek kredi kullanımı gerektirir (50 Kredi). İstatistikçi 24 saat içinde projenizi inceler ve rapor sunar.</p>
                        </div>
                        <div className="grid gap-2">
                            <Label>İstatistikçiye Notunuz</Label>
                            <Textarea placeholder="Özellikle incelenmesini istediğiniz kısımlar..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeModal}>İptal</Button>
                        <Button className="bg-green-600 text-white hover:bg-green-700">Kontrol İste (-50 Kredi)</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
