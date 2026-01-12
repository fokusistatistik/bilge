'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Coins, AlertTriangle } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface CreditConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    cost: number;
    operationName: string;
}

export function CreditConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    cost,
    operationName,
}: CreditConfirmationModalProps) {
    const { user } = useStore();
    const currentCredits = user?.credits || 0;
    const remainingCredits = currentCredits - cost;
    const isInsufficient = remainingCredits < 0;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {isInsufficient ? (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                        ) : (
                            <Coins className="h-5 w-5 text-amber-500" />
                        )}
                        <span>{isInsufficient ? 'Yetersiz Kredi' : 'Analiz Onayı'}</span>
                    </DialogTitle>
                    <DialogDescription>
                        {operationName} işlemi için kredi bakiyenizden düşüm yapılacaktır.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6">
                    <div className="flex flex-col gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">İşlem Bedeli:</span>
                            <span className="font-bold text-[#860000]">{cost} Kredi</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Mevcut Bakiye:</span>
                            <span className="font-medium">{currentCredits} Kredi</span>
                        </div>
                        <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                        <div className="flex justify-between items-center font-bold">
                            <span>Kalan Bakiye:</span>
                            <span className={isInsufficient ? "text-red-600" : "text-green-600"}>
                                {remainingCredits} Kredi
                            </span>
                        </div>
                    </div>

                    {isInsufficient && (
                        <p className="mt-4 text-xs text-red-500 text-center">
                            Bu işlemi gerçekleştirmek için yeterli krediniz bulunmamaktadır.
                        </p>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>İptal</Button>
                    {isInsufficient ? (
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Kredi Satın Al
                        </Button>
                    ) : (
                        <Button onClick={onConfirm} className="bg-[#860000] hover:bg-[#660000] text-white">
                            Onayla ve Başla
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
