const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying PokerGameFHE with Zama SDK to Sepolia...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 Deploying from address:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Deploy PokerGameFHE
  console.log("📝 Deploying PokerGameFHE contract...");
  const PokerGameFHE = await hre.ethers.getContractFactory("PokerGameFHE");
  const pokerGame = await PokerGameFHE.deploy();
  
  await pokerGame.waitForDeployment();
  const contractAddress = await pokerGame.getAddress();
  
  console.log("✅ PokerGameFHE deployed to:", contractAddress);
  console.log("🔗 Network:", hre.network.name);
  console.log("⛓️  Chain ID:", (await hre.ethers.provider.getNetwork()).chainId.toString());

  // Save contract info
  const contractInfo = {
    address: contractAddress,
    network: hre.network.name,
    chainId: (await hre.ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
    contractName: "PokerGameFHE",
    zamaFHEVM: true
  };

  const contractInfoPath = path.join(__dirname, "../frontend/src/contract-info.json");
  fs.writeFileSync(contractInfoPath, JSON.stringify(contractInfo, null, 2));
  console.log("\n📄 Contract info saved to:", contractInfoPath);

  // Copy ABI to frontend
  const artifactPath = path.join(__dirname, "../artifacts/contracts/PokerGameFHE.sol/PokerGameFHE.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  
  const abiPath = path.join(__dirname, "../frontend/src/PokerGameFHE_ABI.json");
  fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));
  console.log("📄 ABI copied to:", abiPath);

  // Display contract info
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("=".repeat(60));
  console.log("\n📋 Contract Details:");
  console.log("   Contract: PokerGameFHE (Zama fhEVM)");
  console.log("   Address:", contractAddress);
  console.log("   Network:", hre.network.name);
  console.log("   Chain ID:", contractInfo.chainId);
  console.log("   Deployer:", deployer.address);
  console.log("\n🔐 FHE Features:");
  console.log("   ✅ Encrypted cards (euint8)");
  console.log("   ✅ Encrypted bets (euint64)");
  console.log("   ✅ Zama TFHE library");
  console.log("   ✅ ACL permissions");
  
  console.log("\n🔗 Verify on Etherscan:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress}`);
  
  console.log("\n📱 Next Steps:");
  console.log("   1. Update frontend to use fhevmjs");
  console.log("   2. Test encryption/decryption");
  console.log("   3. Deploy to Vercel");
  console.log("\n" + "=".repeat(60));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

