// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "fhevm/lib/TFHE.sol";
import "fhevm/config/ZamaFHEVMConfig.sol";

/**
 * @title PokerGameFHE - Fully Homomorphic Encryption Poker with Zama
 * @notice A simplified Texas Hold'em poker game using Zama's FHE technology
 * @dev Players' cards and bets remain encrypted on-chain throughout the game
 */
contract PokerGameFHE is SepoliaZamaFHEVMConfig, Ownable2Step {
    
    // Game States
    enum GameState {
        WaitingForPlayers,
        CardsDealt,
        Betting,
        Showdown,
        Finished
    }

    // Player struct with encrypted data
    struct Player {
        address playerAddress;
        euint8 card1;           // Encrypted card 1 (0-51)
        euint8 card2;           // Encrypted card 2 (0-51)
        euint64 encryptedBet;   // Encrypted bet amount
        bool isActive;
        bool hasFolded;
    }

    // Game state variables
    GameState public gameState;
    Player[] public players;
    uint256 public pot;
    uint256 public minPlayers = 2;
    uint256 public maxPlayers = 6;
    uint256 public currentPlayerIndex;
    uint256 public smallBlind = 0.01 ether;
    uint256 public bigBlind = 0.02 ether;

    // Community cards (Texas Hold'em)
    euint8[5] public communityCards;
    uint256 public communityCardsRevealed;

    // Deck state (for simplified dealing)
    uint256 private deckSeed;

    // Events
    event PlayerJoined(address indexed player, uint256 playerIndex);
    event GameStarted(uint256 playerCount);
    event CardsDealt();
    event BetPlaced(address indexed player, uint256 amount);
    event PlayerFolded(address indexed player);
    event GameFinished(address indexed winner, uint256 winnings);
    event CommunityCardDealt(uint256 cardIndex);

    constructor() SepoliaZamaFHEVMConfig() Ownable(msg.sender) {
        // Zama FHEVM config is automatically initialized via SepoliaZamaFHEVMConfig
        gameState = GameState.WaitingForPlayers;
        deckSeed = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao)));
    }

    /**
     * @notice Join the game
     * @dev Creates encrypted placeholder cards for the player
     */
    function joinGame() public {
        require(gameState == GameState.WaitingForPlayers, "Game not accepting players");
        require(players.length < maxPlayers, "Game is full");
        require(!isPlayerInGame(msg.sender), "Already in game");

        // Create player with encrypted placeholders
        Player memory newPlayer = Player({
            playerAddress: msg.sender,
            card1: TFHE.asEuint8(0),  // Will be dealt later
            card2: TFHE.asEuint8(0),  // Will be dealt later
            encryptedBet: TFHE.asEuint64(0),
            isActive: true,
            hasFolded: false
        });

        players.push(newPlayer);
        emit PlayerJoined(msg.sender, players.length - 1);

        // Start game if we have enough players
        if (players.length >= minPlayers) {
            startGame();
        }
    }

    /**
     * @notice Start the game and deal cards
     */
    function startGame() internal {
        require(players.length >= minPlayers, "Not enough players");
        gameState = GameState.CardsDealt;
        dealCards();
        emit GameStarted(players.length);
    }

    /**
     * @notice Deal encrypted cards to all players
     * @dev Uses FHE to keep cards private
     */
    function dealCards() internal {
        // Generate new random seed
        deckSeed = uint256(keccak256(abi.encodePacked(deckSeed, block.timestamp, block.prevrandao)));

        // Deal 2 encrypted cards to each player
        for (uint256 i = 0; i < players.length; i++) {
            // Generate random card values (0-51 for a 52-card deck)
            uint8 card1Value = uint8(uint256(keccak256(abi.encodePacked(deckSeed, i, uint256(0)))) % 52);
            uint8 card2Value = uint8(uint256(keccak256(abi.encodePacked(deckSeed, i, uint256(1)))) % 52);

            // Encrypt cards using TFHE
            players[i].card1 = TFHE.asEuint8(card1Value);
            players[i].card2 = TFHE.asEuint8(card2Value);

            // Allow the player to access their own encrypted cards
            TFHE.allowThis(players[i].card1);
            TFHE.allowThis(players[i].card2);
            TFHE.allow(players[i].card1, players[i].playerAddress);
            TFHE.allow(players[i].card2, players[i].playerAddress);
        }

        // Post blinds
        postBlinds();
        gameState = GameState.Betting;
        emit CardsDealt();
    }

    /**
     * @notice Post small and big blinds
     */
    function postBlinds() internal {
        if (players.length >= 2) {
            // Small blind (player 0)
            players[0].encryptedBet = TFHE.asEuint64(smallBlind);
            TFHE.allowThis(players[0].encryptedBet);
            TFHE.allow(players[0].encryptedBet, players[0].playerAddress);
            pot += smallBlind;

            // Big blind (player 1)
            players[1].encryptedBet = TFHE.asEuint64(bigBlind);
            TFHE.allowThis(players[1].encryptedBet);
            TFHE.allow(players[1].encryptedBet, players[1].playerAddress);
            pot += bigBlind;
        }
        currentPlayerIndex = 2 % players.length;
    }

    /**
     * @notice Place an encrypted bet
     * @param encryptedAmount The encrypted bet amount from frontend (as einput)
     */
    function placeBet(einput encryptedAmount, bytes calldata inputProof) public payable {
        require(gameState == GameState.Betting, "Not in betting phase");
        require(isPlayerInGame(msg.sender), "Not in game");
        require(msg.value > 0, "Bet must be > 0");

        uint256 playerIndex = getPlayerIndex(msg.sender);
        require(playerIndex == currentPlayerIndex, "Not your turn");
        require(!players[playerIndex].hasFolded, "Already folded");

        // Convert external encrypted input to internal euint64
        euint64 betAmount = TFHE.asEuint64(encryptedAmount, inputProof);
        
        // Update player's encrypted bet
        players[playerIndex].encryptedBet = TFHE.add(players[playerIndex].encryptedBet, betAmount);
        TFHE.allowThis(players[playerIndex].encryptedBet);
        TFHE.allow(players[playerIndex].encryptedBet, players[playerIndex].playerAddress);

        pot += msg.value;
        emit BetPlaced(msg.sender, msg.value);

        // Move to next player
        nextPlayer();
    }

    /**
     * @notice Fold your hand
     */
    function fold() public {
        require(gameState == GameState.Betting, "Not in betting phase");
        require(isPlayerInGame(msg.sender), "Not in game");

        uint256 playerIndex = getPlayerIndex(msg.sender);
        require(playerIndex == currentPlayerIndex, "Not your turn");

        players[playerIndex].hasFolded = true;
        players[playerIndex].isActive = false;

        emit PlayerFolded(msg.sender);
        nextPlayer();
    }

    /**
     * @notice Call (match current bet)
     */
    function call() public payable {
        require(gameState == GameState.Betting, "Not in betting phase");
        require(isPlayerInGame(msg.sender), "Not in game");

        uint256 playerIndex = getPlayerIndex(msg.sender);
        require(playerIndex == currentPlayerIndex, "Not your turn");

        pot += msg.value;
        emit BetPlaced(msg.sender, msg.value);

        nextPlayer();
    }

    /**
     * @notice Move to next active player
     */
    function nextPlayer() internal {
        uint256 attempts = 0;
        do {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            attempts++;
        } while (players[currentPlayerIndex].hasFolded && attempts < players.length);

        // Check if betting round is complete
        if (getActivePlayerCount() <= 1) {
            endGame();
        }
    }

    /**
     * @notice End the game and determine winner
     */
    function endGame() internal {
        gameState = GameState.Finished;

        // Find the winner (last active player)
        address winner;
        for (uint256 i = 0; i < players.length; i++) {
            if (!players[i].hasFolded) {
                winner = players[i].playerAddress;
                break;
            }
        }

        uint256 winnings = pot;
        pot = 0;

        emit GameFinished(winner, winnings);

        // Transfer winnings to winner
        if (winner != address(0)) {
            payable(winner).transfer(winnings);
        }
    }

    /**
     * @notice Get player's encrypted cards
     * @param playerIndex Index of the player
     * @return card1 The first encrypted card
     * @return card2 The second encrypted card
     */
    function getPlayerCards(uint256 playerIndex) public view returns (euint8 card1, euint8 card2) {
        require(playerIndex < players.length, "Invalid player index");
        return (players[playerIndex].card1, players[playerIndex].card2);
    }

    /**
     * @notice Check if address is in game
     */
    function isPlayerInGame(address player) internal view returns (bool) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i].playerAddress == player) {
                return true;
            }
        }
        return false;
    }

    /**
     * @notice Get player index by address
     */
    function getPlayerIndex(address player) internal view returns (uint256) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i].playerAddress == player) {
                return i;
            }
        }
        revert("Player not found");
    }

    /**
     * @notice Get count of active (non-folded) players
     */
    function getActivePlayerCount() internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < players.length; i++) {
            if (!players[i].hasFolded) {
                count++;
            }
        }
        return count;
    }

    /**
     * @notice Get total number of players
     */
    function getPlayerCount() public view returns (uint256) {
        return players.length;
    }

    /**
     * @notice Get game info
     */
    function getGameInfo() public view returns (
        GameState _gameState,
        uint256 _playerCount,
        uint256 _pot,
        uint256 _currentPlayerIndex
    ) {
        return (gameState, players.length, pot, currentPlayerIndex);
    }

    /**
     * @notice Reset game (owner only)
     */
    function resetGame() public onlyOwner {
        require(gameState == GameState.Finished, "Game not finished");
        delete players;
        pot = 0;
        currentPlayerIndex = 0;
        communityCardsRevealed = 0;
        gameState = GameState.WaitingForPlayers;
    }

    /**
     * @notice Withdraw contract balance (owner only)
     */
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @notice Receive function to accept ETH
     */
    receive() external payable {}
}

