const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x81C9a38fb4684ac793Ce7b4F940ebBAB171224c0";
  
  console.log("Checking game status on Sepolia...");
  console.log("Contract Address:", contractAddress);
  
  // Get contract instance
  const PokerGame = await ethers.getContractFactory("PokerGame");
  const contract = PokerGame.attach(contractAddress);
  
  try {
    // Get game state
    const gameState = await contract.gameState();
    const gameStateNames = ['WaitingForPlayers', 'PreFlop', 'Flop', 'Turn', 'River', 'Showdown', 'Ended'];
    console.log("Game State:", gameStateNames[gameState]);
    
    // Get player count
    const playerCount = await contract.getPlayerCount();
    console.log("Player Count:", playerCount.toString());
    
    // Get minimum players
    const minPlayers = await contract.minPlayers();
    console.log("Min Players:", minPlayers.toString());
    
    // Get maximum players
    const maxPlayers = await contract.maxPlayers();
    console.log("Max Players:", maxPlayers.toString());
    
    // Get current pot
    const pot = await contract.pot();
    console.log("Pot:", ethers.formatEther(pot), "ETH");
    
    console.log("\nGame is", gameState === 0n ? "accepting new players" : "already started or ended");
    
  } catch (error) {
    console.error("Error checking game status:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

