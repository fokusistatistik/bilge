'use client';

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User, CreditCard, Settings, Globe, Camera, Save, BarChart4, TrendingUp, Wallet, ShieldCheck, Tag, Users, Gift, Copy, Mail, Coins } from "lucide-react";
import { translations } from "@/lib/translations";

const RESEARCH_AREAS = [
    { id: 'medicine', label: 'Tıp ve Klinik Bilimler', desc: 'Klinik tıp, tıbbi araştırma ve sağlık hizmetleri' },
    { id: 'dentistry', label: 'Diş Hekimliği ve Ağız Bilimleri', desc: 'Diş hekimliği, ağız sağlığı ve dental araştırmalar' },
    { id: 'health_sci', label: 'Sağlık Bilimleri ve Hemşirelik', desc: 'Hemşirelik, halk sağlığı ve sağlık yönetimi' },
    { id: 'social', label: 'Sosyal Bilimler ve Psikoloji', desc: 'Psikoloji, sosyal hizmet ve davranış bilimleri' },
    { id: 'education', label: 'Eğitim Bilimleri', desc: 'Eğitim araştırmaları, pedagoji ve öğrenme bilimleri' },
];

export function UserSettingsPage() {
    const { user, updateUser, creditBalance, language, setLanguage } = useStore();
    const [isEditing, setIsEditing] = useState(false);

    // Store integration for user profile fields
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        academicTitle: user?.academicTitle || '',
        institution: user?.institution || '',
        academicField: user?.academicField || '',
        country: user?.country || 'Turkey',
        birthDate: user?.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '',
        autoReload: user?.autoReload || false,
        minCreditLimit: user?.minCreditLimit || 10,
        researchInterests: user?.researchInterests || []
    });

    const handleSave = () => {
        updateUser({
            ...formData,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            birthDate: formData.birthDate ? new Date(formData.birthDate) : undefined as any
        });
        setIsEditing(false);
    };

    const toggleInterest = (id: string) => {
        if (!isEditing) return;
        setFormData(prev => {
            const current = prev.researchInterests || [];
            if (current.includes(id)) {
                return { ...prev, researchInterests: current.filter(i => i !== id) };
            } else {
                if (current.length >= 5) return prev; // Max 5 limit
                return { ...prev, researchInterests: [...current, id] };
            }
        });
    };

    const copyReferral = () => {
        navigator.clipboard.writeText(user?.referralCode || 'BILGE2025');
        // Toast message would be good here
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {language === 'tr' ? 'Hesap Ayarları' : 'Account Settings'}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {language === 'tr' ? 'Profil bilgilerinizi, kredilerinizi ve tercihlerinizi yönetin.' : 'Manage your profile, credits, and preferences.'}
                </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="h-4 w-4" /> {language === 'tr' ? 'Profil' : 'Profile'}
                    </TabsTrigger>
                    <TabsTrigger value="credits" className="gap-2">
                        <Wallet className="h-4 w-4" /> {language === 'tr' ? 'Cüzdan' : 'Wallet'}
                    </TabsTrigger>
                    <TabsTrigger value="referral" className="gap-2">
                        <Users className="h-4 w-4" /> {language === 'tr' ? 'Referans' : 'Referral'}
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="gap-2">
                        <Settings className="h-4 w-4" /> {language === 'tr' ? 'Ayarlar' : 'Settings'}
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{language === 'tr' ? 'Etkileşimli Profil' : 'Interactive Profile'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24 border-4 border-slate-50 dark:border-slate-800 shadow-sm">
                                    <AvatarImage src={user?.profileImage || user?.image || ''} />
                                    <AvatarFallback className="bg-[#860000] text-white text-2xl font-bold">
                                        {user?.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Camera className="h-4 w-4" /> {language === 'tr' ? 'Fotoğraf Yükle' : 'Upload Photo'}
                                    </Button>
                                    <p className="text-xs text-slate-500">JPG, PNG. Max 2MB.</p>
                                </div>
                            </div>

                            {/* Form Fields - Compact Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-slate-500 border-b pb-2">{language === 'tr' ? 'Kişisel' : 'Personal'}</h3>
                                    <div className="grid gap-2">
                                        <Label>Ad Soyad</Label>
                                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={!isEditing} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Telefon</Label>
                                        <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} placeholder="+90..." />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Doğum Tarihi</Label>
                                        <Input type="date" value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} disabled={!isEditing} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Ülke</Label>
                                        <Select value={formData.country} onValueChange={(val) => setFormData({ ...formData, country: val })} disabled={!isEditing}>
                                            <SelectTrigger><SelectValue placeholder="Seçiniz" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Turkey">Türkiye</SelectItem>
                                                <SelectItem value="USA">United States</SelectItem>
                                                <SelectItem value="UK">United Kingdom</SelectItem>
                                                <SelectItem value="Germany">Germany</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-slate-500 border-b pb-2">{language === 'tr' ? 'Akademik' : 'Academic'}</h3>
                                    <div className="grid gap-2">
                                        <Label>Ünvan</Label>
                                        <Select value={formData.academicTitle} onValueChange={(val) => setFormData({ ...formData, academicTitle: val })} disabled={!isEditing}>
                                            <SelectTrigger><SelectValue placeholder="Seçiniz" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Student">Öğrenci</SelectItem>
                                                <SelectItem value="Dr">Dr.</SelectItem>
                                                <SelectItem value="AssocProf">Doç. Dr.</SelectItem>
                                                <SelectItem value="Prof">Prof. Dr.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Kurum</Label>
                                        <Input value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} disabled={!isEditing} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Çalışma Alanı</Label>
                                        <Input value={formData.academicField} onChange={(e) => setFormData({ ...formData, academicField: e.target.value })} disabled={!isEditing} />
                                    </div>
                                </div>
                            </div>

                            {/* Research Interests */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex justify-between items-center">
                                    <Label className="text-base font-semibold">Hedef Alanlar (Call for Papers)</Label>
                                    <span className="text-xs text-slate-500">{formData.researchInterests?.length || 0}/5 Seçildi</span>
                                </div>
                                <p className="text-sm text-slate-500">Size uygun Call for Papers'ları göstermek için ilgi alanlarınızı seçin.</p>
                                <ScrollArea className="h-48 border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                                    <div className="space-y-2">
                                        {RESEARCH_AREAS.map((area) => (
                                            <div key={area.id} className="flex items-start space-x-3 p-2 rounded hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                                <Checkbox
                                                    id={area.id}
                                                    checked={formData.researchInterests?.includes(area.id)}
                                                    onCheckedChange={() => toggleInterest(area.id)}
                                                    disabled={!isEditing}
                                                />
                                                <div className="grid gap-0.5 leading-none">
                                                    <label
                                                        htmlFor={area.id}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {area.label}
                                                    </label>
                                                    <p className="text-xs text-slate-500">{area.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>

                            <div className="flex gap-2 pt-4">
                                {isEditing ? (
                                    <>
                                        <Button onClick={handleSave} className="bg-[#860000] text-white gap-2"><Save className="h-4 w-4" /> Kaydet</Button>
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>İptal</Button>
                                    </>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)} variant="outline" className="border-[#860000] text-[#860000]">Bilgileri Düzenle</Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Credits Tab */}
                <TabsContent value="credits" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-lg">
                            <CardContent className="p-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-300 font-medium mb-1">Mevcut Bakiye</p>
                                        <h2 className="text-5xl font-bold">{creditBalance}</h2>
                                        <p className="text-slate-400 text-sm mt-2">Kredi kullanılabilir</p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-green-400" />
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                                    <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold flex-1">Kredi Yükle</Button>
                                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 flex-1">Hareketler</Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5 text-[#860000]" /> Kupon Kullan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input placeholder="Kupon kodunu girin..." className="uppercase font-mono" />
                                    <Button variant="outline">Uygula</Button>
                                </div>
                                <p className="text-xs text-slate-500">Kampanya kuponunuzu buraya girin.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-600" /> Otomatik Yükleme</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label>Aktifleştir</Label>
                                    <Switch checked={formData.autoReload} onCheckedChange={(c) => { setFormData(prev => ({ ...prev, autoReload: c })); updateUser({ autoReload: c }); }} />
                                </div>
                                {formData.autoReload && (
                                    <div className="pt-4 border-t space-y-4 animate-in fade-in">
                                        <div className="grid gap-2">
                                            <Label>Alt Limit (Kredi)</Label>
                                            <Input type="number" value={formData.minCreditLimit} onChange={(e) => { const val = parseInt(e.target.value); setFormData(prev => ({ ...prev, minCreditLimit: val })); updateUser({ minCreditLimit: val }); }} />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-[#F2C811] bg-yellow-50/50 dark:bg-yellow-900/10">
                        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2C811]/20 text-yellow-800 text-xs font-bold uppercase">Business Intelligence</div>
                                <h3 className="text-2xl font-bold">Power BI ile Verilerinizi Kazanca Dönüştürün</h3>
                                <p className="text-slate-700">Verilerinizi canlı dashboardlara dönüştürüyor, karar verme süreçlerinizi hızlandırıyoruz.</p>
                                <Button className="bg-[#F2C811] text-black hover:bg-[#dgb00e] font-bold">Başvuru Yap</Button>
                            </div>
                            <BarChart4 className="h-32 w-32 text-[#F2C811] opacity-80" />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Referral Tab */}
                <TabsContent value="referral" className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Referans Programı</CardTitle>
                                <CardDescription>Arkadaşlarını davet et, hem sen kazan hem o kazansın.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-indigo-900">Nasıl Çalışır?</p>
                                        <p className="text-sm text-indigo-700 mt-1">Arkadaşın kodunla kaydolup ilk alımını yaptığında kredi kazanırsınız.</p>
                                    </div>
                                    <Gift className="h-10 w-10 text-indigo-500" />
                                </div>

                                <div className="grid gap-4">
                                    <Label>Referans Kodun</Label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-slate-100 border rounded-lg flex items-center px-4 font-mono font-bold text-lg text-slate-700">
                                            {user?.referralCode || '----'}
                                        </div>
                                        <Button onClick={copyReferral} className="gap-2"><Copy className="h-4 w-4" /> Kopyala</Button>
                                    </div>
                                </div>

                                <div className="grid gap-4 pt-4 border-t">
                                    <Label>Gmail ile Davet Et</Label>
                                    <div className="flex gap-2">
                                        <Input placeholder="ornek@gmail.com" />
                                        <Button className="bg-indigo-600 hover:bg-indigo-700"><Mail className="h-4 w-4 mr-2" /> Gönder</Button>
                                    </div>
                                    <p className="text-xs text-slate-500">Davetiniz başarılı olursa +5 kredi kazanırsınız.</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Coins className="h-6 w-6 text-white" />
                                    </div>
                                    <p className="text-white/80 font-medium text-sm uppercase tracking-wider">Istacoin</p>
                                    <h3 className="text-4xl font-bold mt-1">{user?.istacoin || 0}</h3>
                                    <p className="text-xs text-white/70 mt-2">Toplam Kazanılan Coin</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 text-center">
                                    <p className="text-slate-500 font-medium text-sm">Referans Kazancı</p>
                                    <h3 className="text-3xl font-bold mt-1 text-slate-900">{user?.earnedCredits || 0}</h3>
                                    <p className="text-xs text-slate-400 mt-2">Kredi</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{language === 'tr' ? 'Uygulama Ayarları' : 'App Settings'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4 max-w-sm">
                                <Label>{language === 'tr' ? 'Sistem Dili' : 'System Language'}</Label>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant={language === 'tr' ? 'default' : 'outline'}
                                        className={`justify-start gap-3 ${language === 'tr' ? 'bg-[#860000]' : ''}`}
                                        onClick={() => setLanguage('tr')}
                                    >
                                        <Globe className="h-4 w-4" /> Türkçe
                                    </Button>
                                    <Button
                                        variant={language === 'en' ? 'default' : 'outline'}
                                        className={`justify-start gap-3 ${language === 'en' ? 'bg-[#860000]' : ''}`}
                                        onClick={() => setLanguage('en')}
                                    >
                                        <Globe className="h-4 w-4" /> English
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
