const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("\n🎯 Sepolia Deployment Cüzdan Adresi:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📍 Adres:", deployer.address);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Mevcut Bakiye:", ethers.formatEther(balance), "ETH");
  console.log("\n⚠️  Sepolia'ya deploy için en az 0.04 ETH gerekli!");
  console.log("\n📝 Test ETH Faucet'leri:");
  console.log("   • https://www.alchemy.com/faucets/ethereum-sepolia");
  console.log("   • https://faucets.chain.link/sepolia");
  console.log("   • https://sepolia-faucet.pk910.de/");
  console.log("\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

