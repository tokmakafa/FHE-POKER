const fs = require('fs');
const path = require('path');

console.log('🌐 Sepolia Testnet Setup Başlatılıyor...\n');

// Check if .env exists
const envPath = './.env';
const envExamplePath = './env.example';

if (!fs.existsSync(envPath)) {
  console.log('❌ .env dosyası bulunamadı!\n');
  
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 .env dosyası oluşturuluyor...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env dosyası oluşturuldu\n');
  }
  
  console.log('⚠️  ÖNEMLI: .env dosyasını düzenleyin ve aşağıdaki bilgileri ekleyin:\n');
  console.log('1. SEPOLIA_RPC_URL=your_infura_or_alchemy_url');
  console.log('2. PRIVATE_KEY=your_private_key_without_0x\n');
} else {
  console.log('✅ .env dosyası mevcut\n');
}

console.log('📋 Sepolia Test Ağı Kurulum Adımları:\n');

console.log('1️⃣  RPC Provider (Infura/Alchemy) Hesabı');
console.log('   - Infura: https://infura.io');
console.log('   - Alchemy: https://www.alchemy.com');
console.log('   - Sepolia endpoint alın\n');

console.log('2️⃣  MetaMask Cüzdanı');
console.log('   - Test amaçlı yeni cüzdan oluşturun');
console.log('   - Private key\'i dışa aktarın');
console.log('   - .env dosyasına ekleyin\n');

console.log('3️⃣  Sepolia Test ETH');
console.log('   Aşağıdaki faucet\'lerden test ETH alın:');
console.log('   - https://www.infura.io/faucet/sepolia');
console.log('   - https://sepoliafaucet.com/');
console.log('   - https://faucets.chain.link/sepolia');
console.log('   - https://faucet.quicknode.com/ethereum/sepolia\n');

console.log('4️⃣  Deploy Komutu');
console.log('   npx hardhat run scripts/deploy.js --network sepolia\n');

console.log('5️⃣  Contract Verify (Opsiyonel)');
console.log('   - Etherscan API key alın: https://etherscan.io/myapikey');
console.log('   - .env\'e ekleyin: ETHERSCAN_API_KEY=your_key');
console.log('   - npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS\n');

console.log('📚 Detaylı rehber için: SEPOLIA_DEPLOYMENT.md\n');

// Check if required packages are installed
const packageJson = require('../package.json');
const requiredPackages = ['@nomicfoundation/hardhat-toolbox', 'hardhat', 'dotenv'];
const missingPackages = requiredPackages.filter(pkg => 
  !packageJson.dependencies?.[pkg] && !packageJson.devDependencies?.[pkg]
);

if (missingPackages.length > 0) {
  console.log('❌ Eksik paketler:', missingPackages.join(', '));
  console.log('   npm install --save-dev ' + missingPackages.join(' ') + '\n');
} else {
  console.log('✅ Tüm gerekli paketler yüklü\n');
}

console.log('🎯 Hazırsınız! .env dosyanızı düzenleyin ve deploy edin!\n');

