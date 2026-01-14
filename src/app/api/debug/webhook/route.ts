import { NextResponse } from 'next/server';

export async function GET() {
    const webhookUrl = process.env.N8N_SIGNUP_WEBHOOK;

    // Environment Check
    const envStatus = {
        N8N_SIGNUP_WEBHOOK: process.env.N8N_SIGNUP_WEBHOOK ? '✅ Configured' : '❌ Missing',
        N8N_SIGNIN_WEBHOOK: process.env.N8N_SIGNIN_WEBHOOK ? '✅ Configured' : '❌ Missing',
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✅ Configured' : '❌ Missing',
    };

    if (!webhookUrl) {
        return NextResponse.json({
            error: 'Webhook URL not configured',
            env: envStatus
        }, { status: 500 });
    }

    try {
        console.log('🧪 Testing Webhook Connection to:', webhookUrl);

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Bilge-Server-Debug/1.0'
            },
            body: JSON.stringify({
                event: 'debug_test_connection',
                timestamp: new Date().toISOString(),
                message: 'Bu bir test mesajıdır. Eğer bunu görüyorsanız sunucu n8n\'e erişebiliyor demektir.',
                env: process.env.NODE_ENV
            })
        });

        const responseText = await response.text();

        return NextResponse.json({
            success: response.ok,
            status: response.status,
            statusText: response.statusText,
            targetUrl: webhookUrl,
            n8nResponse: responseText.substring(0, 100), // First 100 chars
            env: envStatus
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Connection Failed',
            details: error.message,
            cause: error.cause,
            targetUrl: webhookUrl,
            env: envStatus
        }, { status: 500 });
    }
}
