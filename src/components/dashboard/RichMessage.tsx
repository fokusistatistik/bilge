'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface RichMessageProps {
    content: string;
    className?: string;
}

export function RichMessage({ content, className = '' }: RichMessageProps) {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Code blocks
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeString = String(children).replace(/\n$/, '');

                        return !inline && match ? (
                            <div className="relative group">
                                <button
                                    onClick={() => copyToClipboard(codeString)}
                                    className="absolute top-2 right-2 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Copy code"
                                >
                                    {copiedCode === codeString ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </button>
                                <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-lg !mt-0"
                                    {...props}
                                >
                                    {codeString}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-sm font-mono" {...props}>
                                {children}
                            </code>
                        );
                    },
                    // Tables
                    table({ children }) {
                        return (
                            <div className="overflow-x-auto my-4">
                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
                                    {children}
                                </table>
                            </div>
                        );
                    },
                    thead({ children }) {
                        return (
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                {children}
                            </thead>
                        );
                    },
                    th({ children }) {
                        return (
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                {children}
                            </th>
                        );
                    },
                    td({ children }) {
                        return (
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
                                {children}
                            </td>
                        );
                    },
                    // Links
                    a({ href, children }) {
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline"
                            >
                                {children}
                            </a>
                        );
                    },
                    // Lists
                    ul({ children }) {
                        return (
                            <ul className="list-disc list-inside space-y-1 my-2">
                                {children}
                            </ul>
                        );
                    },
                    ol({ children }) {
                        return (
                            <ol className="list-decimal list-inside space-y-1 my-2">
                                {children}
                            </ol>
                        );
                    },
                    // Blockquotes
                    blockquote({ children }) {
                        return (
                            <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-r-lg">
                                {children}
                            </blockquote>
                        );
                    },
                    // Headings
                    h1({ children }) {
                        return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>;
                    },
                    h2({ children }) {
                        return <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>;
                    },
                    h3({ children }) {
                        return <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>;
                    },
                    // Paragraphs
                    p({ children }) {
                        return <p className="my-2 leading-relaxed">{children}</p>;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

// Example usage component
export function RichMessageExample() {
    const exampleContent = `
# Analiz Sonuçları

Verileriniz başarıyla analiz edildi. İşte bulgular:

## Tanımlayıcı İstatistikler

| Değişken | Ortalama | Std. Sapma | Min | Max |
|----------|----------|------------|-----|-----|
| Yaş      | 35.2     | 8.4        | 18  | 65  |
| Puan     | 78.5     | 12.3       | 45  | 100 |

## Hipotez Testi

**Bağımsız Örneklem t-Testi** sonuçlarına göre:

- t(98) = 3.45, p < .001
- Cohen's d = 0.68 (orta etki büyüklüğü)

> **Yorum:** Gruplar arasında istatistiksel olarak anlamlı bir fark bulunmuştur.

### Python Kodu

\`\`\`python
import pandas as pd
import scipy.stats as stats

# Veri yükleme
df = pd.read_excel('data.xlsx')

# T-test
t_stat, p_value = stats.ttest_ind(df['grup1'], df['grup2'])
print(f"t = {t_stat:.2f}, p = {p_value:.3f}")
\`\`\`

### Sonraki Adımlar

1. Varsayımları kontrol edin
2. Etki büyüklüğünü hesaplayın
3. APA formatında rapor oluşturun

Daha fazla bilgi için [dokümantasyona](https://bilge.fokusistatistik.com/docs) bakabilirsiniz.
`;

    return (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <RichMessage content={exampleContent} />
        </div>
    );
}
