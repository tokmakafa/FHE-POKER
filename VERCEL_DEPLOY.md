# 🚀 Vercel Deployment Guide

## Hızlı Deployment

### 1. Vercel'e Git

1. https://vercel.com adresine git
2. GitHub ile giriş yap
3. **Add New Project** butonuna tıkla

### 2. Repository Seç

1. **Import Git Repository** altında `FHE-POKER` reposunu seç
2. **Import** butonuna tıkla

### 3. Project Settings

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 4. Environment Variables (İsteğe Bağlı)

Şu an environment variable'a ihtiyaç yok, ama ileride eklemek için:

```
Name: REACT_APP_CONTRACT_ADDRESS
Value: <sepolia-contract-address>
```

### 5. Deploy!

**Deploy** butonuna bas ve bekle! 🎉

---

## ⚙️ Detaylı Ayarlar

### Build Settings

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "installCommand": "npm install"
}
```

### vercel.json (Opsiyonel)

Eğer root directory'den deploy etmek istersen:

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "devCommand": "cd frontend && npm start",
  "installCommand": "npm install",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔧 Sorun Giderme

### Build Hatası: "Module not found"

**Çözüm:** Root Directory'yi `frontend` olarak ayarla

```
Root Directory: frontend
Build Command: npm run build
Output Directory: build
```

### Routes Çalışmıyor (404)

**Çözüm:** `vercel.json` ekle veya Vercel dashboard'da rewrite ekle:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Environment Variables

Contract address otomatik `contract-info.json`'dan geliyor, ama override etmek için:

```bash
REACT_APP_CONTRACT_ADDRESS=0x...
```

---

## 📱 Post-Deployment

### 1. Domain Ayarla (İsteğe Bağlı)

- Vercel dashboard → Settings → Domains
- Custom domain ekle veya `.vercel.app` kullan

### 2. Test Et

1. Vercel URL'ini aç (örn: `fhe-poker.vercel.app`)
2. MetaMask'ı Sepolia'ya bağla
3. "Connect Wallet" ile test et
4. Oyunu dene!

### 3. Analytics (İsteğe Bağlı)

Vercel → Analytics → Enable

---

## 🎯 Deployment Checklist

- [x] GitHub repo hazır
- [x] Frontend build çalışıyor (`npm run build`)
- [x] Contract Sepolia'da deploy edilmiş
- [ ] Vercel'e import et
- [ ] Root directory: `frontend`
- [ ] Deploy ve test et
- [ ] Custom domain (opsiyonel)

---

## 🔗 Useful Links

- **Vercel Docs:** https://vercel.com/docs
- **React Deployment:** https://create-react-app.dev/docs/deployment/
- **GitHub Repo:** https://github.com/tokmakafa/FHE-POKER

---

## 💡 Pro Tips

1. **Auto-deploy:** Her git push'da otomatik deploy olur
2. **Preview:** Her PR için ayrı preview URL
3. **Rollback:** Vercel dashboard'dan eski versiyona dön
4. **Logs:** Build ve runtime loglarını kontrol et
5. **Performance:** Vercel Analytics ile performance izle

---

## 🎉 Deployment Sonrası

Deploy başarılı olduktan sonra:

```bash
✅ Vercel URL: https://your-app.vercel.app
✅ Production: https://fhe-poker.vercel.app
```

**Şimdi Twitter'da duyur! 🐦**

---

## 🐛 Known Issues

1. **MetaMask Network:** Kullanıcılar Sepolia'ya manuel geçiş yapmalı
2. **First Load:** İlk yüklemede biraz yavaş olabilir
3. **Wallet Connect:** Sayfa refresh'de bağlantı kopar (normal)

---

**Happy Deploying! 🚀**

