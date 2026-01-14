'use client';

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, CreditCard, Shield, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    const { data: session } = useSession();

    return (
        <div className="flex-1 space-y-8 p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-[#860000]">Ayarlar</h2>
                    <p className="text-muted-foreground">
                        Profilinizi, aboneliğinizi ve tercihlerinizi yönetin.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="subscription">Abonelik & Krediler</TabsTrigger>
                    {/* <TabsTrigger value="notifications">Bildirimler</TabsTrigger> */}
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kişisel Bilgiler</CardTitle>
                            <CardDescription>
                                Google hesabınızdan alınan temel bilgiler.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24 border-4 border-slate-100 dark:border-slate-800">
                                    <AvatarImage src={session?.user?.image || ''} />
                                    <AvatarFallback className="text-2xl"><User /></AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-semibold">{session?.user?.name}</h3>
                                    <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500/15 text-green-700 hover:bg-green-500/25">
                                            Google ile Doğrulandı
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Ad Soyad</Label>
                                    <div className="relative">
                                        <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="name" value={session?.user?.name || ''} disabled className="pl-8" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" value={session?.user?.email || ''} disabled className="pl-8" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-red-200 dark:border-red-900/50">
                        <CardHeader>
                            <CardTitle className="text-red-600">Tehlikeli Bölge</CardTitle>
                            <CardDescription>
                                Hesabınızı ve tüm verilerinizi kalıcı olarak silin.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-center border-t bg-red-50/50 dark:bg-red-900/10 p-4">
                            <p className="text-sm text-muted-foreground">
                                Bu işlem geri alınamaz. Tüm projeleriniz silinecektir.
                            </p>
                            <Button variant="destructive">Hesabı Sil</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Subscription Tab */}
                <TabsContent value="subscription" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mevcut Plan</CardTitle>
                            <CardDescription>
                                Ücretsiz plandasınız. Daha fazla özellik için yükseltin.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full">
                                        <Shield className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Free Plan</p>
                                        <p className="text-sm text-muted-foreground">Temel analiz özellikleri</p>
                                    </div>
                                </div>
                                <Button variant="outline" disabled>Aktif</Button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Kalan Krediler</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">10</div>
                                        <p className="text-xs text-muted-foreground">Her ay yenilenir</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Proje Limiti</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">3</div>
                                        <p className="text-xs text-muted-foreground">Maksimum aktif proje</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Dosya Boyutu</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">5 MB</div>
                                        <p className="text-xs text-muted-foreground">Dosya başına limit</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-[#860000] hover:bg-[#660000]">Pro Plana Yükselt (Çok Yakında)</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
