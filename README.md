# Yargıtay Karar Arama

📱 **iPhone ve Android için Yargıtay Kararları Arama Uygulaması**

Büyük bir Yargıtay kararları deposu hazırlayarak zaman içinde içtihadlarda değişiklikleri takip edebileceğiniz mobil uygulama.

## 📋 Özellikler

- 🔍 **Gelişmiş Arama**: Anahtar kelime, esas numarası, karar numarası veya konu ile arama
- 🏛️ **Daire Filtreleme**: Hukuk ve Ceza Daireleri arasında filtreleme
- 📅 **Tarih Aralığı**: Belirli yıl aralığında kararları bulma
- ⭐ **Emsal Kararlar**: Emsal niteliğindeki kararları öne çıkarma
- ❤️ **Favoriler**: Önemli kararları kaydetme ve hızlı erişim
- 📤 **Paylaşım**: Kararları kolayca paylaşma
- 📋 **Kopyalama**: Karar metinlerini panoya kopyalama
- 🌙 **Karanlık Mod**: Göz yormayan tema desteği

## 🚀 Kurulum

### Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- iOS için: macOS ve Xcode (iOS geliştirmesi için)
- Android için: Android Studio (Android geliştirmesi için)

### Adımlar

```bash
# Proje dizinine git
cd YargitayKararArama

# Bağımlılıkları yükle
npm install

# iOS Simulator'da çalıştır (macOS gerekli)
npm run ios

# Android Emulator'da çalıştır
npm run android

# Expo Go ile çalıştır (Herhangi bir cihazda)
npm start
```

## 📱 iPhone'da Çalıştırma

### Expo Go ile (En Kolay Yöntem)

1. App Store'dan **Expo Go** uygulamasını indirin
2. Terminal'de `npm start` komutunu çalıştırın
3. Çıkan QR kodu iPhone kameranızla tarayın
4. Uygulama Expo Go içinde açılacaktır

### Gerçek Cihazda Derleme (Production)

```bash
# EAS CLI'yi yükleyin
npm install -g eas-cli

# Expo hesabınıza giriş yapın
eas login

# iOS build oluşturun
eas build --platform ios

# App Store'a göndermek için
eas submit --platform ios
```

## 🏗️ Proje Yapısı

```
YargitayKararArama/
├── App.tsx                 # Ana uygulama bileşeni
├── src/
│   ├── components/         # Yeniden kullanılabilir bileşenler
│   │   ├── KararKarti.tsx
│   │   ├── AramaCubugu.tsx
│   │   └── FiltrePaneli.tsx
│   ├── screens/            # Uygulama ekranları
│   │   ├── AnasayfaScreen.tsx
│   │   ├── AramaScreen.tsx
│   │   ├── KararDetayScreen.tsx
│   │   ├── FavorilerScreen.tsx
│   │   └── AyarlarScreen.tsx
│   ├── navigation/         # Navigasyon yapılandırması
│   │   └── AppNavigator.tsx
│   ├── services/           # API ve iş mantığı servisleri
│   │   └── aramaServisi.ts
│   ├── hooks/              # Özel React hooks
│   │   └── useFavoriler.ts
│   ├── data/               # Örnek veriler
│   │   └── ornekKararlar.ts
│   └── types/              # TypeScript tip tanımları
│       └── index.ts
├── assets/                 # Görsel dosyalar
├── app.json               # Expo yapılandırması
└── package.json           # Proje bağımlılıkları
```

## 🛠️ Kullanılan Teknolojiler

- **React Native** - Çapraz platform mobil geliştirme
- **Expo** - React Native geliştirme platformu
- **TypeScript** - Tip güvenli JavaScript
- **React Navigation** - Ekran navigasyonu
- **AsyncStorage** - Yerel veri depolama
- **Expo Linear Gradient** - Gradient efektleri
- **Expo Vector Icons** - İkon kütüphanesi

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📧 İletişim

Sorularınız için issue açabilir veya pull request gönderebilirsiniz.
