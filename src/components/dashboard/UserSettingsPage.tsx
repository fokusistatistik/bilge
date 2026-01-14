'use client';

import { useState } from "react";
import { useStore, UserProfile } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User, CreditCard, Settings, Globe, Camera, Save, GraduationCap, Bell, FileText, Plus, Trash2, Wallet, Download, Clock } from "lucide-react";

const RESEARCH_AREAS = [
    { id: 'medicine', label: 'Tıp ve Klinik Bilimler', desc: 'Klinik tıp, tıbbi araştırma' },
    { id: 'dentistry', label: 'Diş Hekimliği', desc: 'Ağız sağlığı, dental araştırmalar' },
    { id: 'health_sci', label: 'Sağlık Bilimleri', desc: 'Hemşirelik, halk sağlığı' },
    { id: 'social', label: 'Sosyal Bilimler', desc: 'Psikoloji, sosyoloji' },
    { id: 'education', label: 'Eğitim Bilimleri', desc: 'Pedagoji, öğrenme bilimleri' },
    { id: 'engineering', label: 'Mühendislik', desc: 'Bilgisayar, inşaat, makine' },
];

export function UserSettingsPage() {
    const { user, updateUser, creditBalance, language, setLanguage } = useStore();
    const [isEditing, setIsEditing] = useState(false);

    // Initial State Setup
    const [formData, setFormData] = useState<Partial<UserProfile>>({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        academicTitle: user?.academicTitle || '',
        institution: user?.institution || '',
        department: user?.department || '',
        academicField: user?.academicField || '',
        country: user?.country || 'Turkey',
        birthDate: user?.birthDate || '',
        bio: user?.bio || '',
        researchInterests: user?.researchInterests || [],
        notifications: user?.notifications || {
            email: true,
            sms: false,
            app: true,
            marketing: false,
            analysisComplete: true
        }
    });

    const [educationList, setEducationList] = useState(user?.education || []);
    const [newEdu, setNewEdu] = useState({ school: '', department: '', year: '', degree: 'Lisans' });

    const handleSave = () => {
        updateUser({
            ...formData,
            education: educationList
        });
        setIsEditing(false);
    };

    const addEducation = () => {
        if (newEdu.school && newEdu.department) {
            setEducationList([...educationList, newEdu]);
            setNewEdu({ school: '', department: '', year: '', degree: 'Lisans' });
        }
    };

    const removeEducation = (index: number) => {
        setEducationList(educationList.filter((_, i) => i !== index));
    };

    const toggleInterest = (id: string) => {
        if (!isEditing) return;
        setFormData(prev => {
            const current = prev.researchInterests || [];
            if (current.includes(id)) {
                return { ...prev, researchInterests: current.filter(i => i !== id) };
            } else {
                if (current.length >= 7) return prev;
                return { ...prev, researchInterests: [...current, id] };
            }
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        {language === 'tr' ? 'Hesap Ayarları' : 'Account Settings'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Akademik profilinizi ve tercihlerinizi yönetin.
                    </p>
                </div>
                {isEditing ? (
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>İptal</Button>
                        <Button onClick={handleSave} className="bg-[#860000] text-white hover:bg-[#660000]">
                            <Save className="h-4 w-4 mr-2" /> Kaydet
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline" className="border-[#860000] text-[#860000] hover:bg-red-50">
                        Düzenle
                    </Button>
                )}
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="academic">Akademik Kimlik</TabsTrigger>
                    <TabsTrigger value="billing">Cüzdan & Ödeme</TabsTrigger>
                    <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
                </TabsList>

                {/* --- PROFILE TAB --- */}
                <TabsContent value="profile" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Avatar Card */}
                        <Card className="md:col-span-1">
                            <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                                <Avatar className="h-32 w-32 border-4 border-slate-50 shadow-lg">
                                    <AvatarImage src={user?.profileImage || user?.image} />
                                    <AvatarFallback className="text-4xl bg-[#860000] text-white">{formData.name?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-lg">{formData.name || 'İsimsiz Kullanıcı'}</h3>
                                    <p className="text-sm text-slate-500">{formData.email}</p>
                                </div>
                                <Button variant="outline" size="sm" className="w-full" disabled={!isEditing}>
                                    <Camera className="h-4 w-4 mr-2" /> Fotoğraf Değiştir
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Personal Info */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Kişisel Bilgiler</CardTitle>
                                <CardDescription>İletişim ve kimlik bilgilerinizi güncelleyin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Ad Soyad</Label>
                                        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>E-posta</Label>
                                        <Input value={formData.email} disabled className="bg-slate-50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Telefon</Label>
                                        <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} placeholder="+90..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Doğum Tarihi</Label>
                                        <Input type="date" value={formData.birthDate as string} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <Label>Kısa Biyografi</Label>
                                        <Textarea
                                            value={formData.bio}
                                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Kendinizden kısaca bahsedin..."
                                            className="h-20"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- ACADEMIC IDENTITY TAB --- */}
                <TabsContent value="academic" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Akademik Bilgiler</CardTitle>
                            <CardDescription>Yayınlarınızda ve raporlarınızda kullanılacak bilgiler.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Akademik Ünvan</Label>
                                        <Select
                                            value={formData.academicTitle}
                                            onValueChange={v => setFormData({ ...formData, academicTitle: v })}
                                            disabled={!isEditing}
                                        >
                                            <SelectTrigger><SelectValue placeholder="Seçiniz" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Student">Lisans Öğrencisi</SelectItem>
                                                <SelectItem value="MasterStudent">Yüksek Lisans Öğrencisi</SelectItem>
                                                <SelectItem value="PhDStudent">Doktora Öğrencisi</SelectItem>
                                                <SelectItem value="Dr">Dr.</SelectItem>
                                                <SelectItem value="AssocProf">Doç. Dr.</SelectItem>
                                                <SelectItem value="Prof">Prof. Dr.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Kurum / Üniversite</Label>
                                        <Input value={formData.institution} onChange={e => setFormData({ ...formData, institution: e.target.value })} disabled={!isEditing} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Departman / Bölüm</Label>
                                        <Input value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} disabled={!isEditing} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Özelleşmiş Alan</Label>
                                        <Input value={formData.academicField} onChange={e => setFormData({ ...formData, academicField: e.target.value })} disabled={!isEditing} placeholder="Örn: Klinik Psikoloji" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-semibold flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Eğitim Geçmişi (CV)</h3>
                                </div>

                                {isEditing && (
                                    <div className="flex gap-2 items-end bg-slate-50 p-3 rounded-lg border">
                                        <div className="grid gap-1 flex-1">
                                            <Label className="text-xs">Okul</Label>
                                            <Input className="h-8 text-sm" value={newEdu.school} onChange={e => setNewEdu({ ...newEdu, school: e.target.value })} placeholder="Üniversite Adı" />
                                        </div>
                                        <div className="grid gap-1 flex-1">
                                            <Label className="text-xs">Bölüm</Label>
                                            <Input className="h-8 text-sm" value={newEdu.department} onChange={e => setNewEdu({ ...newEdu, department: e.target.value })} placeholder="Bölüm" />
                                        </div>
                                        <div className="grid gap-1 w-24">
                                            <Label className="text-xs">Yıl</Label>
                                            <Input className="h-8 text-sm" value={newEdu.year} onChange={e => setNewEdu({ ...newEdu, year: e.target.value })} placeholder="2024" />
                                        </div>
                                        <Button size="sm" onClick={addEducation} variant="secondary"><Plus className="h-4 w-4" /></Button>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    {educationList?.length === 0 && <p className="text-sm text-slate-400 italic">Eğitim bilgisi eklenmedi.</p>}
                                    {educationList?.map((edu, idx) => (
                                        <div key={idx} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50">
                                            <div>
                                                <p className="font-medium text-sm">{edu.school}</p>
                                                <p className="text-xs text-slate-500">{edu.department} • {edu.degree}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline">{edu.year}</Badge>
                                                {isEditing && <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500" onClick={() => removeEducation(idx)}><Trash2 className="h-3 w-3" /></Button>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t space-y-3">
                                <Label>Araştırma Alanları & İlgi Alanları</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {RESEARCH_AREAS.map(area => (
                                        <div key={area.id} className="flex items-center space-x-2 border p-2 rounded hover:bg-slate-50">
                                            <Checkbox
                                                id={area.id}
                                                checked={formData.researchInterests?.includes(area.id)}
                                                onCheckedChange={() => toggleInterest(area.id)}
                                                disabled={!isEditing}
                                            />
                                            <label htmlFor={area.id} className="text-sm font-medium cursor-pointer flex-1">
                                                {area.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- NOTIFICATIONS TAB --- */}
                <TabsContent value="notifications" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bildirim Tercihleri</CardTitle>
                            <CardDescription>Hangi durumlarda bildirim almak istediğinizi seçin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">İletişim Kanalları</h3>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded text-blue-600"><FileText className="h-4 w-4" /></div>
                                        <div>
                                            <p className="font-medium text-sm">E-posta Bildirimleri</p>
                                            <p className="text-xs text-slate-500">Analiz sonuçları ve faturalar gönderilir.</p>
                                        </div>
                                    </div>
                                    <Switch checked={formData.notifications?.email} onCheckedChange={c => setFormData({ ...formData, notifications: { ...formData.notifications!, email: c } })} disabled={!isEditing} />
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded text-green-600"><Settings className="h-4 w-4" /></div>
                                        <div>
                                            <p className="font-medium text-sm">SMS Bildirimleri</p>
                                            <p className="text-xs text-slate-500">Güvenlik ve acil durumlar için.</p>
                                        </div>
                                    </div>
                                    <Switch checked={formData.notifications?.sms} onCheckedChange={c => setFormData({ ...formData, notifications: { ...formData.notifications!, sms: c } })} disabled={!isEditing} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Olaylar</h3>
                                <div className="flex items-center justify-between py-2 border-b">
                                    <span>Analiz tamamlandığında haber ver</span>
                                    <Checkbox checked={formData.notifications?.analysisComplete} disabled={!isEditing} />
                                </div>
                                <div className="flex items-center justify-between py-2 border-b">
                                    <span>Kredi bakiyesi azaldığında uyar</span>
                                    <Checkbox defaultChecked disabled={!isEditing} />
                                </div>
                                <div className="flex items-center justify-between py-2 border-b">
                                    <span>Kampanya ve duyurulardan haberdar et</span>
                                    <Checkbox checked={formData.notifications?.marketing} disabled={!isEditing} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- BILLING & WALLET TAB --- */}
                <TabsContent value="billing" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="col-span-2 bg-[#1a1f2e] text-white border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5" /> Bakiye Durumu</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-between items-end">
                                <div>
                                    <p className="text-slate-400 text-sm">Toplam Kullanılabilir Kredi</p>
                                    <h2 className="text-5xl font-bold mt-2">{creditBalance}</h2>
                                </div>
                                <Button className="bg-[#860000] hover:bg-red-700 text-white">Kredi Yükle</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-slate-500">Otomatik Yükleme</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-semibold">{formData.autoReload ? 'Aktif' : 'Pasif'}</span>
                                    <Switch checked={formData.autoReload} onCheckedChange={(c) => setFormData({ ...formData, autoReload: c })} disabled={!isEditing} />
                                </div>
                                <p className="text-xs text-slate-500">Bakiye 5 kredinin altına düşünce otomatik yükleme yapar.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ödeme ve Kullanım Arşivi</CardTitle>
                            <CardDescription>Geçmiş işlemleriniz ve harcamalarınız.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tarih</TableHead>
                                        <TableHead>İşlem</TableHead>
                                        <TableHead>Tutar / Miktar</TableHead>
                                        <TableHead>Durum</TableHead>
                                        <TableHead className="text-right">Belge</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Mock Data */}
                                    <TableRow>
                                        <TableCell className="font-medium"><div className="flex items-center gap-2"><Clock className="h-3 w-3" /> 12 Ocak 2026</div></TableCell>
                                        <TableCell>Premium Kredi Paketi (100)</TableCell>
                                        <TableCell>₺450.00</TableCell>
                                        <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100">Başarılı</Badge></TableCell>
                                        <TableCell className="text-right"><Button variant="ghost" size="sm"><Download className="h-3 w-3" /></Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium"><div className="flex items-center gap-2"><Clock className="h-3 w-3" /> 10 Ocak 2026</div></TableCell>
                                        <TableCell>Analiz Harcaması (T-Test)</TableCell>
                                        <TableCell className="text-red-500">-2 Kredi</TableCell>
                                        <TableCell><Badge variant="outline">Kullanım</Badge></TableCell>
                                        <TableCell className="text-right">-</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium"><div className="flex items-center gap-2"><Clock className="h-3 w-3" /> 05 Ocak 2026</div></TableCell>
                                        <TableCell>Başlangıç Hediyesi</TableCell>
                                        <TableCell className="text-green-600">+10 Kredi</TableCell>
                                        <TableCell><Badge variant="outline">Sistem</Badge></TableCell>
                                        <TableCell className="text-right">-</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
