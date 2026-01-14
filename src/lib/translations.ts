export const translations = {
    tr: {
        nav: {
            home: "Anasayfa",
            about: "Hakkımızda",
            features: "Özellikler",
            howItWorks: "Nasıl Çalışır",
            pricing: "Fiyatlandırma",
            faq: "SSS",
            login: "Giriş Yap",
            dashboard: "Panele Git",
            tryNow: "Hemen Dene"
        },
        hero: {
            badge: "Bilimsel İstatistik ve Literatür Geliştirme Enstrümanı",
            title: "Verilerinizi Bilimsel Kanıta Dönüştürün",
            description: "Akademik çalışmalarınızı daha ileriye taşımak için kapsamlı istatistiksel analizler ve profesyonel raporlama. Python tabanlı LLM ve AI destekli altyapı.",
            ctaPrimary: "Şimdi Analize Başla",
            ctaSecondary: "Fiyatlandırmayı Gör",
            aiConsultant: "AI Destekli Danışmanlık",
            scientific: "Etik ve Bilimsel",
            expert: "Gerçek Uzman Desteği"
        },
        dashboard: {
            noProject: "Hiçbir Proje Seçili Değil",
            selectProject: "Analiz ve sohbet özelliğini kullanabilmek için lütfen mevcut bir projeyi seçin veya yeni bir proje oluşturun.",
            newProject: "Yeni Proje",
            active: "Aktif",
            reports: "Raporlar",
            files: "Yüklenenler",
            outputs: "Oluşturulanlar",
            addFile: "Dosya Ekle",
            placeholder: "Bilge'ye bir soru sorun veya analiz isteyin...",
            usedCredits: "Harcanan Kredi"
        },
        chatbot: {
            welcome: "Merhaba! Ben Bilge Asistan. Bilimsel analiz süreçlerinizde size rehberlik etmek için buradayım.",
            systemPrompt: "You are Bilge, an advanced academic statistics assistant. Responses must be in user's preferred language."
        }
    },
    en: {
        nav: {
            home: "Home",
            about: "About Us",
            features: "Features",
            howItWorks: "How It Works",
            pricing: "Pricing",
            faq: "FAQ",
            login: "Login",
            dashboard: "Go to Dashboard",
            tryNow: "Try Now"
        },
        hero: {
            badge: "Scientific Statistics and Literature Development Instrument",
            title: "Transform Data into Scientific Evidence",
            description: "Comprehensive statistical analysis and professional reporting to advance your academic studies. Python-based LLM and AI-powered infrastructure.",
            ctaPrimary: "Start Analysis Now",
            ctaSecondary: "View Pricing",
            aiConsultant: "AI Powered Consulting",
            scientific: "Ethical & Scientific",
            expert: "Real Expert Support"
        },
        dashboard: {
            noProject: "No Project Selected",
            selectProject: "Please select an existing project or create a new one to use the analysis and chat features.",
            newProject: "New Project",
            active: "Active",
            reports: "Reports",
            files: "Uploaded",
            outputs: "Generated",
            addFile: "Add File",
            placeholder: "Ask Bilge a question or request an analysis...",
            usedCredits: "Used Credits"
        },
        chatbot: {
            welcome: "Hello! I am Bilge Assistant. I am here to guide you through your scientific analysis processes.",
            systemPrompt: "You are Bilge, an advanced academic statistics assistant. Responses must be in English."
        }
    }
};

export type Language = 'tr' | 'en';
export type TranslationKey = keyof typeof translations.tr;
