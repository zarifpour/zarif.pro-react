//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract AdvertisementAuction is Ownable {
    
    address constant public zebraToken = 0xeED62950d07f80d2890B418871055846ACB6b9d0;
    address public advertiser;
    
    string public adText;
    string public adImageUrl;
    
    uint256 public lastBid;
    uint256 public bidTimeStamp;
    uint256 public advertisementId;

    IERC20 Token = IERC20(zebraToken);

    event PublishAdvertisement(
        uint256 indexed id,
        address indexed creator,
        string text,
        string url,
        uint256 bid,
        uint256 timestamp
    );

    event Withdrawal(uint256 amount);
    
    function bid(string memory _adText, string memory _adImageUrl, uint256 _amount) external {
        if (block.timestamp < bidTimeStamp + 24 hours) {
            require(_amount > lastBid, "Your bid is lower than the last bid.");
        } else {
            advertiser = msg.sender;
            adText = _adText;
            adImageUrl = _adImageUrl;
            lastBid = _amount;
            bidTimeStamp = block.timestamp;
            advertisementId = advertisementId + 1;
        }

        emit PublishAdvertisement(
            advertisementId,
            msg.sender,
            adText,
            adImageUrl,
            lastBid,
            bidTimeStamp
        );
    }

    function withdraw() external onlyOwner() {
        require(Token.balanceOf(address(this)) > 0, "There is nothing to withdraw.");
        Token.transfer(msg.sender, Token.balanceOf(address(this)));
        emit Withdrawal(Token.balanceOf(address(this)));
    }
}