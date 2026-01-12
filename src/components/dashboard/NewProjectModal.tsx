'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
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
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewProjectModalProps {
    className?: string;
    trigger?: React.ReactNode;
}

export function NewProjectModal({ className, trigger }: NewProjectModalProps) {
    const { addProject } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        studyType: '',
        academicBranch: '',
    });

    const handleSubmit = () => {
        if (!formData.title || !formData.studyType) {
            return;
        }

        const newProject = {
            id: Date.now().toString(),
            title: formData.title,
            abstract: formData.abstract,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            studyType: formData.studyType as any,
            academicBranch: formData.academicBranch,
            files: [],
            reports: [],
            createdAt: new Date(),
        };

        addProject(newProject);
        setIsOpen(false);
        setFormData({ title: '', abstract: '', studyType: '', academicBranch: '' });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className={cn("bg-[#860000] hover:bg-[#660000] text-white gap-2", className)}>
                        <Plus className="h-4 w-4" /> Yeni Proje
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-[#860000]">Yeni Araştırma Oturumu Oluştur</DialogTitle>
                    <DialogDescription>
                        Yeni bir analiz bağlamı oluşturun. Bu bilgi Bilge&apos;nin tartışma bölümünü yazmasına yardımcı olur.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="project-title">Proje Başlığı <span className="text-red-500">*</span></Label>
                        <Input
                            id="project-title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="örn., X'in Y üzerindeki etkisi..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="study-type">Çalışma Türü <span className="text-red-500">*</span></Label>
                        <Select
                            value={formData.studyType}
                            onValueChange={(value) => setFormData({ ...formData, studyType: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Tür Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="thesis">Tez</SelectItem>
                                <SelectItem value="article">Akademik Makale</SelectItem>
                                <SelectItem value="clinical_trial">Klinik Çalışma</SelectItem>
                                <SelectItem value="review">Sistematik Derleme</SelectItem>
                                <SelectItem value="other">Diğer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="branch">Branş / Alan</Label>
                        <Input
                            id="branch"
                            value={formData.academicBranch}
                            onChange={(e) => setFormData({ ...formData, academicBranch: e.target.value })}
                            placeholder="örn., Klinik Psikoloji"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="abstract">Araştırma Sorusu / Özet & Kapsam</Label>
                        <textarea
                            id="abstract"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.abstract}
                            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                            placeholder="Hipotezinizi ve metodolojinizi kısaca açıklayın..."
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>İptal</Button>
                    <Button onClick={handleSubmit} className="bg-[#860000] hover:bg-[#660000] text-white">
                        Oturum Oluştur
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
