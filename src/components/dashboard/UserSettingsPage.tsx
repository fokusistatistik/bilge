'use client';

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Settings, Globe, Camera, Save } from "lucide-react";

export function UserSettingsPage() {
    const { user, updateUser, creditBalance, addCredits } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        academicTitle: user?.academicTitle || '',
        institution: user?.institution || '',
        academicField: user?.academicField || '',
    });

    const handleSave = () => {
        updateUser(formData);
        setIsEditing(false);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Hesap Ayarları</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Profil bilgilerinizi ve tercihlerinizi yönetin</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="h-4 w-4" /> Profil
                    </TabsTrigger>
                    <TabsTrigger value="credits" className="gap-2">
                        <CreditCard className="h-4 w-4" /> Krediler
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="gap-2">
                        <Settings className="h-4 w-4" /> Tercihler
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profil Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-indigo-600 text-white text-2xl">
                                        {user?.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Camera className="h-4 w-4" /> Fotoğraf Yükle
                                    </Button>
                                    <p className="text-xs text-slate-500">JPG, PNG veya GIF. Maksimum 2MB.</p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Ad Soyad *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefon *</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Akademik Ünvan *</Label>
                                    <Input
                                        id="title"
                                        value={formData.academicTitle}
                                        onChange={(e) => setFormData({ ...formData, academicTitle: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="institution">Kurum</Label>
                                    <Input
                                        id="institution"
                                        value={formData.institution}
                                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="field">Akademik Alan *</Label>
                                    <Input
                                        id="field"
                                        value={formData.academicField}
                                        onChange={(e) => setFormData({ ...formData, academicField: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                                {isEditing ? (
                                    <>
                                        <Button onClick={handleSave} className="bg-[#860000] hover:bg-[#660000] gap-2">
                                            <Save className="h-4 w-4" /> Kaydet
                                        </Button>
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                                            İptal
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)} variant="outline">
                                        Düzenle
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Credits Tab */}
                <TabsContent value="credits" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kredi Bakiyesi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white">
                                <div>
                                    <p className="text-sm opacity-80">Mevcut Bakiye</p>
                                    <p className="text-4xl font-bold mt-1">{creditBalance}</p>
                                    <p className="text-xs opacity-70 mt-1">Kredi</p>
                                </div>
                                <CreditCard className="h-16 w-16 opacity-50" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Kredi Paketleri</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        { credits: 100, price: 150, popular: false },
                                        { credits: 150, price: 200, popular: true },
                                        { credits: 10, price: 2, popular: false, perCredit: true },
                                    ].map((pkg, idx) => (
                                        <Card key={idx} className={pkg.popular ? 'border-indigo-600 border-2' : ''}>
                                            <CardContent className="p-4 space-y-3">
                                                {pkg.popular && (
                                                    <Badge className="bg-indigo-600 text-white">En Popüler</Badge>
                                                )}
                                                <div>
                                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                                        {pkg.credits} Kredi
                                                    </p>
                                                    <p className="text-sm text-slate-500">
                                                        ${pkg.price} {pkg.perCredit && '/ kredi'}
                                                    </p>
                                                </div>
                                                <Button
                                                    className={`w-full ${pkg.popular ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                                                    variant={pkg.popular ? 'default' : 'outline'}
                                                    onClick={() => addCredits(pkg.credits)}
                                                >
                                                    Satın Al
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <p className="text-sm text-amber-800 dark:text-amber-300">
                                    <strong>Not:</strong> Krediler satın alındıktan sonra iade edilemez. Lütfen ihtiyacınıza uygun paketi seçin.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dil ve Bölge Ayarları</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="language">Dil</Label>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="gap-2">
                                        <Globe className="h-4 w-4" /> Türkçe (TR)
                                    </Button>
                                    <Button variant="ghost" className="gap-2">
                                        <Globe className="h-4 w-4" /> English (EN)
                                    </Button>
                                </div>
                                <p className="text-xs text-slate-500">
                                    Sistem dili değişikliği tüm arayüzü etkiler. Raporlar her iki dilde de oluşturulabilir.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Veri Güvenliği</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                                    Veri Gizliliği Politikası
                                </h4>
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    Projelerinizi tamamladıktan sonra verilerinizi silerseniz, sunucumuzdan da kalıcı olarak silinir
                                    ve hiçbir şekilde yedeklenmez. Tüm verileriniz şifrelenmiş olarak saklanır ve yalnızca sizin
                                    erişiminize açıktır.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
