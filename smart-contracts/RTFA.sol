// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract RTFA is ERC721URIStorage {
    uint256 private _nextTokenId;
    address public rootAddress;
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;
      constructor(address _rootAddress) ERC721("RTFArena", "RTFA") {
        rootAddress = _rootAddress;
      }

    function buy(uint256[] memory arr, bytes memory signature, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        require(msg.value == 5 ether, "Incorrect ETH value");
        require(verifyArray(arr, signature), "Invalid signature");
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    function verifyArray(uint256[] memory arr, bytes memory signature) internal view returns (bool) {
        // Create the message hash of the array
        bytes32 messageHash = keccak256(abi.encodePacked(arr));

        // Recover the address from the signature
        address recoveredAddress = messageHash.toEthSignedMessageHash().recover(signature);

        // Check if the recovered address is the expected signer address
        return recoveredAddress == rootAddress;
    }
}