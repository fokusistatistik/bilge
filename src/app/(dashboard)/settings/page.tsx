'use client';

import { useSession } from "next-auth/react";
import { useStore } from "@/store/useStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, CreditCard, Shield, Settings, BookOpen, GraduationCap, Building2, MapPin, Globe, Award, Activity, Loader2, Camera, Trash2, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef, useEffect } from "react";
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
    const { user, updateUser } = useStore();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync store user data with form
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    phone: user.phone || prev.profile.phone,
                    academicTitle: user.academicTitle || prev.profile.academicTitle,
                    institution: user.institution || prev.profile.institution,
                }
            }));
        }
    }, [user]);

    const handleInputChange = (section: 'profile', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                updateUser({ profileImage: result });
                toast({
                    title: "Fotoğraf Güncellendi",
                    description: "Profil fotoğrafınız başarıyla değiştirildi."
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (section: 'profile' | 'academic') => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (section === 'profile') {
                updateUser({
                    phone: formData.profile.phone,
                    // city: formData.profile.city 
                });
            }
            toast({
                title: "Başarılı",
                description: "Bilgileriniz güncellendi."
            });
        }, 1000);
    };

    const displayImage = user?.profileImage || user?.image || session?.user?.image || '';

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
                                    <CardTitle>Profil Fotoğrafı</CardTitle>
                                    <CardDescription>Sizi temsil edecek bir fotoğraf yükleyin.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <div className="relative group">
                                            <Avatar className="h-24 w-24 border-4 border-slate-100 dark:border-slate-800 shadow-md">
                                                <AvatarImage src={displayImage} className="object-cover" />
                                                <AvatarFallback className="text-2xl bg-slate-200 text-slate-500">
                                                    {user?.name?.charAt(0) || session?.user?.name?.charAt(0) || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute bottom-0 right-0 p-1.5 bg-[#860000] text-white rounded-full shadow-lg hover:bg-[#660000] transition-colors"
                                                title="Fotoğrafı Değiştir"
                                            >
                                                <Camera className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex-1 space-y-2 text-center sm:text-left">
                                            <h3 className="font-semibold text-lg">{user?.name || session?.user?.name}</h3>
                                            <p className="text-sm text-slate-500">JPG, GIF veya PNG. Maksimum 2MB.</p>
                                            <div className="flex gap-2 justify-center sm:justify-start">
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    accept="image/*"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    Fotoğraf Yükle
                                                </Button>
                                                {displayImage && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => updateUser({ profileImage: undefined })}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Kaldır
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Kimlik Bilgileri</CardTitle>
                                    <CardDescription>Kişisel iletişim bilgilerinizi güncelleyin.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Ad Soyad</Label>
                                            <Input value={user?.name || session?.user?.name || ''} disabled className="bg-slate-50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>E-posta</Label>
                                            <Input value={user?.email || session?.user?.email || ''} disabled className="bg-slate-50" />
                                        </div>
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
