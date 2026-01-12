// Service for communicating with n8n backend
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const N8N_BASE_URL = 'https://n8n.fokusistatistik.com/webhook';

// Endpoints mapping
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENDPOINTS = {
    DIAGNOSTIC: '/data-diagnostic',
    ANALYSIS: '/analyze',
    AUTH: '/auth-check'
};

export interface AnalysisResult {
    p_value: number;
    effect_size: number;
    apa_text: string;
    test_type: string;
    summary: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visual_data?: any;
}

export const AnalysisService = {
    // Phase 1: Diagnostic (Data Health Check)
    checkDataHealth: async (): Promise<{ rows: number; cols: number; issues: string[] }> => {
        // Real implementation would send file info to n8n
        /*
        const response = await fetch(`${N8N_BASE_URL}${ENDPOINTS.DIAGNOSTIC}`, {
            method: 'POST',
            body: JSON.stringify({ ... })
        });
        return await response.json();
        */

        // Mock Response
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    rows: 150,
                    cols: 8,
                    issues: [
                        "⚠️ Column 'Age' has 2 outliers.",
                        "⚠️ Column 'BMI' is not normally distributed."
                    ]
                });
            }, 2000);
        });
    },

    // Phase 2: Analysis Execution
    triggerAnalysis: async (_testType: string): Promise<AnalysisResult> => {
        // Real implementation
        /*
        const response = await fetch(`${N8N_BASE_URL}${ENDPOINTS.ANALYSIS}`, {
             method: 'POST',
             body: JSON.stringify({ test_type: _testType })
        });
        return await response.json();
        */

        // Mock Response
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    p_value: 0.042,
                    effect_size: 0.65,
                    test_type: _testType,
                    summary: 'Significant difference found.',
                    apa_text: `A ${_testType} indicated that the difference was statistically significant, p = .042, d = 0.65.`,
                });
            }, 3000);
        });
    }
};
