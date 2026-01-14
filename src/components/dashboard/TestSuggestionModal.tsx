'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Sparkles } from "lucide-react";

export function TestSuggestionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
                        AI Test Danışmanı
                    </DialogTitle>
                    <DialogDescription>
                        Mevcut değişkenlerinize göre en uygun testi belirliyorum.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm">
                        <BrainCircuit className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="font-semibold text-slate-700 dark:text-slate-200">Analiz Yapılıyor...</p>
                            <p className="text-slate-500 dark:text-slate-400">Veri türleri ve dağılım inceleniyor (Simülasyon).</p>
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg">
                        <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-2">Öneri:</p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                            Henüz yeterli veri girişi yapılmadığı için kesin bir öneride bulunamıyorum. Lütfen "Bağımsız Örneklem T-Testi" seçeneğini değerlendirin.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Kapat</Button>
                    <Button className="bg-[#860000] text-white hover:bg-[#660000]" onClick={onClose}>Öneriyi Uygula</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
