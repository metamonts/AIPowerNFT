// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AiPowerNFT.sol";


contract Market {

    using Counters for Counters.Counter;

    Counters.Counter private _itemIds;
    Counters.Counter private _secondSaleItemIds;

    PowerNFT public nft;

    struct MarketItem {
        uint256 itemId;
        address provider;
        uint256 price;
        bool isDiscount;
        uint256 discountStartHours;
        uint256 discountEndHours;
    }

    struct SecondSaleItem {
        uint256 tokenId;
        address seller;
        uint256 price;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => SecondSaleItem) private idToSecondSaleItem;

    event MarketItemUpdated(
        uint256 indexed itemId,
        address indexed provider,
        uint256 price
    );

    event MarketItemCanceled(
        uint256 indexed itemId,
        address indexed provider
    );

    event Mint(
        uint256 indexed tokenId,
        address indexed receiver,
        address indexed provider
    );

    event SecondSaleItemCreated(
        uint256 indexed itemId,
        address indexed seller,
        uint256 price
    );

    event SecondSaleItemCanceled(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address indexed seller
    );


    constructor(address power_nft) {
        nft = PowerNFT(power_nft);
    }

    function createNewSaleItem(address provider, uint256 price) external returns (uint256) {
        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        emit MarketItemUpdated(itemId, provider, price);

        return itemId;
    }

    function updateNewSalePrice(uint256 itemId, uint256 price) external {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.provider == msg.sender, "You are not the owner of this item");

        item.price = price;
        emit MarketItemUpdated(itemId, item.provider, price);
    }


    function buyNew(uint256 itemId, uint256 imageCount) external payable {
        MarketItem storage item = idToMarketItem[itemId];

        require(msg.value == item.price * imageCount, "Please submit the asking price in order to complete the purchase");
    
        uint256 tokenId = nft.mint(msg.sender, item.provider, imageCount);

        payable(item.provider).transfer(msg.value);

        emit Mint(tokenId, msg.sender, item.provider);
    }


    function cancelNewSale(uint256 itemId) external {
        require(idToMarketItem[itemId].provider == msg.sender, "You are not the owner of this item");

        delete idToMarketItem[itemId];

        emit MarketItemCanceled(itemId, msg.sender);
    }

    function createSecondSaleItem(uint256 tokenId, uint256 price) external {
        require(nft.ownerOf(tokenId) == msg.sender, "You are not the owner of this item");

        nft.transferFrom(msg.sender, address(this), tokenId);

        idToSecondSaleItem[tokenId] =  SecondSaleItem(
            tokenId,
            msg.sender,
            price
        );

        _secondSaleItemIds.increment();
    }

    function updateSecondSalePrice(uint256 itemId, uint256 price) external {
        SecondSaleItem storage secondSaleItem = idToSecondSaleItem[itemId];
        require(secondSaleItem.seller == msg.sender, "You are not the owner of this item");

        secondSaleItem.price = price;
    }

    function cancelSecondSaleItem(uint256 item) external {
        SecondSaleItem storage secondSaleItem = idToSecondSaleItem[item];
        require(secondSaleItem.seller == msg.sender, "You are not the owner of this item");

        nft.transferFrom(address(this), msg.sender, secondSaleItem.tokenId);
        delete idToSecondSaleItem[item];
    }

    function buySecondSaleItem(uint256 itemId) external payable {
        SecondSaleItem storage secondSaleItem = idToSecondSaleItem[itemId];

        require(msg.value == secondSaleItem.price, "Please submit the asking price in order to complete the purchase");

        nft.transferFrom(address(this), msg.sender, secondSaleItem.tokenId);

        payable(secondSaleItem.seller).transfer(msg.value);

        delete idToSecondSaleItem[itemId];
    }

}