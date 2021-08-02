//SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function balanceOf(address account) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract Faucet is Ownable {
    address public constant zebraToken =
        0xeED62950d07f80d2890B418871055846ACB6b9d0;
    IERC20 Token = IERC20(zebraToken);

    uint8 private constant TOKEN_DECIMALS = 18;
    uint256 public constant waitTime = 5 minutes;

    mapping(address => uint256) lastAccessTime;

    // receive() external payable {}

    function withdraw() external allowedToWithdraw {
        Token.transfer(msg.sender, 100 * (10**TOKEN_DECIMALS));
        lastAccessTime[msg.sender] = block.timestamp;
    }

    function liquidate(uint256 _amount) external onlyOwner {
        require(
            Token.balanceOf(address(this)) > 0,
            "Faucet balance insufficient."
        );
        if (_amount == 0) {
            _amount = Token.balanceOf(address(this));
        }
        Token.transfer(msg.sender, _amount);
    }

    modifier allowedToWithdraw() {
        require(
            Token.balanceOf(address(this)) > 100 * (10**TOKEN_DECIMALS),
            "Faucet balance insufficient."
        );
        require(
            block.timestamp >= lastAccessTime[msg.sender] + waitTime,
            "You must wait 5 minutes between withdrawals."
        );
        _;
    }
}
