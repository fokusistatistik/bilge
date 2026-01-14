'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
    const faqs = [
        {
            q: "Bilge hangi istatistiksel analizleri destekliyor?",
            a: "Temel olarak; Tanımlayıcı İstatistikler, Tek Grup ve Çok Grup Bağımsız Veri Analizleri (T-Tests, ANOVA, Mann-Whitney U, Kruskal-Wallis), Bağımlı Veri Analizleri (Paired T-test, Wilcoxon, Repeated ANOVA), Ki-Kare Testleri ve Korelasyon Analizlerini eksiksiz destekler. "
        },
        {
            q: "Veri temizleme yapılıyor mu?",
            a: "Evet. Veri setiniz yüklendiğinde otomatik 'Diagnose' modülü çalışır. Eksik veriler (missing values), uç değerler (outliers) ve hatalı veri tipleri tespit edilerek size raporlanır ve çözüm önerileri sunulur."
        },
        {
            q: "Sonuçlar için yorum yapılıyor mu?",
            a: "Kesinlikle. Oluşturulan her tablo ve grafik için APA standartlarına uygun, bilimsel bir açıklama metni yazılır. p değerinin anlamı, etki büyüklüğü ve hipotezin durumu detaylıca açıklanır."
        },
        {
            q: "Kredi sistemi nasıl çalışır?",
            a: "Bilge, bütçe dostu 'Kullandıkça Öde' modelini kullanır. Sabit yüksek aylık ücretler yerine, sadece yaptığınız analiz ve sorgu kadar kredi harcarsınız. Başlangıçta size hediye kredi tanımlanır."
        },
        {
            q: "Ödeme nasıl yapılır?",
            a: "Güvenli ödeme altyapısı iyzico ile tüm kredi kartlarıyla ödeme yapabilir veya Havale/EFT yöntemini tercih edebilirsiniz. Kurumsal fatura seçeneğimiz mevcuttur."
        },
        {
            q: "Mobil cihazlarda kullanabilir miyim?",
            a: "Evet, Bilge %100 mobil uyumludur. Telefon veya tabletinizden laboratuvara bağlanabilir, veri yükleyebilir, analiz süreçlerini yönetebilir ve raporlarınızı görüntüleyebilirsiniz."
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 relative" id="faq">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                        Sıkça Sorulan Sorular
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Merak edilenler ve platform hakkında detaylar.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                            <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-slate-100">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
