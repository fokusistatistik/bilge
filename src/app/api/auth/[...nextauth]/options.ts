import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Retry Logic ile Güçlendirilmiş Webhook Göndericisi
async function sendToN8nWebhook(webhookType: 'signin' | 'signup' | 'signout', data: any, retries = 2) {
    const webhookUrls = {
        signin: process.env.N8N_SIGNIN_WEBHOOK || process.env.N8N_AUTH_WEBHOOK,
        signup: process.env.N8N_SIGNUP_WEBHOOK || process.env.N8N_AUTH_WEBHOOK, // Fallback for signup too
        signout: process.env.N8N_SIGNOUT_WEBHOOK,
    };

    const webhookUrl = webhookUrls[webhookType];

    if (!webhookUrl) {
        console.warn(`⚠️ N8N_${webhookType.toUpperCase()}_WEBHOOK tanımlı değil!`);
        return false;
    }

    const payload = {
        ...data,
        source: 'bilge-auth-system',
        timestamp: new Date().toISOString(),
    };

    for (let i = 0; i <= retries; i++) {
        try {
            console.log(`📡 Webhook Gönderiliyor (${webhookType}) - Deneme ${i + 1}/${retries + 1}`);

            // Timeout kontrolü (10 saniye)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

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
                console.log(`✅ Webhook Başarılı: ${webhookType}`);
                return true;
            } else {
                console.error(`❌ Webhook Hatası ${response.status}: ${response.statusText}`);
                const text = await response.text();
                console.error('Response:', text);
            }
        } catch (error) {
            console.error(`❌ Webhook Bağlantı Hatası (Deneme ${i + 1}):`, error);
        }

        // Retry bekleme süresi (1s, 2s)
        if (i < retries) await new Promise(res => setTimeout(res, 1000 * Math.pow(2, i)));
    }

    return false;
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
        error: '/login',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // Login'e izin ver, asıl işi 'events' kısmında yapacağız.
            return true;
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.id = user.id;
                token.provider = account.provider;

                // Account bilgilerini token'a kaydet ki events kısmında erişilebilsin
                token.rawAccount = account;
                token.rawProfile = user; // Profil resmi vs için user objesi daha güvenli
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.id as string;
                // @ts-ignore
                session.user.provider = token.provider as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/dashboard`;
        }
    },
    events: {
        // EN KRİTİK KISIM: Kullanıcı giriş yaptığında BURASI çalışır
        async signIn({ user, account, profile, isNewUser }) {
            console.log('🔔 SignIn Event Tetiklendi:', user.email);

            try {
                const hookData = {
                    event: 'google_oauth_login',
                    isNewUser: isNewUser, // NextAuth bunu otomatik algılar
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image
                    },
                    oauth: {
                        provider: 'google',
                        token_type: account?.token_type,
                        access_token: account?.access_token,
                        refresh_token: account?.refresh_token,
                        expires_at: account?.expires_at,
                        scope: account?.scope,
                        id_token: account?.id_token
                    },
                    metadata: {
                        env: process.env.NODE_ENV,
                    }
                };

                // Signup ve Signin için aynı payload'ı gönderelim, n8n ayırsın (veya isNewUser'a göre ayırabiliriz)
                // Daha garanti olması için her girişte SIGNUP webhook'unu dürtüyorum (update için)
                await sendToN8nWebhook('signup', hookData);

            } catch (err) {
                console.error('🔥 SignIn Event Hatası:', err);
            }
        },
        async signOut({ token }) {
            await sendToN8nWebhook('signout', {
                event: 'user_signout',
                user: { id: token.id, email: token.email }
            });
        }
    },
    debug: process.env.NODE_ENV !== 'production', // Prod'da logları kapatabiliriz ama debug için açık kalsın
    secret: process.env.NEXTAUTH_SECRET,
};
