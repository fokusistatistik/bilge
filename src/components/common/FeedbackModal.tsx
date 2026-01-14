'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        // Here you would typically send the data to your backend
        console.log({ rating, feedback });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setRating(0);
            setFeedback("");
            onClose();
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                {!submitted ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-center">Deneyiminizi Değerlendirin</DialogTitle>
                            <DialogDescription className="text-center">
                                Kısa bir değerlendirme ile deneyimini iyileştirmemize yardımcı olabilirsin.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center gap-6 py-4">
                            {/* Star Rating */}
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className="focus:outline-none transition-transform hover:scale-110"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    >
                                        <Star
                                            className={cn(
                                                "h-10 w-10 transition-colors",
                                                star <= (hoverRating || rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-slate-300"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Optional Comment */}
                            <div className="w-full space-y-2">
                                <Textarea
                                    placeholder="İstersen düşüncelerini kısaca yazabilirsin..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="min-h-[100px] resize-none"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="ghost" onClick={onClose} disabled={submitted}>
                                İptal
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={rating === 0 || submitted}
                                className="bg-[#860000] hover:bg-[#660000] text-white"
                            >
                                Gönder
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Star className="h-8 w-8 text-green-600 fill-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">Teşekkürler!</h3>
                        <p className="text-slate-500 mt-2">Geri bildiriminiz bizim için çok değerli.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
