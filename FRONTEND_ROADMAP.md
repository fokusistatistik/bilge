# BİLGE Platform - Frontend & UI Geliştirme Yol Haritası

## 🎨 Frontend Odaklı Geliştirme Stratejisi

> **Not:** Backend ikinci planda. Önce kullanıcı deneyimini mükemmelleştiriyoruz, mock data ile çalışıyoruz.

---

## 📊 Mevcut Frontend Durumu

### ✅ Tamamlanan Sayfalar
- Landing Page (Hero, Features, Pricing, Comparison, FAQ, Footer)
- Login/Register sayfası
- Dashboard layout (Sidebar, Header, Main Area)
- Chat Interface (temel yapı)
- User Settings
- Projects Page (liste görünümü)

### ⚠️ İyileştirme Gereken Alanlar
- Responsive design (mobil optimizasyon)
- Animasyonlar ve transitions
- Loading states
- Error handling UI
- Empty states
- Accessibility (a11y)

---

## 🎯 Frontend Geliştirme Fazları

### **Faz 1: Landing Page Mükemmelleştirme (1 Hafta)**
**Öncelik: ⭐⭐⭐⭐⭐**

#### 1.1 Hero Section İyileştirmeleri
**Hedef:** İlk 3 saniyede kullanıcıyı etkilemek

**Aksiyonlar:**
- [ ] **Animated Hero Background**
  - Gradient animation
  - Floating particles effect
  - Subtle parallax scrolling
  
- [ ] **CTA Button Animations**
  - Hover effects (scale, glow)
  - Ripple effect on click
  - Micro-interactions
  
- [ ] **Demo Video/GIF**
  - Platform kullanımını gösteren 30sn video
  - Autoplay, muted, loop
  - Lightbox modal ile büyütme

- [ ] **Social Proof**
  - Kullanıcı sayısı counter animation
  - Üniversite logoları slider
  - Testimonials carousel

**Kod Örneği:**
```tsx
// Animated counter component
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <CountUp end={5000} duration={2} suffix="+" />
  <p>Aktif Araştırmacı</p>
</motion.div>
```

#### 1.2 Features Section Geliştirme
**Aksiyonlar:**
- [ ] **Interactive Feature Cards**
  - Hover'da detay göster
  - Click'te modal açılsın (detaylı açıklama)
  - Icon animasyonları
  
- [ ] **Feature Comparison Table**
  - Bilge vs Geleneksel yöntemler
  - Animasyonlu checkmark'lar
  - Tooltip'ler ile açıklamalar

- [ ] **Use Case Scenarios**
  - "Tez yazıyorum" → Önerilen workflow
  - "Makale hazırlıyorum" → Önerilen workflow
  - "Veri analizi öğreniyorum" → Önerilen workflow

#### 1.3 Pricing Section İyileştirme
**Aksiyonlar:**
- [ ] **Interactive Pricing Calculator**
  - Slider ile analiz sayısı seç
  - Gerçek zamanlı fiyat hesaplama
  - Tasarruf miktarını göster
  
- [ ] **Plan Comparison Modal**
  - Detaylı özellik karşılaştırması
  - "Bana en uygun plan hangisi?" quiz
  
- [ ] **FAQ Accordion**
  - Fiyatlandırma ile ilgili SSS
  - Smooth expand/collapse animasyonları

#### 1.4 Trust & Credibility
**Aksiyonlar:**
- [ ] **Testimonials Section**
  - Gerçek kullanıcı yorumları (mock data)
  - Fotoğraf + isim + üniversite
  - 5 yıldız rating sistemi
  - Carousel ile kaydırma
  
- [ ] **Case Studies**
  - "Dr. X, tezini 3 ayda tamamladı"
  - Before/After senaryoları
  - Detaylı success stories

- [ ] **Trust Badges**
  - "KVKK Uyumlu"
  - "ISO 27001 Sertifikalı" (gelecek için)
  - "Üniversiteler tarafından kullanılıyor"

