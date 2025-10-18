# 🚀 FHEVM Poker - Hızlı Başlangıç

Bu rehber, FHEVM Poker dApp'ini hızlıca çalıştırmanız için gerekli adımları içerir.

## ⚡ Hızlı Kurulum (5 Dakika)

### 1. Bağımlılıkları Yükleyin

```bash
# Ana proje
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 2. Kurulum Kontrolü

```bash
npm run setup
```

### 3. Kontratı Derleyin

```bash
npm run compile
```

### 4. Test Edin

```bash
npm test
```

### 5. Deploy Edin

```bash
npm run deploy
```

### 6. Frontend'i Başlatın

```bash
npm start
```

## 🎮 Oyunu Test Etme

1. **MetaMask'i Ayarlayın**:
   - FHEVM Testnet'i ekleyin
   - RPC URL: `https://fhevm-testnet.zama.ai`
   - Chain ID: `0x42`

2. **Test ETH Alın**:
   - FHEVM testnet faucet'inden test ETH alın

3. **Oyuna Katılın**:
   - Frontend'i açın
   - Cüzdanınızı bağlayın
   - "Oyuna Katıl" butonuna tıklayın

## 🔧 Geliştirme Modu

Tüm servisleri aynı anda başlatmak için:

```bash
npm run dev
```

## 📱 Mobil Test

React uygulaması mobil uyumludur. Tarayıcınızın geliştirici araçlarında mobil görünümü test edebilirsiniz.

## 🐛 Sorun Giderme

### MetaMask Bağlantı Sorunu
- MetaMask'in güncel olduğundan emin olun
- FHEVM testnet'in doğru eklendiğini kontrol edin

### Kontrat Deploy Sorunu
- FHEVM testnet'e erişiminiz olduğundan emin olun
- Test ETH'iniz olduğunu kontrol edin

### Frontend Sorunu
- Node.js v16+ kullandığınızdan emin olun
- Tüm bağımlılıkların yüklü olduğunu kontrol edin

## 🎯 Sonraki Adımlar

- [ ] Gerçek FHEVM entegrasyonu
- [ ] Gelişmiş poker kuralları
- [ ] Turnuva modu
- [ ] Mobil uygulama

## 📞 Yardım

Sorun yaşıyorsanız:
1. README.md dosyasını kontrol edin
2. GitHub Issues'da arama yapın
3. Yeni issue oluşturun
