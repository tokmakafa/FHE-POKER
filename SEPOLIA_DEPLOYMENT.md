# 🌐 Sepolia Testnet Deployment Rehberi

Bu rehber, FHE Poker oyununu Ethereum Sepolia test ağında deploy etmek için gereken adımları içerir.

## 📋 Gereksinimler

### 1. RPC Provider Hesabı
Aşağıdaki servislerden birinden ücretsiz hesap açın:

#### Infura (Önerilen)
1. https://infura.io adresine gidin
2. Ücretsiz hesap oluşturun
3. Yeni proje oluşturun
4. Sepolia endpoint'ini kopyalayın
   ```
   https://sepolia.infura.io/v3/YOUR_PROJECT_ID
   ```

#### Alchemy (Alternatif)
1. https://www.alchemy.com adresine gidin
2. Ücretsiz hesap oluşturun
3. Sepolia app oluşturun
4. RPC endpoint'ini kopyalayın
   ```
   https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
   ```

### 2. MetaMask Cüzdanı
1. MetaMask'te yeni bir cüzdan oluşturun (veya mevcut test cüzdanını kullanın)
2. **ÖNEMLİ**: Test amaçlı yeni bir cüzdan kullanın, asla ana cüzdanınızı kullanmayın!
3. Private key'inizi dışa aktarın (Settings → Account Details → Export Private Key)

### 3. Sepolia Test ETH
Aşağıdaki faucet'lerden test ETH alın:

#### Sepolia Faucet'ler:
1. **Infura Faucet**: https://www.infura.io/faucet/sepolia
2. **Alchemy Faucet**: https://sepoliafaucet.com/
3. **Chainlink Faucet**: https://faucets.chain.link/sepolia
4. **QuickNode Faucet**: https://faucet.quicknode.com/ethereum/sepolia

**Not**: Genellikle sosyal medya doğrulaması gerekir ve 0.5 ETH kadar test ETH alabilirsiniz.

## 🔧 Konfigürasyon

### Adım 1: Environment Variables Ayarla

1. `.env` dosyası oluşturun (`.env.example`'dan kopyalayın):
```bash
cp env.example .env
```

2. `.env` dosyasını düzenleyin:
```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_private_key_without_0x_prefix
```

**ÖNEMLİ GÜVENLİK NOTLARI:**
- ⚠️ `.env` dosyası zaten `.gitignore`'da - asla git'e commit etmeyin!
- ⚠️ Sadece test cüzdanı kullanın
- ⚠️ Private key'i paylaşmayın
- ⚠️ Production'da asla `.env` kullanmayın

### Adım 2: Hardhat Config Güncelle

`hardhat.config.js` dosyası zaten yapılandırılmış. Private key eklemek için:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111
    }
  }
};
```

## 🚀 Deployment

### Adım 1: Kontratı Derle
```bash
npx hardhat compile
```

### Adım 2: Test Et (Opsiyonel)
```bash
npx hardhat test
```

### Adım 3: Sepolia'ya Deploy Et
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Deploy işlemi 1-2 dakika sürebilir. Başarılı olursa şunu göreceksiniz:
```
Deploying PokerGame contract...
PokerGame deployed to: 0xYOUR_CONTRACT_ADDRESS
Contract info saved to frontend/src/contract-info.json
```

### Adım 4: Contract'ı Doğrula (Opsiyonel ama önerilen)

Sepolia Etherscan'de verify etmek için:

1. Önce Etherscan API key alın: https://etherscan.io/myapikey

2. `.env` dosyasına ekleyin:
```env
ETHERSCAN_API_KEY=your_etherscan_api_key
```

3. Verify edin:
```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

## 🎮 Frontend'i Yapılandır

### Adım 1: Contract Adresini Güncelle

Deploy sonrası `frontend/src/contract-info.json` otomatik oluşturulur:
```json
{
  "address": "0xYOUR_CONTRACT_ADDRESS",
  "network": "sepolia",
  "deployedAt": "2024-..."
}
```

### Adım 2: MetaMask'i Yapılandır

1. MetaMask'te Sepolia network'ü ekleyin:
   - **Network Name**: Sepolia Test Network
   - **RPC URL**: https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   - **Chain ID**: 11155111
   - **Currency Symbol**: ETH
   - **Block Explorer**: https://sepolia.etherscan.io

2. Test ETH'nizin olduğunu kontrol edin

### Adım 3: Frontend'i Başlat

```bash
cd frontend
npm start
```

Tarayıcıda açılacak: http://localhost:3000

## 🧪 Test Senaryoları

### Test 1: FHE Public Key ile Oyuna Katılma
1. MetaMask'i Sepolia'ya bağlayın
2. "Cüzdan Bağla" butonuna tıklayın
3. "Oyuna Katıl" butonuna tıklayın
4. FHE public key otomatik oluşturulacak
5. Transaction'ı onaylayın