---

### **Faz 2: Dashboard & Chat Interface (1.5 Hafta)**
**Öncelik: ⭐⭐⭐⭐⭐**

#### 2.1 Dashboard Home Page
**Hedef:** Kullanıcı login olunca ne yapacağını hemen anlasın

**Aksiyonlar:**
- [ ] **Welcome Screen (İlk Giriş)**
  - Animated welcome message
  - Quick start guide (3 adım)
  - Sample project oluşturma butonu
  
- [ ] **Dashboard Overview**
  - Kredi bakiyesi (büyük, görünür)
  - Son projeler (card view)
  - Hızlı aksiyonlar (Yeni Proje, Dosya Yükle, Analiz Başlat)
  - Activity feed (son aktiviteler)

- [ ] **Statistics Cards**
  - Toplam analiz sayısı
  - Bu ay yapılan analizler
  - Kullanılan kredi
  - Kaydedilen zaman (vs geleneksel yöntem)

**Tasarım:**
```
┌─────────────────────────────────────────────────┐
│  Hoş Geldiniz, [İsim]! 👋                       │
│  Kredi: 150 ⚡                                   │
├─────────────────────────────────────────────────┤
│  [Yeni Proje]  [Dosya Yükle]  [Analiz Başlat]  │
├─────────────────────────────────────────────────┤
│  Son Projeler                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │Proje1│ │Proje2│ │Proje3│                    │
│  └──────┘ └──────┘ └──────┘                    │
├─────────────────────────────────────────────────┤
│  İstatistikler                                  │
│  📊 15 Analiz  ⏱️ 45 Saat Tasarruf             │
└─────────────────────────────────────────────────┘
```

#### 2.2 Chat Interface İyileştirmeleri
**Aksiyonlar:**
- [ ] **Message Types**
  - User message (sağda, mavi)
  - AI response (solda, gri)
  - System message (ortada, küçük)
  - File attachment (preview ile)
  - Analysis result (özel widget)
  
- [ ] **Typing Indicator**
  - "Bilge yazıyor..." animasyonu
  - 3 nokta bounce effect
  
- [ ] **Message Actions**
  - Copy to clipboard
  - Regenerate response
  - Thumbs up/down (feedback)
  - Share message
  
- [ ] **Quick Replies**
  - Önerilen sorular (chips)
  - "Analiz yap", "Rapor oluştur", "Yardım"
  
- [ ] **Rich Messages**
  - Markdown support (bold, italic, lists)
  - Code blocks (syntax highlighting)
  - Tables
  - Images

**Örnek Mesaj Akışı:**
```
User: "Verilerimi yükledim, ne yapmalıyım?"

AI: "Harika! 🎉 Verilerinizi inceledim. 
     İşte önerilerim:
     
     1️⃣ Önce tanımlayıcı istatistikler
     2️⃣ Normallik testi
     3️⃣ Uygun analiz seçimi
     
     Hangi adımla başlamak istersiniz?"
     
     [Tanımlayıcı İstatistik] [Normallik Testi]
```

#### 2.3 File Upload Experience
**Aksiyonlar:**
- [ ] **Drag & Drop Zone**
  - Büyük, görünür drop area
  - Hover'da highlight
  - Desteklenen formatlar göster (.xlsx, .csv)
  
- [ ] **Upload Progress**
  - Progress bar (0-100%)
  - File size ve upload speed
  - Cancel butonu
  
- [ ] **File Preview**
  - İlk 10 satır önizleme
  - Sütun isimleri
  - Veri tipi tespiti (automatic)
  - "Veri doğru görünüyor mu?" onay

- [ ] **Error Handling**
  - Desteklenmeyen format → Açıklayıcı hata
  - Dosya çok büyük → Limit bilgisi
  - Bozuk dosya → Düzeltme önerileri

