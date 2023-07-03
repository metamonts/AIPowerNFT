// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IERC4907.sol";

contract PowerNFT is ERC721 {

    // using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct PowerProve {
        uint256 powerCount;
        uint256 consumePowerCount;
        address providerAddress;
        bytes proveData;
        uint256 connected;
        bool isDiscount;
        uint256 discountStartHour;
        uint256 discountEndHour;
        bool connecting;
        bool saling;
    }

    struct Provider {
        uint256 depositBalance;
        uint256 slashedBalance;
        string url;
        uint256 mintPowerRate;
    }


    mapping (uint256 => PowerProve) public powerProves;

    mapping (address => Provider) public providers;

    uint256 DEPOSIT_AMOUNT = 100 ether;
    uint256 MIN_DEPOSIT_AMOUNT = 30 ether;

    address public governance;
    address public market;

    event Slash(address indexed provider, uint256 amount);
    event RegisterProvider(address indexed provider, uint256 amount);
    event UnregisterProvider(address indexed provider);
    event ConnectingChange(uint256 indexed tokenId, uint256 indexed connectingState, uint256 time);
    event Consumed(uint256 indexed tokenId, uint256 indexed time, uint256 consumePowerCount);


    constructor(address _gov, address _market) ERC721("AI Power","AIP"){
        require(_gov != address(0), "The governance address is not correct");
        require(_market != address(0), "The market address is not correct");
        governance = _gov;
        market = _market;
     }

    
    modifier onlyGovernance() {
        require(msg.sender == governance, "Only governance can call this function.");
        _;

    }

    modifier onlyProvider() {
        require(providers[msg.sender].depositBalance >= 0, "Only provider can call this function.");
        _;
    }

    modifier onlyMarket() {
        require(msg.sender == address(market), "Only market can call this function.");
        _;
    }

     function mint(address to, address provider, uint256 imageCount) public virtual onlyMarket() returns(uint256) {
        require(providers[provider].depositBalance >= MIN_DEPOSIT_AMOUNT, "You have not enough deposit");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);

        powerProves[tokenId] = PowerProve(imageCount, 0,  provider, "", 0, false, 0, 0, false, false ); 

        return tokenId;
     }

     function consume(uint256 tokenId, uint256 consumePower, bytes memory prove) external {
        PowerProve storage info = powerProves[tokenId];

        require(info.providerAddress == msg.sender, "You are not the providers of this token" );
        require(info.connected == 1, "The token has not connected");

        require(info.powerCount >= consumePower, "The tokenId don't have enough works to consume" );
        require(prove.length > 0, "The prove data is not correct" );

        info.powerCount -= consumePower;
        info.consumePowerCount += consumePower;
        info.proveData = prove;

        emit Consumed(tokenId, block.timestamp, consumePower);
     }


    function providerOf(uint256 tokenId) public view returns(address){
        return powerProves[tokenId].providerAddress;
    }

    function registerProvider(string memory _url) external payable {
        
        require(msg.value == DEPOSIT_AMOUNT, "The deposit amount is not equal 100 ether");

        Provider storage provider = providers[msg.sender];
        require(provider.depositBalance == 0, "You have already registered");

        provider.depositBalance = msg.value;
        provider.url = _url;

        emit RegisterProvider(msg.sender, msg.value);
    }

    function unregisterProvider() external {
        Provider storage provider = providers[msg.sender];

        require(provider.depositBalance > 0, "You have not registered");
        
        uint256 balance = provider.depositBalance;
        provider.depositBalance = 0;
        provider.url = "";
        payable(msg.sender).transfer(balance);

        emit UnregisterProvider(msg.sender);
    }

    function slashProvider(address providerAddress, uint256 amount) external onlyGovernance {
        Provider storage provider = providers[providerAddress];

        require(provider.depositBalance >= amount, "The amount is too large");
        provider.depositBalance -= amount;
        provider.slashedBalance += amount;
    }

    function merge(uint256[] memory _tokenIds) external  {

        uint len = _tokenIds.length;

        for (uint i = 0; i < len; i++) {
            require(ownerOf(_tokenIds[i]) == msg.sender, "You are not the owners of these tokens" );
        }

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);

        PowerProve storage info = powerProves[tokenId];
        info.providerAddress = msg.sender;

        for (uint i = 0; i < len; i++) {
            PowerProve storage item = powerProves[_tokenIds[i]];
            info.powerCount += item.powerCount;
        }
    }

    function connect(uint256 _tokenId) external {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owners of this token" );

        PowerProve storage info = powerProves[_tokenId];

        require(info.connected == 0, "The token has been connected");
        info.connected = 1;

        emit ConnectingChange(_tokenId, 1, block.timestamp);
    }

    function discount(uint256 _tokenId) external {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owners of this token" );
        PowerProve storage info = powerProves[_tokenId];

        require(info.connected > 0, "The token has been discounted");

        info.connected = 0;

        emit ConnectingChange(_tokenId, 0, block.timestamp);
    }

    function tokenState(uint256 _tokenId) external view returns(uint256 connecting, uint256 saling,  uint256 consumedPower) {
        PowerProve storage info = powerProves[_tokenId];
        return false, false, info.consumePowerCount;
    }

}