**Beklenen Süre**: ~15-30 saniye (Sepolia block time)

### Test 2: Şifrelenmiş Bahis Yapma
1. 2 oyuncu oyuna katıldıktan sonra
2. Bahis miktarı girin (örn: 0.01 ETH)
3. "Bahis Yap" butonuna tıklayın
4. Bahis FHE ile şifrelenecek
5. Transaction'ı onaylayın

**Beklenen Süre**: ~15-30 saniye

### Test 3: Çoklu Oyuncu Oyunu
1. Farklı cüzdanlarla 2-6 oyuncu ekleyin
2. Her oyuncu sırayla bahis yapar
3. Community kartlar açılır (Flop, Turn, River)
4. Kazanan belirlenir

## 📊 Contract İzleme

### Sepolia Etherscan
Contract'ınızı izlemek için:
```
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

Burada görebilirsiniz:
- ✅ Tüm transactions
- ✅ Contract code (verify ettiyseniz)
- ✅ Events (PlayerJoined, BetPlaced, etc.)
- ✅ Gas kullanımı
- ✅ Contract balance

### Transaction Durumu
Her transaction'ı izleyin:
```
https://sepolia.etherscan.io/tx/YOUR_TX_HASH
```

## 💰 Gas Ücretleri (Tahminler)

| İşlem | Gas Kullanımı | Maliyet (~30 gwei) |
|-------|---------------|---------------------|
| Deploy | ~4,000,000 | ~0.12 ETH |
| Join Game | ~200,000 | ~0.006 ETH |
| Place Bet | ~150,000 | ~0.0045 ETH |
| Fold | ~50,000 | ~0.0015 ETH |

**Not**: Sepolia test ETH kullanıyorsunuz, gerçek para harcamıyorsunuz!

## 🐛 Sorun Giderme

### Problem: "Insufficient funds"
**Çözüm**: Faucet'ten daha fazla Sepolia ETH alın

### Problem: "Transaction underpriced"
**Çözüm**: Gas price'ı artırın veya birkaç dakika bekleyin

### Problem: "Nonce too low"
**Çözüm**: MetaMask'te Settings → Advanced → Reset Account

### Problem: RPC hatası
**Çözüm**: 
- Infura/Alchemy API key'inizin doğru olduğunu kontrol edin
- Rate limit'e takılmış olabilirsiniz, birkaç dakika bekleyin
- Alternatif RPC provider deneyin

### Problem: Contract deploy edilmedi
**Çözüm**:
1. `.env` dosyanızı kontrol edin
2. Private key'in doğru olduğunu kontrol edin
3. Sepolia ETH'nizin yeterli olduğunu kontrol edin
4. RPC URL'in çalıştığını test edin

## 🔍 Contract Doğrulama

Deploy sonrası contract'ınızı verify etmek için:

```bash
# Hardhat verification
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS

# Manuel verification (Etherscan'de)
1. https://sepolia.etherscan.io/verifyContract
2. Contract address girin
3. Compiler version: 0.8.19
4. Optimization: Yes (200 runs)
5. Contract code yapıştırın
```

## 📱 Mobil Test

Sepolia'da deploy edildikten sonra mobil cihazlarda da test edebilirsiniz:
1. MetaMask mobil uygulamasını yükleyin
2. Sepolia network'ünü ekleyin
3. DApp tarayıcısında frontend URL'nizi açın
4. Oyunu test edin

## 🎯 Production Checklist

Mainnet'e deploy etmeden önce:
- [ ] Sepolia'da tam test yapıldı
- [ ] FHE encryption test edildi
- [ ] Gas optimization yapıldı
- [ ] Security audit yapıldı
- [ ] Multi-sig wallet kullanıldı
- [ ] Emergency stop mechanism eklendi
- [ ] Rate limiting eklendi
- [ ] Gerçek Zama FHE SDK entegre edildi

## 🌟 Sonraki Adımlar

1. **Gerçek Zama FHE Entegrasyonu**: Zama'nın resmi FHE kütüphanelerini entegre edin
2. **Advanced Features**: Turnuva modu, rake sistemi, vs.
3. **UI/UX İyileştirmeleri**: Daha güzel arayüz, animasyonlar
4. **Mobile App**: React Native versiyonu
5. **Mainnet Deploy**: Production'a geçiş

---

**🔒 Güvenli ve Şeffaf Poker Oyunu - Zama FHE ile!**

## 📞 Destek

Sorun yaşarsanız:
1. Bu rehberi tekrar okuyun
2. Hardhat dokümantasyonuna bakın
3. Sepolia Etherscan'de transaction'ları kontrol edin
4. GitHub Issues açın

