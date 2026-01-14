'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export type LegalDocType = 'privacy' | 'kvkk' | 'terms' | null;

interface LegalModalsProps {
    openType: LegalDocType;
    onOpenChange: (open: boolean) => void;
}

export function LegalModals({ openType, onOpenChange }: LegalModalsProps) {
    const getContent = () => {
        switch (openType) {
            case 'privacy':
                return {
                    title: "Gizlilik Politikası",
                    content: (
                        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                            <p><strong>Son Güncelleme: 14 Ocak 2026</strong></p>
                            <p>Bilge ("Platform") olarak, gizliliğinize önem veriyoruz. Bu Gizlilik Politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.</p>

                            <h4 className="font-bold text-slate-900 dark:text-white mt-4">1. Toplanan Veriler</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Kimlik Bilgileri: Ad, soyad, e-posta adresi, akademik unvan.</li>
                                <li>İşlem Güvenliği Bilgileri: IP adresi, log kayıtları.</li>
                                <li>Kullanım Verileri: Yüklediğiniz anonim veri setleri ve analiz tercihleri.</li>
                            </ul>

                            <h4 className="font-bold text-slate-900 dark:text-white mt-4">2. Verilerin Kullanımı</h4>
                            <p>Toplanan veriler, hizmet kalitesinin artırılması, analiz raporlarının oluşturulması ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır. Verileriniz üçüncü taraflarla reklam amacıyla asla paylaşılmaz.</p>

                            <h4 className="font-bold text-slate-900 dark:text-white mt-4">3. Veri Güvenliği</h4>
                            <p>Tüm verileriniz SSL şifreleme ile korunmakta ve güvenli sunucularda saklanmaktadır. Veri setleriniz analiz tamamlandıktan sonra belirli bir süre içinde otomatik olarak silinebilir.</p>
                        </div>
                    )
                };
            case 'kvkk':
                return {
                    title: "KVKK Aydınlatma Metni",
                    content: (
                        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                            <p><strong>Veri Sorumlusu:</strong> Bilge Analiz Platformu</p>
                            <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz aşağıda açıklanan kapsamda işlenebilecektir.</p>

                            <h4 className="font-bold text-slate-900 dark:text-white mt-4">1. İşleme Amaçları</h4>
                            <p>Kişisel verileriniz, üyelik işlemlerinin gerçekleştirilmesi, platform hizmetlerinden faydalanmanızın sağlanması ve hukuki güvenliğin tesisi amacıyla işlenir.</p>

                            <h4 className="font-bold text-slate-900 dark:text-white mt-4">2. Veri Sahibinin Hakları</h4>
                            <p>KVKK'nın 11. maddesi uyarınca veri sahipleri; verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme, düzeltilmesini veya silinmesini talep etme haklarına sahiptir.</p>

                            <p>Taleplerinizi info@bilge.com adresine iletebilirsiniz.</p>
                        </div>
                    )
                };
            case 'terms':
                return {
                    title: "Kullanım Koşulları",
                    content: (
                        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                            <p>Lütfen platformu kullanmadan önce bu koşulları dikkatlice okuyunuz.</p>

                            <h4 className="font-bold text-slate-900 dark:text-white mt-4">1. Hizmetin Tanımı</h4>
                            <p>Bilge, akademik veri analizi için yardımcı araçlar sunan bir yazılımdır. Platform tarafından sunulan sonuçlar "tavsiye" niteliğindedir ve nihai bilimsel doğruluk kullanıcı sorumluluğundadır.</p>

                            <h4 className="font-bold text-slate-900 dark:text-white mt-4">2. Hesap Güvenliği</h4>
                            <p>Kullanıcı, hesap bilgilerinin gizliliğinden sorumludur. Şüpheli işlem durumunda derhal platform yönetimine bilgi verilmelidir.</p>

                            <h4 className="font-bold text-slate-900 dark:text-white mt-4">3. Fikri Mülkiyet</h4>
                            <p>Platform üzerindeki tüm yazılım, tasarım ve içerik hakları Bilge'ye aittir. İzinsiz kopyalanamaz veya ticari amaçla kullanılamaz.</p>
                        </div>
                    )
                };
            default:
                return { title: "", content: null };
        }
    };

    const { title, content } = getContent();

    return (
        <Dialog open={!!openType} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-6 overflow-hidden">
                <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold text-[#860000]">{title}</DialogTitle>
                    <DialogDescription>
                        Aşağıdaki metni dikkatlice inceleyiniz.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 pr-4 -mr-4">
                    <div className="py-4">
                        {content}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
