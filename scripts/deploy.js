const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  console.log("Deploying PokerGame contract...");

  // Get the contract factory
  const PokerGame = await ethers.getContractFactory("PokerGame");

  // Deploy the contract
  const pokerGame = await PokerGame.deploy();

  // Wait for deployment to complete
  await pokerGame.waitForDeployment();

  const contractAddress = await pokerGame.getAddress();
  console.log("PokerGame deployed to:", contractAddress);

  // Save contract address to a file for frontend use
  const fs = require('fs');
  const network = hre.network.name;
  console.log("Network:", network);
  
  const contractInfo = {
    address: contractAddress,
    network: network,
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './frontend/src/contract-info.json',
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract info saved to frontend/src/contract-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
