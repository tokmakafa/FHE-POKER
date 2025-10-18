const fs = require('fs');
const path = require('path');

console.log('🚀 FHEVM Poker dApp Kurulum Başlatılıyor...\n');

// Check if node_modules exists
const nodeModulesExists = fs.existsSync('./node_modules');
if (!nodeModulesExists) {
  console.log('📦 Bağımlılıklar yükleniyor...');
  console.log('npm install komutunu çalıştırın');
} else {
  console.log('✅ Ana bağımlılıklar yüklü');
}

// Check frontend node_modules
const frontendNodeModulesExists = fs.existsSync('./frontend/node_modules');
if (!frontendNodeModulesExists) {
  console.log('📦 Frontend bağımlılıkları yükleniyor...');
  console.log('cd frontend && npm install komutunu çalıştırın');
} else {
  console.log('✅ Frontend bağımlılıkları yüklü');
}

// Create .env file if it doesn't exist
const envPath = './.env';
if (!fs.existsSync(envPath)) {
  const envContent = `# FHEVM Testnet Configuration
FHEVM_RPC_URL=https://fhevm-testnet.zama.ai
FHEVM_CHAIN_ID=0x42

# Private Key (for deployment - replace with your own)
PRIVATE_KEY=your_private_key_here

# Contract Address (will be set after deployment)
CONTRACT_ADDRESS=
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env dosyası oluşturuldu');
} else {
  console.log('✅ .env dosyası mevcut');
}

console.log('\n📋 Kurulum Adımları:');
console.log('1. npm install');
console.log('2. cd frontend && npm install');
console.log('3. npm run compile');
console.log('4. npm run deploy');
console.log('5. npm start');

console.log('\n🔧 Gerekli Araçlar:');
console.log('- MetaMask cüzdanı');
console.log('- FHEVM testnet erişimi');
console.log('- Node.js v16+');

console.log('\n🎮 Oyun Özellikleri:');
console.log('- Gizli kartlar (FHEVM şifreleme)');
console.log('- 2-6 oyuncu arası poker');
console.log('- Gerçek zamanlı oyun');
console.log('- Blockchain tabanlı güvenlik');

console.log('\n✨ Kurulum tamamlandı! Oyunu başlatmak için yukarıdaki adımları takip edin.');
