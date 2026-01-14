'use client';

import { useState } from 'react';
import { useStore, Project } from '@/store/useStore';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Star, HelpCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { translations } from '@/lib/translations';

interface NewProjectModalProps {
    className?: string;
    trigger?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const COLORS = [
    { name: 'Kırmızı', value: '#ef4444' },
    { name: 'Mavi', value: '#3b82f6' },
    { name: 'Yeşil', value: '#22c55e' },
    { name: 'Mor', value: '#a855f7' },
    { name: 'Turuncu', value: '#f97316' },
    { name: 'Gri', value: '#64748b' },
];

export function NewProjectModal({ className, trigger }: NewProjectModalProps) {
    const { addProject, language } = useStore();
    const t = translations[language].dashboard; // Using basic dashboard translations where applicable

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        studyType: '',
        academicBranch: '',
        importance: 'medium',
        color: '#ef4444',
        isFavorite: false,
        scale: 'basic',
        targetLanguage: 'tr',
        includePowerAnalysis: false
    });

    const handleSubmit = () => {
        if (!formData.title || !formData.studyType) {
            return;
        }

        const descriptionWithPower = formData.abstract + (formData.includePowerAnalysis ? '\n\n[Güç Analizi İsteniyor]' : '');

        const newProject: Project = {
            id: Date.now().toString(),
            title: formData.title,
            abstract: formData.abstract, // Keep original abstract clean if needed elsewhere
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            studyType: formData.studyType as any,
            academicBranch: formData.academicBranch,
            importance: formData.importance as 'low' | 'medium' | 'high',
            color: formData.color,
            isFavorite: formData.isFavorite,
            description: descriptionWithPower,
            scale: formData.scale as 'basic' | 'intermediate' | 'advanced',
            targetLanguage: formData.targetLanguage as 'tr' | 'en',
            status: 'active',
            usedCredits: 0,
            files: [],
            outputs: [],
            reports: [],
            messages: [],
            createdAt: new Date(),
        };

        addProject(newProject);
        setIsOpen(false);
        setFormData({
            title: '',
            abstract: '',
            studyType: '',
            academicBranch: '',
            importance: 'medium',
            color: '#ef4444',
            isFavorite: false,
            scale: 'basic',
            targetLanguage: 'tr',
            includePowerAnalysis: false
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className={cn("bg-[#860000] hover:bg-[#660000] text-white gap-2", className)}>
                        <Plus className="h-4 w-4" /> {t.newProject}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between pr-4">
                        <DialogTitle className="text-[#860000] flex items-center gap-2">
                            Yeni Araştırma Projesi
                        </DialogTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <HelpCircle className="h-5 w-5 text-slate-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent side="left" className="max-w-[250px]">
                                    <p className="font-semibold mb-1">Proje Nasıl Oluşturulur?</p>
                                    <p className="text-xs text-slate-200">
                                        Projenize bir isim verin, çalışma türünü ve alanınızı seçin.
                                        İstatistiksel beklentinizi belirleyerek Bilge'nin size en uygun analizleri sunmasını sağlayın.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <DialogDescription>
                        Projeniz için gerekli detayları girin. Bu bilgiler Bilge'nin size özel analiz yapmasını sağlar.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2 col-span-2">
                            <Label htmlFor="project-title">Proje Adı <span className="text-red-500">*</span></Label>
                            <Input
                                id="project-title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="örn., Sosyal Medya Kullanımı ve Depresyon..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="study-type">Çalışma Türü <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.studyType}
                                onValueChange={(value) => setFormData({ ...formData, studyType: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seçiniz" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="thesis">Tez (Yüksek Lisans/Doktora)</SelectItem>
                                    <SelectItem value="article">Makale (Araştırma)</SelectItem>
                                    <SelectItem value="review">Derleme / Review</SelectItem>
                                    <SelectItem value="project">TÜBİTAK / BAP Projesi</SelectItem>
                                    <SelectItem value="other">Diğer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="branch">Alan / Branş</Label>
                            <Input
                                id="branch"
                                value={formData.academicBranch}
                                onChange={(e) => setFormData({ ...formData, academicBranch: e.target.value })}
                                placeholder="örn., Klinik Psikoloji"
                            />
                        </div>
                    </div>

                    {/* Power Analysis Option */}
                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
                        <Checkbox
                            id="power-analysis"
                            checked={formData.includePowerAnalysis}
                            onCheckedChange={(checked) => setFormData({ ...formData, includePowerAnalysis: checked as boolean })}
                            className="border-indigo-400 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="grid gap-1 leading-none">
                            <Label htmlFor="power-analysis" className="font-semibold text-indigo-900 flex items-center gap-2 cursor-pointer">
                                <Zap className="h-3.5 w-3.5 fill-indigo-600 text-indigo-600" />
                                Güç (Power) Analizi
                            </Label>
                            <p className="text-xs text-indigo-700/80">
                                Araştırmanızın güç analizini yaparak örneklem boyutunu belirleyin.
                            </p>
                        </div>
                    </div>

                    {/* Scale & Language Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>İstatistiksel Beklenti</Label>
                            <Select
                                value={formData.scale}
                                onValueChange={(value) => setFormData({ ...formData, scale: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seçiniz" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="basic">Temel (Basic)</SelectItem>
                                    <SelectItem value="intermediate">Orta (Intermediate)</SelectItem>
                                    <SelectItem value="advanced">İleri (Advanced)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Hedef Dil</Label>
                            <Select
                                value={formData.targetLanguage}
                                onValueChange={(value) => setFormData({ ...formData, targetLanguage: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seçiniz" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tr">
                                        <div className="flex items-center gap-2">
                                            <span>🇹🇷</span> Türkçe
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="en">
                                        <div className="flex items-center gap-2">
                                            <span>🇺🇸</span> English (Academic)
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Extended Settings */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Önem Derecesi</Label>
                            <Select
                                value={formData.importance}
                                onValueChange={(value) => setFormData({ ...formData, importance: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seçiniz" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Düşük</SelectItem>
                                    <SelectItem value="medium">Orta</SelectItem>
                                    <SelectItem value="high">Yüksek (Acil)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Proje Rengi</Label>
                            <div className="flex gap-2 mt-1">
                                {COLORS.map((c) => (
                                    <button
                                        key={c.value}
                                        onClick={() => setFormData({ ...formData, color: c.value })}
                                        className={cn(
                                            "w-6 h-6 rounded-full border-2 transition-all",
                                            formData.color === c.value ? "border-slate-900 scale-110" : "border-transparent opacity-70 hover:opacity-100"
                                        )}
                                        style={{ backgroundColor: c.value }}
                                        title={c.name}
                                        type="button"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="abstract">Araştırma Sorusu / Özet</Label>
                        <Textarea
                            id="abstract"
                            className="min-h-[100px]"
                            value={formData.abstract}
                            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                            placeholder="Hipoteziniz nedir? Hangi değişkenleri inceliyorsunuz?"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="favorite"
                            checked={formData.isFavorite}
                            onCheckedChange={(checked) => setFormData({ ...formData, isFavorite: checked as boolean })}
                        />
                        <Label htmlFor="favorite" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 cursor-pointer">
                            <Star className={cn("h-3 w-3", formData.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-slate-400")} />
                            Favorilere Ekle
                        </Label>
                    </div>

                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>İptal</Button>
                    <Button onClick={handleSubmit} className="bg-[#860000] hover:bg-[#660000] text-white">
                        Oluştur
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