#### 2.4 Analysis Widgets
**Aksiyonlar:**
- [ ] **Widget Tipleri**
  - Descriptive Stats Widget (tablo)
  - Chart Widget (grafik)
  - Test Result Widget (istatistiksel test)
  - Report Widget (APA formatında metin)
  
- [ ] **Widget Actions**
  - Expand/Collapse
  - Download (PNG, PDF, Excel)
  - Share
  - Add to report
  
- [ ] **Interactive Charts**
  - Zoom in/out
  - Pan
  - Tooltip on hover
  - Legend toggle

**Widget Örneği:**
```tsx
<AnalysisWidget type="t-test">
  <WidgetHeader>
    <Title>Independent Samples T-Test</Title>
    <Actions>
      <IconButton icon={Download} />
      <IconButton icon={Share} />
    </Actions>
  </WidgetHeader>
  <WidgetContent>
    <StatTable data={mockData} />
    <Chart type="boxplot" />
  </WidgetContent>
  <WidgetFooter>
    <Interpretation>
      Gruplar arasında anlamlı fark bulundu (p < .05)
    </Interpretation>
  </WidgetFooter>
</AnalysisWidget>
```

---

### **Faz 3: Projects & Data Management (1 Hafta)**
**Öncelik: ⭐⭐⭐⭐**

#### 3.1 Projects Page Redesign
**Aksiyonlar:**
- [ ] **View Options**
  - Grid view (cards)
  - List view (table)
  - Kanban view (status columns)
  
- [ ] **Filtering & Sorting**
  - Filter by: Status, Type, Date
  - Sort by: Name, Date, Credits Used
  - Search bar (fuzzy search)
  
- [ ] **Project Cards**
  - Thumbnail/Icon
  - Title + Description
  - Progress bar (% complete)
  - Last modified date
  - Quick actions (Edit, Delete, Duplicate)
  
- [ ] **Bulk Actions**
  - Select multiple projects
  - Bulk delete
  - Bulk export
  - Bulk tag

#### 3.2 Project Detail Page
**Aksiyonlar:**
- [ ] **Project Overview Tab**
  - Title, description, tags
  - Created date, last modified
  - Collaborators (future)
  - Status (Draft, In Progress, Completed)
  
- [ ] **Files Tab**
  - Uploaded files list
  - File preview
  - Version history
  - Download all (ZIP)
  
- [ ] **Analyses Tab**
  - All analyses run on this project
  - Timeline view
  - Re-run analysis
  - Compare analyses
  
- [ ] **Reports Tab**
  - Generated reports
  - APA format
  - Download (PDF, DOCX)
  - Share link

#### 3.3 Data Table Component
**Aksiyonlar:**
- [ ] **Interactive Table**
  - Sortable columns
  - Filterable columns
  - Resizable columns
  - Sticky header
  
- [ ] **Cell Editing**
  - Double-click to edit
  - Inline validation
  - Undo/Redo
  
- [ ] **Data Transformation**
  - Recode variables
  - Compute new variables
  - Filter rows
  - Select columns

---

### **Faz 4: User Experience & Micro-interactions (1 Hafta)**
**Öncelik: ⭐⭐⭐⭐**

#### 4.1 Loading States
**Aksiyonlar:**
- [ ] **Skeleton Screens**
  - Project cards loading
  - Chat messages loading
  - Table loading
  
- [ ] **Spinners & Progress Indicators**
  - Global loading (top bar)
  - Button loading states
  - Infinite scroll loading
  
- [ ] **Optimistic UI**
  - Mesaj gönderince hemen göster
  - Sonra backend'den confirm al

#### 4.2 Empty States
**Aksiyonlar:**
- [ ] **No Projects Yet**
  - Friendly illustration
  - "Başlamak için yeni proje oluştur"
  - Quick start button
  
- [ ] **No Files Uploaded**
  - "Dosya yükle" CTA
  - Desteklenen formatlar
  
- [ ] **No Analysis Results**
  - "İlk analizini başlat"
  - Örnek analizler

