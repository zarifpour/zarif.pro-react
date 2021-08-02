//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZebraToken is ERC20, Ownable {
    string private TOKEN_NAME = "Zebra Token";
    string private TOKEN_SYMBOL = "ZBRA";

    uint8 private constant TOKEN_DECIMALS = 18;

    uint256 private constant TOTAL_SUPPLY = 1000000 * (10**TOKEN_DECIMALS);

    constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}
