'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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

export function ProfileOnboardingModal() {
    const { user, updateUser } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        academicTitle: '',
        institution: '',
        academicField: '',
    });

    // Check if user needs onboarding
    useEffect(() => {
        if (user && !user.isProfileComplete) {
            setIsOpen(true);
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                academicTitle: user.academicTitle || '',
                institution: user.institution || '',
                academicField: user.academicField || '',
            });
        } else {
            setIsOpen(false);
        }
    }, [user]);

    const handleSubmit = () => {
        if (!formData.name || !formData.phone || !formData.academicTitle || !formData.academicField) {
            // Basic alert for now
            alert("Lütfen tüm zorunlu alanları doldurun.");
            return;
        }

        // Phone Validation (simple)
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            alert("Lütfen geçerli bir telefon numarası girin.");
            return;
        }

        updateUser({
            ...formData,
            isProfileComplete: true,
        });
        setIsOpen(false);
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent
                className="sm:max-w-[500px] [&>button]:hidden pointer-events-auto"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#860000]">Araştırmacı Profilinizi Tamamlayın</DialogTitle>
                    <DialogDescription>
                        Bilge&apos;nin size özel analiz sunabilmesi için bu bilgilere ihtiyacı var.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Ad Soyad <span className="text-red-500">*</span></Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Dr. Ayşe Yılmaz"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Telefon <span className="text-red-500">*</span></Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+90 555 000 0000"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Akademik Unvan <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.academicTitle}
                                onValueChange={(value) => setFormData({ ...formData, academicTitle: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Unvan Seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Öğrenci (Lisans/Y.Lisans)</SelectItem>
                                    <SelectItem value="dr">Dr. / Doktora Öğrencisi</SelectItem>
                                    <SelectItem value="assist_prof">Dr. Öğr. Üyesi</SelectItem>
                                    <SelectItem value="assoc_prof">Doçent</SelectItem>
                                    <SelectItem value="prof">Profesör</SelectItem>
                                    <SelectItem value="researcher">Bağımsız Araştırmacı</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="institution">Üniversite / Kurum</Label>
                        <Input
                            id="institution"
                            value={formData.institution}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            placeholder="İstanbul Üniversitesi"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="field">Çalışma Alanı / Branş <span className="text-red-500">*</span></Label>
                        <Select
                            value={formData.academicField}
                            onValueChange={(value) => setFormData({ ...formData, academicField: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Branş Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="medicine">Tıp & Sağlık Bilimleri</SelectItem>
                                <SelectItem value="social_sciences">Sosyal Bilimler</SelectItem>
                                <SelectItem value="engineering">Mühendislik & Teknoloji</SelectItem>
                                <SelectItem value="natural_sciences">Doğa Bilimleri</SelectItem>
                                <SelectItem value="humanities">Beşeri Bilimler</SelectItem>
                                <SelectItem value="education">Eğitim</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-end pt-4 border-t">
                    <Button onClick={handleSubmit} className="w-full bg-[#860000] hover:bg-[#660000] text-white">
                        Profili Kaydet
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
