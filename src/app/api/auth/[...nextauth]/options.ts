import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Webhook Response Type (Based on user provided JSON)
interface WebhookResponse {
    success: boolean;
    message?: string;
    user?: any;
    profile?: any;
    subscription?: any;
    settings?: any;
    statistics?: any;
    permissions?: any;
    onboarding?: any;
}

// Retry Logic ile Güçlendirilmiş Webhook Göndericisi
async function sendToN8nWebhook(webhookType: 'signin' | 'signup' | 'signout', data: any, retries = 2): Promise<{ success: boolean; data?: WebhookResponse; fallback?: boolean }> {
    const webhookUrls = {
        signin: process.env.N8N_SIGNIN_WEBHOOK || process.env.N8N_AUTH_WEBHOOK,
        signup: process.env.N8N_SIGNUP_WEBHOOK || process.env.N8N_AUTH_WEBHOOK,
        signout: process.env.N8N_SIGNOUT_WEBHOOK,
    };

    const webhookUrl = webhookUrls[webhookType];

    if (!webhookUrl) {
        console.warn(`⚠️ N8N_${webhookType.toUpperCase()}_WEBHOOK tanımlı değil!`);
        return { success: true }; // Webhook yoksa bloklama, devam et (Varsayılan davranış)
    }

    const payload = {
        ...data,
        source: 'bilge-auth-system',
        timestamp: new Date().toISOString(),
    };

    for (let i = 0; i <= retries; i++) {
        try {
            console.log(`📡 Webhook Gönderiliyor (${webhookType}) - Deneme ${i + 1}/${retries + 1}`);
            // Timeout kontrolü (4 saniye - Login'i çok bekletmemek ve Vercel limitlerine takılmamak için)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Bilge-Auth/2.0',
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const responseData = await response.json();
                console.log(`✅ Webhook Başarılı: ${webhookType}`);

                // Backend success: false dönerse (örn. banlı kullanıcı)
                if (responseData.success === false) {
                    console.error(`❌ Webhook Mantıksal Hata:`, responseData.message);
                    return { success: false, data: responseData };
                }

                return { success: true, data: responseData };
            } else {
                console.error(`❌ Webhook Hatası ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`❌ Webhook Bağlantı Hatası (Deneme ${i + 1}):`, error);
        }

        if (i < retries) await new Promise(res => setTimeout(res, 1000 * Math.pow(2, i)));
    }

    // Webhook erişilemezse veya timeout olursa LOGIN'e İZİN VER (Fallback Mode)
    console.warn("⚠️ Webhook erişilemedi, Fallback modu aktif.");
    return { success: false, fallback: true };
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                const hookData = {
                    event: 'google_oauth_signin',
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image
                    },
                    profile: profile, // RAW Google Data
                    oauth: {
                        provider: 'google',
                        token_type: account?.token_type,
                        access_token: account?.access_token,
                        refresh_token: account?.refresh_token,
                    }
                };

                const result = await sendToN8nWebhook('signin', hookData);

                // Eğer açıkça "success: false" döndüyse (örn. Banlı kullanıcı), engelle.
                // Ancak "fallback: true" döndüyse (webhook hatası), izin ver.
                if (!result.success && !result.fallback) {
                    console.error("⛔ Backend girişi açıkça reddetti:", result.data?.message);
                    return false;
                }

                // COOKIE NO-EXPLODE OPTİMİZASYONU (502 Fix) & AKILLI MERGE
                // Backend'den gelen veriyi al, ancak Google'dan gelen güncel resim/isim bilgisini koru.

                const defaultFallback = {
                    plan: 'free',
                    credits: 10, // Kullanıcı isteği: Varsayılan 10 kredi
                    creditsRemaining: 10,
                    isAdmin: false,
                    language: 'tr',
                    theme: 'light',
                    institution: '',
                    academicTitle: '',
                    country: 'TR',
                    notifications: { email: true, analysisComplete: true }
                };

                if (result.success && result.data) {
                    // Backend verisi var

                    // Resim Kontrolü: Backend dummy 'eb.png' dönerse, Google resmini (user.image) kullan.
                    let finalImage = user.image;
                    const backendImage = result.data.user?.profileImage || result.data.user?.image;
                    if (backendImage && !backendImage.includes('static.fokusistatistik.com/resimler/eb.png') && !backendImage.includes('{{')) {
                        finalImage = backendImage;
                    }

                    // @ts-ignore
                    user.backendData = {
                        plan: result.data.subscription?.plan || 'free',
                        credits: result.data.subscription?.credits ?? 10,
                        creditsRemaining: result.data.subscription?.creditsRemaining ?? 10,
                        isAdmin: result.data.permissions?.isAdmin || false,

                        institution: result.data.profile?.institution?.substring(0, 50) || '',
                        academicTitle: result.data.profile?.academicTitle || '',
                        country: result.data.profile?.country || 'TR',

                        language: result.data.settings?.language || 'tr',
                        theme: result.data.settings?.theme || 'light',
                        notifications: result.data.settings?.notifications || { email: true, analysisComplete: true },

                        // Resim bilgisini backendData içine de ekle ki session'da kullanabilelim
                        image: finalImage
                    };
                } else {
                    // FALLBACK MODU (Webhook Hatası):
                    // Kullanıcının istediği statik varsayılanlar
                    // @ts-ignore
                    user.backendData = {
                        ...defaultFallback,
                        image: user.image // Google resmini koru
                    };
                }

                return true;
            } catch (error) {
                console.error("SignIn Callback Exception (Fallback Active):", error);
                return true; // Hata olsa bile login'e izin ver (Esneklik)
            }
        },
        async jwt({ token, user, account }) {
            // İlk girişte (user ve account dolu gelir)
            if (user && account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.id = user.id;
                token.provider = account.provider;

                // SignIn callback'inden gelen backend verisini token'a işle
                // @ts-ignore
                if (user.backendData) {
                    // @ts-ignore
                    token.backendData = user.backendData;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.id as string;
                // @ts-ignore
                session.user.provider = token.provider as string;

                // Token'daki backend verilerini session'a yay
                // @ts-ignore
                if (token.backendData) {
                    // @ts-ignore
                    const bd = token.backendData;

                    // User objesini backend'den gelenle güncelle (imageUrl, name vs)
                    if (bd.user) {
                        session.user = { ...session.user, ...bd.user };
                    }

                    // Diğer alanları session root'una ekle (TypeScript kızabilir, module augmentation gerekebilir ama runtime'da çalışır)
                    // @ts-ignore
                    session.profile = bd.profile;
                    // @ts-ignore
                    session.subscription = bd.subscription;
                    // @ts-ignore
                    session.settings = bd.settings;
                    // @ts-ignore
                    session.permissions = bd.permissions;
                }
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/dashboard`;
        }
    },
    // Events kısmını sadeleştirebiliriz veya kaldırabiliriz çünkü artık signIn callback içinde işi hallediyoruz.
    // Ancak signOut için tutabiliriz.
    events: {
        async signOut({ token }) {
            const hookData = {
                event: 'user_signout',
                user: { email: token.email }
            };
            await sendToN8nWebhook('signout', hookData);
        }
    },
    debug: process.env.NODE_ENV !== 'production',
    secret: process.env.NEXTAUTH_SECRET,
};
