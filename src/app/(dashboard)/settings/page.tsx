'use client';

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, CreditCard, Shield, Settings, BookOpen, GraduationCap, Building2, MapPin, Globe, Award, Activity, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

// Initial mock data (In real app, fetch this from API on mount)
const initialData = {
    profile: {
        institution: "İstanbul Üniversitesi",
        department: "Ekonometri",
        academicTitle: "Dr. Öğr. Üyesi",
        researchArea: "Zaman Serileri Analizi",
        phone: "+90 555 123 45 67",
        country: "Türkiye",
        city: "İstanbul",
        isProfileComplete: true
    },
    subscription: {
        plan: "free",
        credits: 10,
        creditsUsed: 2,
        creditsRemaining: 8,
        features: {
            maxProjects: 3,
            maxAnalysesPerMonth: 10,
            advancedAnalytics: false
        }
    },
    statistics: {
        totalProjects: 1,
        totalAnalyses: 5,
        lastActivity: new Date().toLocaleDateString('tr-TR')
    },
    permissions: [
        { label: "Proje Oluşturma", can: true },
        { label: "Dosya Yükleme", can: true },
        { label: "Analiz Çalıştırma", can: true },
        { label: "Veri Dışa Aktarma", can: true },
        { label: "Admin Yetkisi", can: false }
    ]
};

export default function SettingsPage() {
    const { data: session } = useSession();
    const { toast } = useToast(); // Assuming standard shadcn useToast hook exists or is mocked
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const handleInputChange = (section: 'profile', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = async (section: 'profile' | 'academic') => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    update_type: section,
                    profile_data: formData.profile
                })
            });

            if (response.ok) {
                // Basit bir toast simülasyonu (eğer hook yoksa alert düşer)
                alert("✅ Bilgiler başarıyla güncellendi!");
                // toast({ title: "Başarılı", description: "Bilgileriniz güncellendi." });
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            console.error(error);
            alert("❌ Güncelleme sırasında bir hata oluştu.");
            // toast({ title: "Hata", description: "Bir sorun oluştu.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
            {/* Header */}
            <div className="border-b bg-white dark:bg-slate-900 px-8 py-6 shadow-sm">
                <div className="max-w-6xl mx-auto flex items-center gap-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/50">
                        <Settings className="h-8 w-8 text-[#860000] dark:text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hesap Ayarları</h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Akademik profilinizi ve tercihlerinizi n8n entegrasyonu ile yönetin.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-6xl mx-auto w-full p-8">
                <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">

                    {/* Vertical Navigation */}
                    <div className="w-full md:w-64 space-y-4">
                        <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 space-y-2">
                            <TabsTrigger value="profile" className="w-full justify-start gap-3 px-4 py-3 rounded-lg border border-transparent data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                <User className="h-4 w-4 text-blue-600" /> Profil & Kimlik
                            </TabsTrigger>
                            <TabsTrigger value="academic" className="w-full justify-start gap-3 px-4 py-3 rounded-lg border border-transparent data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                <GraduationCap className="h-4 w-4 text-purple-600" /> Akademik Detaylar
                            </TabsTrigger>
                            <TabsTrigger value="subscription" className="w-full justify-start gap-3 px-4 py-3 rounded-lg border border-transparent data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                <CreditCard className="h-4 w-4 text-emerald-600" /> Abonelik
                            </TabsTrigger>
                            <TabsTrigger value="permissions" className="w-full justify-start gap-3 px-4 py-3 rounded-lg border border-transparent data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                <Shield className="h-4 w-4 text-amber-600" /> Yetkiler
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 space-y-6">

                        {/* PROFILE TAB */}
                        <TabsContent value="profile" className="space-y-6 m-0 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Kimlik Bilgileri</CardTitle>
                                    <CardDescription>Kişisel iletişim bilgilerinizi güncelleyin.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl">
                                        <Avatar className="h-20 w-20"><AvatarImage src={session?.user?.image || ''} /><AvatarFallback><User /></AvatarFallback></Avatar>
                                        <div>
                                            <h3 className="text-xl font-bold">{session?.user?.name}</h3>
                                            <p className="text-slate-500">{session?.user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Telefon</Label>
                                            <Input
                                                value={formData.profile.phone}
                                                onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Şehir</Label>
                                            <Input
                                                value={formData.profile.city}
                                                onChange={(e) => handleInputChange('profile', 'city', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button onClick={() => handleSave('profile')} disabled={isLoading} className="bg-[#860000] hover:bg-[#660000]">
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Kaydet
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ACADEMIC TAB */}
                        <TabsContent value="academic" className="space-y-6 m-0 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Akademik Bilgiler</CardTitle>
                                    <CardDescription>Kurum ve araştırma alanlarınızı belirleyin.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Kurum</Label>
                                            <Input
                                                value={formData.profile.institution}
                                                onChange={(e) => handleInputChange('profile', 'institution', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Departman</Label>
                                            <Input
                                                value={formData.profile.department}
                                                onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Unvan</Label>
                                            <Select
                                                value={formData.profile.academicTitle}
                                                onValueChange={(val) => handleInputChange('profile', 'academicTitle', val)}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Prof. Dr.">Prof. Dr.</SelectItem>
                                                    <SelectItem value="Doç. Dr.">Doç. Dr.</SelectItem>
                                                    <SelectItem value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</SelectItem>
                                                    <SelectItem value="Arş. Gör.">Arş. Gör.</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Alan</Label>
                                            <Input
                                                value={formData.profile.researchArea}
                                                onChange={(e) => handleInputChange('profile', 'researchArea', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button onClick={() => handleSave('academic')} disabled={isLoading} className="bg-[#860000] hover:bg-[#660000]">
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Güncelle
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* SUBSCRIPTION TAB (ReadOnly) */}
                        <TabsContent value="subscription" className="space-y-6 m-0 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Plan Detayları</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
                                            <span>Mevcut Kredi</span>
                                            <Badge className="bg-emerald-600 text-lg px-3">{formData.subscription.creditsRemaining}</Badge>
                                        </div>
                                        <div className="text-sm text-slate-500">Plan yükseltme işlemleri için destek ekibiyle iletişime geçin.</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        {/* PERMISSIONS TAB (ReadOnly) */}
                        <TabsContent value="permissions" className="space-y-6 m-0 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Yetkiler & Sınırlar</CardTitle>
                                    <CardDescription>Hesabınızın yapabileceği işlemleri gösterir.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {formData.permissions.map((perm, index) => (
                                            <div key={index} className={`flex items-center gap-3 p-4 rounded-xl border ${perm.can ? 'bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30' : 'bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30'}`}>
                                                <div className={`p-1.5 rounded-full ${perm.can ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {perm.can ? <Shield className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                                                </div>
                                                <span className={`text-sm font-medium ${perm.can ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'}`}>
                                                    {perm.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Bildirim Tercihleri</CardTitle>
                                    <CardDescription>Sistem bildirimlerini nasıl almak istediğinizi seçin.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>E-posta Bildirimleri</Label>
                                            <p className="text-sm text-muted-foreground">Önemli güncellemeler ve kampanya haberleri.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Analiz Tamamlandı</Label>
                                            <p className="text-sm text-muted-foreground">Analiz sonuçlandığında anında bildirim al.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </div>
                </Tabs>
            </div>
        </div>
    );
}
