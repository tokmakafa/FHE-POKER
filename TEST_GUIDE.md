# 🧪 FHE Poker Test Rehberi

## 🚀 Hızlı Test (Localhost)

### 1. Kurulum Kontrolü

✅ Hardhat node çalışıyor: http://127.0.0.1:8545
✅ Kontrat deploy edildi: `0x5fbdb2315678afecb367f032d93f642f64180aa3`
✅ Frontend başlatılıyor...

### 2. MetaMask Konfigürasyonu

#### Localhost Network Ekleyin:
- **Network Name**: Hardhat Local
- **RPC URL**: http://127.0.0.1:8545
- **Chain ID**: 31337
- **Currency Symbol**: ETH

#### Test Hesabı Ekleyin:
```
Account #0 Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Balance: 10000 ETH
```

### 3. Test Adımları

#### Adım 1: Frontend'i Açın
- Tarayıcınızda açılacak: http://localhost:3000

#### Adım 2: MetaMask Bağlayın
1. "Cüzdan Bağla" butonuna tıklayın
2. MetaMask'te Hardhat Local ağını seçin
3. Account #0'ı seçin

#### Adım 3: FHE Public Key Oluşturun
Frontend otomatik olarak bir FHE public key oluşturacak

#### Adım 4: Oyuna Katılın
1. "Oyuna Katıl" butonuna tıklayın
2. MetaMask'te işlemi onaylayın
3. Oyuncu sayısı 1 olmalı

#### Adım 5: İkinci Oyuncuyu Ekleyin
Yeni bir browser penceresi veya sekme açın:
1. MetaMask'te Account #1'e geçin
   ```
   Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```
2. "Oyuna Katıl" butonuna tıklayın
3. Oyun otomatik başlayacak!

#### Adım 6: FHE Şifreli Bahis Yapın
1. Bahis miktarını girin (örn: 0.1 ETH)
2. "Bahis Yap" butonuna tıklayın
3. Bahis FHE ile şifrelenecek!

## 🔍 Test Senaryoları

### Senaryo 1: Basit Oyun
```
1. 2 oyuncu katılır
2. Her oyuncu kartlarını alır (şifrelenmiş)
3. Bahis turu başlar
4. Oyuncular bahis yapar veya pas geçer
5. Community kartlar açılır
6. Kazanan belirlenir
```

### Senaryo 2: FHE Gizlilik Testi
```
1. Oyuncu 1 kartlarını görür (kendi şifreli kartları)
2. Oyuncu 2 kartlarını göremez (şifrelenmiş)
3. Bahisler şifrelenmiş halde işlenir
4. Sadece oyun sonunda kartlar açılır
```

### Senaryo 3: Çoklu Oyuncu
```
1. 3-6 oyuncu katılır
2. Herkes şifreli kartlarını alır
3. Sırayla bahis yaparlar
4. Pas geçenler oyundan çıkar
5. Son kalan kazanır
```

## 🐛 Debug & Kontroller

### Console'da Kontrol Edin:
```javascript
// Kontrat adresini kontrol et
console.log("Contract:", "0x5fbdb2315678afecb367f032d93f642f64180aa3");

// Oyun durumunu kontrol et
// (Frontend console'da görünecek)
```

### Hardhat Console'da Kontrol:
```bash
# Yeni terminal açın
npx hardhat console --network localhost

# Kontratı yükle
const PokerGame = await ethers.getContractFactory("PokerGame");
const game = await PokerGame.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3");

# Oyun durumunu kontrol et
await game.getGameInfo();

# Oyuncu sayısını kontrol et
await game.getPlayerCount();
```

## 🎯 FHE Özelliklerini Test Edin

### 1. Şifrelenmiş Kartlar
```solidity
// Oyuncunun şifreli kartlarını al
await game.getMyEncryptedCards();
// Sonuç: [encryptedValue1, encryptedValue2, nonce1, nonce2]
```

### 2. Şifrelenmiş Bahisler
```solidity
// Oyuncu bilgisini al
await game.getPlayerInfo(0);
// Sonuç: address, isActive, hasFolded, encryptedBetAmount, publicKey
```

### 3. Homomorfik İşlemler
```solidity
// FHE toplama test et
await game.fheAdd(encryptedA, encryptedB);

// FHE karşılaştırma test et
await game.fheCompare(encryptedA, encryptedB);
```

## ✅ Başarı Kriterleri

- [x] Kontrat başarıyla deploy edildi
- [x] Frontend başlatıldı
- [ ] MetaMask bağlandı
- [ ] Oyuncu katıldı
- [ ] FHE public key oluşturuldu
- [ ] Şifrelenmiş kartlar alındı
- [ ] Şifrelenmiş bahis yapıldı
- [ ] Oyun tamamlandı

## 🎉 Test Tamamlandığında

Tebrikler! FHE uyumlu poker oyununu başarıyla test ettiniz:

✅ Kartlar FHE ile şifrelenmiş
✅ Bahisler FHE ile korunmuş
✅ Gizlilik korunmuş
✅ Zama prensiplerine uygun

## 📝 Notlar

- Bu localhost testidir
- Gerçek Zama FHE için Sepolia'ya deploy edin
- Production'da gerçek FHE kütüphaneleri kullanın
- Daha fazla güvenlik testi yapın

---

**🔒 Zama FHE ile güvenli poker oyunu!**

