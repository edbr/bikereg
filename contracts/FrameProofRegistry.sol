// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FrameProofRegistry is ERC721Enumerable, Ownable {
    struct Bike {
        string nickname;
        string brand;
        string model;
        uint16 year;
        string serialNumber;
        string color;
        string imageUri;
        uint256 registeredAt;
    }

    uint256 private _nextTokenId = 1;

    mapping(uint256 => Bike) private _bikes;

    event BikeRegistered(uint256 indexed tokenId, address indexed owner, string serialNumber);
    event BikeTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor() ERC721("FrameProof Bicycle Registry", "FRAME") {}

    function registerBike(
        string calldata nickname,
        string calldata brand,
        string calldata model,
        uint16 year,
        string calldata serialNumber,
        string calldata color,
        string calldata imageUri
    ) external returns (uint256 tokenId) {
        require(bytes(nickname).length > 0, "Nickname required");
        require(bytes(brand).length > 0, "Brand required");
        require(bytes(model).length > 0, "Model required");
        require(year >= 1900 && year <= 9999, "Invalid year");
        require(bytes(serialNumber).length > 0, "Serial required");
        require(bytes(color).length > 0, "Color required");

        tokenId = _nextTokenId++;

        _safeMint(msg.sender, tokenId);
        _bikes[tokenId] = Bike({
            nickname: nickname,
            brand: brand,
            model: model,
            year: year,
            serialNumber: serialNumber,
            color: color,
            imageUri: imageUri,
            registeredAt: block.timestamp
        });

        emit BikeRegistered(tokenId, msg.sender, serialNumber);
    }

    function getBike(uint256 tokenId) external view returns (Bike memory) {
        require(_exists(tokenId), "Bike not found");
        return _bikes[tokenId];
    }

    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }

        return tokenIds;
    }

    function exists(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }

    function _afterTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal override {
        super._afterTokenTransfer(from, to, firstTokenId, batchSize);

        if (from != address(0) && to != address(0) && from != to) {
            emit BikeTransferred(firstTokenId, from, to);
        }
    }
}
