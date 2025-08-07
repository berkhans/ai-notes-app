<<<<<<< HEAD
# AI Notes App 📝

Bu proje React ve Node.js kullanarak yaptığım AI destekli not alma uygulaması. Kullanıcılar notlarını yazabilir ve AI ile özetleyip kategorize edebilir.

## Ne Yaptım?

### Frontend (React)
- **Login/Register** sayfaları - Material UI ile güzel tasarım
- **Dashboard** - Kullanıcının notlarını görebileceği ana sayfa
- **Notes** - Notları listeleme, arama ve filtreleme
- **Create/Edit Note** - Not oluşturma ve düzenleme
- **Profile** - Kullanıcı profil sayfası

### Backend (Node.js)
- **Express.js** ile API
- **MongoDB** veritabanı
- **JWT** ile authentication
- **OpenAI API** entegrasyonu

## 🛠️ Kullandığım Teknolojiler

### Frontend
- **React 18** - Ana framework
- **React Router** - Sayfa yönlendirme
- **Zustand** - State management (Redux yerine daha basit)
- **Material UI** - Hazır componentler
- **Framer Motion** - Animasyonlar
- **Tailwind CSS** - Styling
- **React Hook Form** - Form yönetimi
- **Axios** - API çağrıları

### Backend
- **Node.js** - Server
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB için ODM
- **JWT** - Token based auth
- **bcryptjs** - Şifre hashleme
- **OpenAI API** - AI işlemleri

## 🚀 Nasıl Çalıştırılır?

### 1. Backend'i Başlat
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend'i Başlat
```bash
cd frontend
npm install
npm start
```

### 3. MongoDB'yi Çalıştır
MongoDB'nin bilgisayarında kurulu olması gerekiyor.

### 4. Environment Variables
Backend klasöründe `.env` dosyası oluştur:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-notes-app
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-api-key
```

## 📱 Özellikler

### ✅ Yaptığım Şeyler
- [x] Kullanıcı kayıt/giriş
- [x] Not oluşturma/düzenleme/silme
- [x] AI ile not özetleme
- [x] Kategori ve etiket sistemi
- [x] Arama ve filtreleme
- [x] Responsive tasarım
- [x] Animasyonlar
- [x] Modern UI (Material UI)

### 🔄 Yapmak İstediğim Şeyler
- [ ] Dark/Light tema
- [ ] Not paylaşma
- [ ] Export/Import
- [ ] Daha fazla AI özelliği
- [ ] Mobile app

## 🎨 UI/UX Detayları

### Animasyonlar
Framer Motion kullandım:
- Sayfa geçişleri
- Kart hover efektleri
- Loading animasyonları
- Smooth transitions

### Responsive Design
- Mobile first yaklaşım
- Breakpoint'ler: 320px, 768px, 1024px
- Flexbox ve Grid kullandım

### Color Scheme
- Gradient backgrounds
- Glassmorphism efektleri
- Modern renk paleti

## 🔧 Kod Yapısı

### Frontend Structure
```
src/
├── components/
│   ├── UI/          # Reusable components
│   ├── Layout/      # Header, Sidebar
│   └── SpaceBackground.js
├── pages/
│   ├── Auth/        # Login, Register
│   ├── Dashboard/
│   ├── Notes/
│   └── Profile/
├── stores/          # Zustand stores
├── services/        # API calls
└── hooks/           # Custom hooks
```

### Backend Structure
```
backend/
├── routes/          # API routes
├── models/          # MongoDB schemas
├── middleware/      # Auth, validation
├── config/          # Database config
└── server.js        # Main file
```

## 🐛 Karşılaştığım Sorunlar

### Authentication Issues
- Zustand persist ile ilgili sorunlar yaşadım
- JWT token management'ı zordu
- State management'ı optimize ettim

### UI/UX Challenges
- Material UI ile custom styling zordu
- Responsive design'da breakpoint'lerde sorunlar
- Animation performance'ı optimize ettim

### API Integration
- CORS sorunları
- Error handling
- Loading states

## 📚 Öğrendiğim Şeyler

### React
- Custom hooks yazma
- Zustand state management
- Framer Motion animasyonları
- Material UI kullanımı

### Node.js
- Express.js routing
- MongoDB ile çalışma
- JWT authentication
- API design

### General
- Git workflow
- Error handling
- Code organization
- Performance optimization

## 🎯 Gelecek Planları

### Kısa Vadeli
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Better error handling
- [ ] More tests

### Uzun Vadeli
- [ ] PWA yapma
- [ ] Real-time features
- [ ] Advanced AI features
- [ ] Mobile app


## 📄 Lisans

MIT License - İstediğin gibi kullanabilirsin.

---

**Not:** Bu benim ilk büyük projem, hatalar olabilir ama öğrenmeye devam ediyorum! 

*"Kod yazmak sanattır, debug etmek ise bilimdir."* 
=======
# ai-notes-app
AI Supported Notes App
>>>>>>> 2cfa8b473581a0b4e06cf6b590a2b29907aea9bf