#### 4.3 Error States
**Aksiyonlar:**
- [ ] **Form Validation Errors**
  - Inline error messages
  - Field highlighting
  - Clear error descriptions
  
- [ ] **API Errors**
  - Toast notifications
  - Retry button
  - "Bir şeyler ters gitti" friendly message
  
- [ ] **404 Page**
  - Custom 404 design
  - "Ana sayfaya dön" button
  - Search bar

#### 4.4 Success States
**Aksiyonlar:**
- [ ] **Success Toasts**
  - "Proje oluşturuldu ✓"
  - "Dosya yüklendi ✓"
  - "Analiz tamamlandı ✓"
  
- [ ] **Confetti Animation**
  - İlk analiz tamamlandığında
  - Milestone'larda (10. analiz, vb.)
  
- [ ] **Progress Celebrations**
  - "İlk 10 analizi tamamladın! 🎉"
  - Achievement badges

#### 4.5 Animations & Transitions
**Aksiyonlar:**
- [ ] **Page Transitions**
  - Fade in/out
  - Slide transitions
  - Smooth navigation
  
- [ ] **Component Animations**
  - Modal enter/exit
  - Dropdown expand/collapse
  - Card hover effects
  
- [ ] **Micro-interactions**
  - Button ripple
  - Checkbox check animation
  - Toggle switch slide

---

### **Faz 5: Responsive & Mobile Optimization (1 Hafta)**
**Öncelik: ⭐⭐⭐⭐⭐**

#### 5.1 Mobile Navigation
**Aksiyonlar:**
- [ ] **Bottom Navigation**
  - Home, Projects, Chat, Profile
  - Active state indicators
  
- [ ] **Hamburger Menu**
  - Slide-in sidebar
  - Overlay backdrop
  
- [ ] **Mobile Header**
  - Compact logo
  - Essential actions only

#### 5.2 Touch Optimizations
**Aksiyonlar:**
- [ ] **Touch Targets**
  - Minimum 44x44px
  - Adequate spacing
  
- [ ] **Swipe Gestures**
  - Swipe to delete (projects)
  - Pull to refresh
  - Swipe between tabs
  
- [ ] **Mobile Forms**
  - Large input fields
  - Number keyboards for numeric inputs
  - Date pickers

#### 5.3 Responsive Layouts
**Aksiyonlar:**
- [ ] **Breakpoints**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
  
- [ ] **Responsive Grid**
  - 1 column (mobile)
  - 2 columns (tablet)
  - 3-4 columns (desktop)
  
- [ ] **Responsive Typography**
  - Fluid font sizes
  - Readable line lengths

---

### **Faz 6: Accessibility & Performance (1 Hafta)**
**Öncelik: ⭐⭐⭐⭐**

#### 6.1 Accessibility (a11y)
**Aksiyonlar:**
- [ ] **Keyboard Navigation**
  - Tab order
  - Focus indicators
  - Keyboard shortcuts
  
- [ ] **Screen Reader Support**
  - ARIA labels
  - Alt texts
  - Semantic HTML
  
- [ ] **Color Contrast**
  - WCAG AA compliance
  - High contrast mode
  
- [ ] **Focus Management**
  - Modal focus trap
  - Skip to content link

#### 6.2 Performance Optimization
**Aksiyonlar:**
- [ ] **Code Splitting**
  - Route-based splitting
  - Component lazy loading
  
- [ ] **Image Optimization**
  - Next.js Image component
  - WebP format
  - Lazy loading
  
- [ ] **Bundle Size**
  - Analyze bundle
  - Remove unused dependencies
  - Tree shaking

---

### **Faz 7: Advanced UI Components (1 Hafta)**
**Öncelik: ⭐⭐⭐**

#### 7.1 Data Visualization Library
**Aksiyonlar:**
- [ ] **Chart Components**
  - Bar Chart
  - Line Chart
  - Scatter Plot
  - Box Plot
  - Histogram
  - Heatmap
  
- [ ] **Chart Customization**
  - Color schemes
  - Axis labels
  - Legends
  - Annotations

