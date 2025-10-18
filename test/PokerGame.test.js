const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PokerGame", function () {
  let pokerGame;
  let owner;
  let player1;
  let player2;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();
    
    const PokerGame = await ethers.getContractFactory("PokerGame");
    pokerGame = await PokerGame.deploy();
    await pokerGame.waitForDeployment();
  });

  describe("Game Initialization", function () {
    it("Should initialize with correct default values", async function () {
      const gameInfo = await pokerGame.getGameInfo();
      expect(gameInfo[0]).to.equal(0); // GameState.WaitingForPlayers
      expect(gameInfo[1]).to.equal(0); // currentPlayers
      expect(gameInfo[2]).to.equal(0); // pot
    });

    it("Should have correct game owner", async function () {
      expect(await pokerGame.gameOwner()).to.equal(owner.address);
    });
  });

  describe("Player Management", function () {
    it("Should allow players to join the game", async function () {
      const publicKey1 = ethers.keccak256(ethers.toUtf8Bytes("player1"));
      await pokerGame.connect(player1).joinGame(publicKey1);
      
      const gameInfo = await pokerGame.getGameInfo();
      expect(gameInfo[1]).to.equal(1); // currentPlayers should be 1
    });

    it("Should prevent duplicate players from joining", async function () {
      const publicKey1 = ethers.keccak256(ethers.toUtf8Bytes("player1"));
      await pokerGame.connect(player1).joinGame(publicKey1);
      
      await expect(
        pokerGame.connect(player1).joinGame(publicKey1)
      ).to.be.revertedWith("Player already in game");
    });

    it("Should start game when minimum players join", async function () {
      const publicKey1 = ethers.keccak256(ethers.toUtf8Bytes("player1"));
      const publicKey2 = ethers.keccak256(ethers.toUtf8Bytes("player2"));
      await pokerGame.connect(player1).joinGame(publicKey1);
      await pokerGame.connect(player2).joinGame(publicKey2);
      
      const gameInfo = await pokerGame.getGameInfo();
      expect(gameInfo[0]).to.equal(2); // GameState.Betting (after dealing)
    });
  });

  describe("Game Flow", function () {
    beforeEach(async function () {
      // Start a game with 2 players
      const publicKey1 = ethers.keccak256(ethers.toUtf8Bytes("player1"));
      const publicKey2 = ethers.keccak256(ethers.toUtf8Bytes("player2"));
      await pokerGame.connect(player1).joinGame(publicKey1);
      await pokerGame.connect(player2).joinGame(publicKey2);
    });

    it("Should be in betting phase after dealing", async function () {
      const gameInfo = await pokerGame.getGameInfo();
      expect(gameInfo[0]).to.equal(2); // GameState.Betting
    });

    it("Should allow players to fold", async function () {
      await pokerGame.connect(player1).fold();
      
      // Game should continue with next player
      const gameInfo = await pokerGame.getGameInfo();
      expect(gameInfo[4]).to.equal(1); // currentPlayerIndex should be 1
    });
  });

  describe("Access Control", function () {
    it("Should allow only owner to reset game", async function () {
      // Start a game first
      const publicKey1 = ethers.keccak256(ethers.toUtf8Bytes("player1"));
      const publicKey2 = ethers.keccak256(ethers.toUtf8Bytes("player2"));
      await pokerGame.connect(player1).joinGame(publicKey1);
      await pokerGame.connect(player2).joinGame(publicKey2);
      
      // Try to reset as non-owner (should fail because game is not finished)
      await expect(
        pokerGame.connect(player1).resetGame()
      ).to.be.revertedWith("Only game owner can reset");
      
      // Try to reset as owner (should also fail because game is not finished)
      await expect(
        pokerGame.resetGame()
      ).to.be.revertedWith("Game not finished");
    });
  });
});
