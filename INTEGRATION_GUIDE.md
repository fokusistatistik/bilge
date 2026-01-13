# Chat Interface Entegrasyon Rehberi

## RichMessage Kullanımı

ChatInterface.tsx'de AI mesajlarını göstermek için:

```tsx
import { RichMessage } from '@/components/dashboard/RichMessage';
import { TypingIndicatorWithAvatar } from '@/components/dashboard/TypingIndicator';

// Message rendering
{message.role === 'assistant' && (
  <RichMessage content={message.content} />
)}

// Typing indicator
{isTyping && <TypingIndicatorWithAvatar />}
```

## FileUploadProgress Kullanımı

Proje sayfasında veya chat'te:

```tsx
import { FileUploadProgress } from '@/components/dashboard/FileUploadProgress';

<FileUploadProgress
  onFileAccepted={(file) => {
    // Parse file
    // Show FilePreview
  }}
  onFileRejected={(error) => {
    showError('Dosya Yüklenemedi', error);
  }}
  maxSize={10}
  acceptedFormats={['.xlsx', '.xls', '.csv']}
/>
```

## FilePreview Kullanımı

Dosya yüklendikten sonra:

```tsx
import { FilePreview } from '@/components/dashboard/FilePreview';

const [showPreview, setShowPreview] = useState(false);
const [fileData, setFileData] = useState(null);

// After file upload
<FilePreview
  fileName={file.name}
  fileSize={file.size}
  rowCount={parsedData.length}
  columnCount={columns.length}
  columns={analyzedColumns}
  previewData={parsedData.slice(0, 10)}
  onConfirm={() => {
    // Proceed with analysis
    setShowPreview(false);
  }}
  onCancel={() => {
    setShowPreview(false);
  }}
/>
```

## Toast Notifications Kullanımı

Root layout'a provider ekle:

```tsx
// app/layout.tsx
import { ToastProvider } from '@/components/ui/toast';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

Component'lerde kullanım:

```tsx
import { useToast } from '@/components/ui/toast';

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleSuccess = () => {
    showSuccess('İşlem Başarılı', 'Dosyanız başarıyla yüklendi');
  };

  const handleError = () => {
    showError('Hata Oluştu', 'Dosya yüklenirken bir hata oluştu');
  };

  const handleWarning = () => {
    showWarning('Uyarı', 'Bazı sütunlarda eksik veri var');
  };

  const handleInfo = () => {
    showInfo('Bilgi', 'Analiz işlemi başlatıldı');
  };
}
```

## Form Error Kullanımı

```tsx
import { FormError } from '@/components/ui/toast';

<form>
  <input {...register('email')} />
  <FormError message={errors.email?.message} />
</form>
```

## API Error Kullanımı

```tsx
import { ApiError } from '@/components/ui/toast';

{error && (
  <ApiError
    error={error}
    onRetry={() => refetch()}
  />
)}
```

## Empty State Kullanımı

```tsx
import { EmptyState } from '@/components/ui/toast';
import { FileSpreadsheet } from 'lucide-react';

{projects.length === 0 && (
  <EmptyState
    icon={<FileSpreadsheet className="h-8 w-8 text-slate-400" />}
    title="Henüz Proje Yok"
    description="Başlamak için ilk projenizi oluşturun"
    action={{
      label: 'Yeni Proje Oluştur',
      onClick: () => router.push('/new-project')
    }}
  />
)}
```

## Tam Entegrasyon Örneği

```tsx
'use client';

import { useState } from 'react';
import { FileUploadProgress } from '@/components/dashboard/FileUploadProgress';
import { FilePreview } from '@/components/dashboard/FilePreview';
import { useToast } from '@/components/ui/toast';

export function DataUploadFlow() {
  const [step, setStep] = useState<'upload' | 'preview' | 'done'>('upload');
  const [fileData, setFileData] = useState(null);
  const { showSuccess, showError } = useToast();

  const handleFileAccepted = async (file: File) => {
    try {
      // Parse file
      const parsed = await parseFile(file);
      setFileData(parsed);
      setStep('preview');
    } catch (error) {
      showError('Dosya İşlenemedi', error.message);
    }
  };

  const handlePreviewConfirm = () => {
    showSuccess('Veri Hazır', 'Analiz için hazır');
    setStep('done');
  };

  return (
    <div>
      {step === 'upload' && (
        <FileUploadProgress
          onFileAccepted={handleFileAccepted}
          onFileRejected={(error) => showError('Hata', error)}
        />
      )}

      {step === 'preview' && fileData && (
        <FilePreview
          {...fileData}
          onConfirm={handlePreviewConfirm}
          onCancel={() => setStep('upload')}
        />
      )}

      {step === 'done' && (
        <div>Ready for analysis!</div>
      )}
    </div>
  );
}
```

## Markdown İçerik Örnekleri

AI response'larda kullanılabilecek markdown formatları:

```markdown
# Analiz Sonuçları

## Tanımlayıcı İstatistikler

| Değişken | Ortalama | Std. Sapma |
|----------|----------|------------|
| Yaş      | 35.2     | 8.4        |
| Puan     | 78.5     | 12.3       |

## Kod Örneği

\`\`\`python
import pandas as pd
df = pd.read_excel('data.xlsx')
print(df.describe())
\`\`\`

## Önemli Not

> Gruplar arasında istatistiksel olarak anlamlı bir fark bulunmuştur (p < .05).

## Sonraki Adımlar

1. Varsayımları kontrol edin
2. Etki büyüklüğünü hesaplayın
3. Rapor oluşturun
```
