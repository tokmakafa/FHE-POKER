// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title SimplePoker - Simplified Poker Game for Base Network
 * @notice A demonstration poker game with basic FHE-inspired encryption
 * @dev This is a simplified version showcasing privacy concepts
 * 
 * For a full production-ready FHE implementation, integrate Zama's fhEVM
 */
contract SimplePoker {
    
    enum GameState {
        WaitingForPlayers,
        Playing,
        Finished
    }

    struct Player {
        address playerAddress;
        bytes32 encryptedCard1;
        bytes32 encryptedCard2;
        uint256 betAmount;
        bool isActive;
        bool hasFolded;
    }

    // Game state
    GameState public gameState;
    Player[] public players;
    uint256 public pot;
    uint256 public minPlayers = 2;
    uint256 public maxPlayers = 6;
    uint256 public currentPlayerIndex;
    uint256 public minBet = 0.001 ether;
    address public owner;

    // Events
    event PlayerJoined(address indexed player, uint256 index);
    event GameStarted(uint256 playerCount);
    event BetPlaced(address indexed player, uint256 amount);
    event PlayerFolded(address indexed player);
    event GameFinished(address indexed winner, uint256 winnings);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        gameState = GameState.WaitingForPlayers;
    }

    /**
     * @notice Join the poker game
     */
    function joinGame() external {
        require(gameState == GameState.WaitingForPlayers, "Game not accepting players");
        require(players.length < maxPlayers, "Game full");
        require(!isPlayerInGame(msg.sender), "Already in game");

        // Create "encrypted" cards using hash (simulating FHE)
        bytes32 card1 = keccak256(abi.encodePacked(block.timestamp, msg.sender, players.length, "card1"));
        bytes32 card2 = keccak256(abi.encodePacked(block.timestamp, msg.sender, players.length, "card2"));

        players.push(Player({
            playerAddress: msg.sender,
            encryptedCard1: card1,
            encryptedCard2: card2,
            betAmount: 0,
            isActive: true,
            hasFolded: false
        }));

        emit PlayerJoined(msg.sender, players.length - 1);

        if (players.length >= minPlayers) {
            startGame();
        }
    }

    /**
     * @notice Start the game
     */
    function startGame() internal {
        gameState = GameState.Playing;
        emit GameStarted(players.length);
    }

    /**
     * @notice Place a bet
     */
    function bet() external payable {
        require(gameState == GameState.Playing, "Game not active");
        require(isPlayerInGame(msg.sender), "Not in game");
        require(msg.value >= minBet, "Bet too small");

        uint256 playerIndex = getPlayerIndex(msg.sender);
        require(playerIndex == currentPlayerIndex, "Not your turn");
        require(!players[playerIndex].hasFolded, "Already folded");

        players[playerIndex].betAmount += msg.value;
        pot += msg.value;

        emit BetPlaced(msg.sender, msg.value);
        nextPlayer();
    }

    /**
     * @notice Fold your hand
     */
    function fold() external {
        require(gameState == GameState.Playing, "Game not active");
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
    function call() external payable {
        require(gameState == GameState.Playing, "Game not active");
        require(isPlayerInGame(msg.sender), "Not in game");
        require(msg.value > 0, "Must send ETH");

        uint256 playerIndex = getPlayerIndex(msg.sender);
        require(playerIndex == currentPlayerIndex, "Not your turn");

        players[playerIndex].betAmount += msg.value;
        pot += msg.value;

        emit BetPlaced(msg.sender, msg.value);
        nextPlayer();
    }

    /**
     * @notice Move to next player
     */
    function nextPlayer() internal {
        uint256 attempts = 0;
        do {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            attempts++;
        } while (players[currentPlayerIndex].hasFolded && attempts < players.length);

        if (getActivePlayerCount() <= 1) {
            endGame();
        }
    }

    /**
     * @notice End game and pay winner
     */
    function endGame() internal {
        gameState = GameState.Finished;

        // Find winner (last active player)
        address winner = address(0);
        for (uint256 i = 0; i < players.length; i++) {
            if (!players[i].hasFolded) {
                winner = players[i].playerAddress;
                break;
            }
        }

        uint256 winnings = pot;
        pot = 0;

        emit GameFinished(winner, winnings);

        if (winner != address(0)) {
            payable(winner).transfer(winnings);
        }
    }

    // View functions
    function isPlayerInGame(address player) public view returns (bool) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i].playerAddress == player) {
                return true;
            }
        }
        return false;
    }

    function getPlayerIndex(address player) public view returns (uint256) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i].playerAddress == player) {
                return i;
            }
        }
        revert("Player not found");
    }

    function getActivePlayerCount() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < players.length; i++) {
            if (!players[i].hasFolded) {
                count++;
            }
        }
        return count;
    }

    function getPlayerCount() public view returns (uint256) {
        return players.length;
    }

    function getGameInfo() external view returns (
        GameState _state,
        uint256 _playerCount,
        uint256 _pot,
        uint256 _currentPlayer
    ) {
        return (gameState, players.length, pot, currentPlayerIndex);
    }

    function getPlayer(uint256 index) external view returns (
        address playerAddress,
        uint256 betAmount,
        bool isActive,
        bool hasFolded
    ) {
        require(index < players.length, "Invalid index");
        Player memory p = players[index];
        return (p.playerAddress, p.betAmount, p.isActive, p.hasFolded);
    }

    /**
     * @notice Get your encrypted cards (only you can see)
     */
    function getMyCards() external view returns (bytes32 card1, bytes32 card2) {
        require(isPlayerInGame(msg.sender), "Not in game");
        uint256 index = getPlayerIndex(msg.sender);
        return (players[index].encryptedCard1, players[index].encryptedCard2);
    }

    /**
     * @notice Reset game (owner only)
     */
    function resetGame() external onlyOwner {
        require(gameState == GameState.Finished, "Game not finished");
        delete players;
        pot = 0;
        currentPlayerIndex = 0;
        gameState = GameState.WaitingForPlayers;
    }

    /**
     * @notice Withdraw (owner only, emergency)
     */
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}

