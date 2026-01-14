import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();

        // Webhook URL (Test veya Prod)
        const WEBHOOK_URL = process.env.N8N_USER_DATA_WEBHOOK || 'https://n8n.fokusistatistik.com/webhook-test/userdataupdate';

        // Prepare payload enriched with session data
        const payload = {
            ...data,
            user_email: session.user.email,
            user_id: (session.user as any).id,
            timestamp: new Date().toISOString(),
            source: 'dashboard_settings'
        };

        console.log('📤 Sending user update to n8n:', WEBHOOK_URL);

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.N8N_WEBHOOK_SECRET || ''}` // Opsiyonel
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error('❌ n8n webhook error:', response.status);
            return NextResponse.json({ error: 'Failed to update user data' }, { status: response.status });
        }

        const result = await response.json().catch(() => ({ success: true })); // JSON dönmezse de başarılı say

        return NextResponse.json(result);

    } catch (error) {
        console.error('🔥 Error updating user data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