#### 7.2 Advanced Modals
**Aksiyonlar:**
- [ ] **Multi-step Wizard**
  - Progress indicator
  - Back/Next navigation
  - Step validation
  
- [ ] **Confirmation Dialogs**
  - Delete confirmation
  - Unsaved changes warning
  
- [ ] **Full-screen Modals**
  - Report preview
  - Data editor

#### 7.3 Notification System
**Aksiyonlar:**
- [ ] **Toast Notifications**
  - Success, Error, Warning, Info
  - Auto-dismiss
  - Action buttons
  
- [ ] **Notification Center**
  - Bell icon with badge
  - Notification list
  - Mark as read
  
- [ ] **In-app Messages**
  - Announcement banners
  - Feature highlights

---

## 🗓️ Frontend Sprint Planı

### **Sprint 1 (Hafta 1): Landing Page**
- Hero section animations
- Features interactive cards
- Pricing calculator
- Testimonials carousel

### **Sprint 2 (Hafta 2): Dashboard & Chat**
- Dashboard home redesign
- Chat interface improvements
- File upload UX
- Analysis widgets

### **Sprint 3 (Hafta 3): Projects & Data**
- Projects page views
- Project detail page
- Data table component
- Filtering & sorting

### **Sprint 4 (Hafta 4): UX & States**
- Loading states
- Empty states
- Error handling
- Success animations

### **Sprint 5 (Hafta 5): Mobile & Responsive**
- Mobile navigation
- Touch optimizations
- Responsive layouts
- PWA enhancements

### **Sprint 6 (Hafta 6): Polish & Performance**
- Accessibility audit
- Performance optimization
- Advanced components
- Final polish

---

## 🎨 Design System

### Color Palette
```css
/* Primary */
--bilge-red: #860000;
--bilge-red-dark: #660000;

/* Neutrals */
--slate-50: #f8fafc;
--slate-900: #0f172a;

/* Semantic */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Typography
```css
/* Headings */
font-family: 'Inter', sans-serif;
font-weight: 700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;

/* Code */
font-family: 'Fira Code', monospace;
```

### Spacing Scale
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

### Border Radius
```
sm: 4px
md: 8px
lg: 12px
xl: 16px
2xl: 24px
full: 9999px
```

---

## 📊 Başarı Metrikleri (Frontend)

### Performance
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 500KB

### UX
- [ ] Mobile usability score > 95
- [ ] Accessibility score > 90
- [ ] User task completion rate > 80%

### Engagement
- [ ] Average session duration > 5 min
- [ ] Pages per session > 3
- [ ] Bounce rate < 40%

---

## 🛠️ Frontend Tooling

### UI Libraries
- **Radix UI** (headless components)
- **Framer Motion** (animations)
- **Recharts** (charts)
- **React Dropzone** (file upload)

### Utilities
- **clsx** (className management)
- **date-fns** (date formatting)
- **react-markdown** (markdown rendering)
- **react-syntax-highlighter** (code blocks)

### Development
- **Storybook** (component development)
- **Chromatic** (visual testing)
- **ESLint** (linting)
- **Prettier** (formatting)

---

## 🚀 Hızlı Başlangıç Checklist

### Bu Hafta:
- [ ] Landing page hero animasyonları
- [ ] Dashboard welcome screen
- [ ] Chat typing indicator
- [ ] File upload progress bar
- [ ] Loading skeletons

### Bu Ay:
- [ ] Tüm landing page iyileştirmeleri
- [ ] Dashboard & chat tam fonksiyonel
- [ ] Projects page redesign
- [ ] Mobile responsive

### 3 Ay:
- [ ] Tüm UI components polished
- [ ] Accessibility compliance
- [ ] Performance optimized
- [ ] User testing completed

---

**Hazırlayan:** Antigravity AI  
**Tarih:** 13 Ocak 2026  
**Versiyon:** 1.0 - Frontend Focus
