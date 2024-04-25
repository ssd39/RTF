// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract GameContract {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // Game structure
    struct Game {
        address player1;
        address player2;
        uint256 nftId1;
        uint256 nftId2;
        uint256 entryFee; // Entry fee for the game
        bool isFull;
        bool isClaimed;
        uint8[3] p1Attributes;
        uint8[3] p2Attributes;
    }

    // Mapping to store games by ID
    mapping(uint256 => Game) public games;

    // Incremental game ID
    uint256 public gameId;

    // NFT contract instance
    IERC721 public nftContract;

    // Event for when a new game is created or a player joins an existing game
    event GameJoined(uint256 gameId, address player, uint256 nftId);

    // Constructor to initialize the contract with the NFT contract address
    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
        gameId = 1; // Initialize gameId
    }

    // Function to join or create a game
    function joinOrCreateGame(uint256 nftId) public payable {
        require(msg.value == 1 ether, "Must send exactly 1 ETH as entry fee");
        
        // Check if the caller is the owner of the NFT
        require(nftContract.ownerOf(nftId) == msg.sender, "Caller must be the owner of the NFT");

        // Check if the current game (gameId - 1) is full
        if (gameId > 1 && games[gameId - 1].isFull == false) {
            // Add the caller as player2 to the existing game
            games[gameId - 1].player2 = msg.sender;
            games[gameId - 1].nftId2 = nftId;
            games[gameId - 1].isFull = true;

            emit GameJoined(gameId - 1, msg.sender, nftId);
             } else {
            // Create a new game
            games[gameId] = Game({
                player1: msg.sender,
                player2: address(0),
                nftId1: nftId,
                nftId2: 0,
                entryFee: msg.value,
                isFull: false,
                isClaimed: false,
                p1Attributes: [40, 80, 60],
                p2Attributes: [40, 80, 60]
            });

            emit GameJoined(gameId, msg.sender, nftId);
            gameId++;
        }
          

    }

    // 0 - punch
    // 1 - punch up
    // 2 - punch down
    // 3 - block
    // 4 - block up
    // 5 - block down
    // 6 - nudge
    // 7 - nudge up
    // 8 - nudge down
    // 9 - power

    function claimWin(uint256 _gameId, uint256[3][5] calldata player1Moves, uint256[3][5] calldata player2Moves, bytes[] calldata  player1Sig, bytes[] calldata  player2Sig)  public {
        Game memory game = games[_gameId];
        require(game.isFull && (game.player1 == msg.sender || game.player2 == msg.sender), "Game not finished yet!");
        require(!game.isClaimed , "Win amount already claimed!");
        for(uint8 i =0; i < 5; i++) {
            require(verifyArray(player1Moves[i], player1Sig[i], game.player1), "Invalid move data for player1!");
            require(verifyArray(player2Moves[i], player2Sig[i], game.player2), "Invalid move data! for player2!");
            uint8 p1Power = 1;
            uint8 p2Power = 1;
            for(uint8 j=0; j < 3; j++){
                if (player1Moves[i][j] == 0 && player2Moves[i][j] != 3) {
                    games[_gameId].p2Attributes[0] -= 20 * p1Power;
                } else if (player1Moves[i][j] == 1 && player2Moves[i][j] != 4) {
                    games[_gameId].p2Attributes[1] -= 10 * p1Power;
                } else if (player1Moves[i][j] == 2 && player2Moves[i][j] != 5) {
                    games[_gameId].p2Attributes[2] -= 15 * p1Power;
                } else if (player1Moves[i][j] >= 6 && player1Moves[i][j] <= 8) {
                    if(player1Moves[i][j] == 6 && player2Moves[i][j] == 3) {
                        games[_gameId].p2Attributes[0] -= 5;
                    }else{
                        games[_gameId].p2Attributes[0] -= 20;
                    }
                    if(player1Moves[i][j] == 7 && player2Moves[i][j] == 4) {
                        games[_gameId].p2Attributes[1] -= 5;
                    }else{
                        games[_gameId].p2Attributes[1] -= 20;
                    }
                    if(player1Moves[i][j] == 8 && player2Moves[i][j] == 5) {
                        games[_gameId].p2Attributes[2] -= 5;
                    }else{
                        games[_gameId].p2Attributes[2] -= 20;
                    }
                } else if (player1Moves[i][j] == 9) {
                    p1Power = 2;
                } else {
                    p1Power = 1;
                }

                if (player2Moves[i][j] == 0 && player1Moves[i][j] != 3) {
                    games[_gameId].p1Attributes[0] -= 20 * p2Power;
                } else if (player2Moves[i][j] == 1 && player1Moves[i][j] != 4) {
                    games[_gameId].p1Attributes[1] -= 10 * p2Power;
                } else if (player2Moves[i][j] == 2 && player1Moves[i][j] != 5) {
                    games[_gameId].p1Attributes[2] -= 15 * p2Power;
                } else if (player2Moves[i][j] >= 6 && player1Moves[i][j] <= 8) {
                    if(player2Moves[i][j] == 6 && player1Moves[i][j] == 3) {
                        games[_gameId].p1Attributes[0] -= 5;
                    }else{
                        games[_gameId].p1Attributes[0] -= 20;
                    }
                    if(player2Moves[i][j] == 7 && player1Moves[i][j] == 4) {
                        games[_gameId].p1Attributes[1] -= 5;
                    }else{
                        games[_gameId].p1Attributes[1] -= 20;
                    }
                    if(player2Moves[i][j] == 8 && player1Moves[i][j] == 5) {
                        games[_gameId].p1Attributes[2] -= 5;
                    }else{
                        games[_gameId].p1Attributes[2] -= 20;
                    }
                } else if (player2Moves[i][j] == 9) {
                    p2Power = 2;
                } else {
                    p2Power = 1;
                }
            }
        }
        uint256 p1Score = (games[_gameId].p1Attributes[0] * 336) + (games[_gameId].p1Attributes[1] * 216) + (games[_gameId].p1Attributes[2] * 128);
        uint256 p2Score = (games[_gameId].p2Attributes[0] * 336) + (games[_gameId].p2Attributes[1] * 216) + (games[_gameId].p2Attributes[2] * 128);
        if(p1Score > p2Score){
            (bool sent, bytes memory data) = games[_gameId].player1.call{value: 2}("");
            require(sent, "Failed to send winning amount");
        }else{
            (bool sent, bytes memory data) = games[_gameId].player2.call{value: 2}("");
            require(sent, "Failed to send winning amount");
        }
        games[_gameId].isClaimed = true;
    }

    function verifyArray(uint256[3] calldata arr, bytes calldata signature, address signer) internal pure returns (bool) {
        // Create the message hash of the array
        bytes32 messageHash = keccak256(abi.encodePacked(arr));

        // Recover the address from the signature
        address recoveredAddress = messageHash.toEthSignedMessageHash().recover(signature);

        // Check if the recovered address is the expected signer address
        return recoveredAddress == signer;
    }
}

