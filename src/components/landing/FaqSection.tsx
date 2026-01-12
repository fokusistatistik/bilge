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
            q: "Bilge nedir?",
            a: "Bilge, akademik çalışmalar ve araştırmalar için geliştirilen, yapay zeka destekli profesyonel bir istatistik analiz platformudur. Karmaşık yazılımlara ihtiyaç duymadan, R tabanlı güvenilir motoru ile akademik standartlarda analiz raporları üretir."
        },
        {
            q: "Analiz sonuçları akademik yayınlarda kullanılabilir mi?",
            a: "Evet. Tüm analizler APA (American Psychological Association) 7. sürüm formatına uygun olarak tablolaştırılır ve raporlanır. Dünyanın en saygın dergileri tarafından kabul gören R istatistik altyapısını kullanırız."
        },
        {
            q: "Verilerim güvende mi?",
            a: "Kesinlikle. Verileriniz SSL/TLS şifreleme ile transfer edilir, KVKK ve GDPR uyumlu sunucularda saklanır. Analiz işleminiz bittikten sonra verilerinizi kalıcı olarak silebilirsiniz. Fokus İstatistik güvencesi altındasınız."
        },
        {
            q: "Hangi analizleri yapabilirim?",
            a: "T-Testleri, ANOVA (Tek/Çift Yönlü, Tekrarlı), Regresyon Analizleri, Ki-Kare, Korelasyon (Pearson/Spearman), Mann-Whitney U, Kruskal-Wallis ve daha birçok parametrik/non-parametrik testi destekleriz."
        },
        {
            q: "Raporları hangi dilde alabilirim?",
            a: "Raporlarınızı tek tıkla hem Türkçe hem de İngilizce olarak oluşturabilirsiniz. Özellikle uluslararası yayın hazırlayan araştırmacılar için İngilizce raporlama modülümüz mevcuttur."
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800" id="faq">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                        Sıkça Sorulan Sorular
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Aklınıza takılan soruların cevapları burada.
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
