import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Helper function to send data to n8n webhook
async function sendToN8nWebhook(data: any) {
    const webhookUrl = process.env.N8N_AUTH_WEBHOOK;

    if (!webhookUrl) {
        console.warn('N8N_AUTH_WEBHOOK not configured');
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error('n8n webhook error:', response.statusText);
        } else {
            console.log('✅ Successfully sent to n8n webhook:', data.event);
        }
    } catch (error) {
        console.error('❌ Failed to send to n8n webhook:', error);
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Demo authentication
                if (credentials?.email === "demo@bilge.com" && credentials?.password === "demo123") {
                    return {
                        id: "demo-user-001",
                        name: "Demo User",
                        email: "demo@bilge.com",
                        image: null,
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // Send OAuth data to n8n for token exchange
            if (account?.provider === 'google' && account.code) {
                await sendToN8nWebhook({
                    event: 'google_oauth_callback',
                    timestamp: new Date().toISOString(),
                    oauth: {
                        code: account.code,
                        client_id: process.env.GOOGLE_CLIENT_ID,
                        client_secret: process.env.GOOGLE_CLIENT_SECRET,
                        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
                        grant_type: 'authorization_code'
                    },
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    },
                    // @ts-ignore
                    profile: {
                        email_verified: profile?.email_verified,
                        // @ts-ignore
                        locale: profile?.locale,
                    }
                });
            }

            // Send regular sign in event
            await sendToN8nWebhook({
                event: account?.provider === 'google' ? 'user_signup_google' : 'user_signin',
                timestamp: new Date().toISOString(),
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                },
                provider: account?.provider || 'credentials',
                metadata: {
                    loginMethod: account?.provider || 'demo',
                    environment: process.env.NODE_ENV || 'development',
                }
            });

            return true;
        },
        async jwt({ token, user, account, trigger }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }

            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }

            // Send session update to n8n if needed
            if (trigger === 'update') {
                await sendToN8nWebhook({
                    event: 'session_update',
                    timestamp: new Date().toISOString(),
                    user: {
                        id: token.id,
                        email: token.email,
                        name: token.name,
                    }
                });
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.image as string | null;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Redirect to dashboard after login
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            return baseUrl + '/dashboard';
        }
    },
    events: {
        async signOut({ token }) {
            // Send sign out event to n8n
            await sendToN8nWebhook({
                event: 'user_signout',
                timestamp: new Date().toISOString(),
                user: {
                    id: token.id,
                    email: token.email,
                }
            });
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
};
