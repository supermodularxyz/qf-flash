// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QFToken is ERC20, Ownable {
    enum Role {
        Unset,
        Sender,
        Receiver
    }

    mapping(address => Role) private roles;
    mapping(address => bytes32) private names;

    event SetRole(address indexed owner, Role role);
    event SetName(address indexed owner, bytes32 name);

    constructor() ERC20("QF Token", "QFT") {}

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        require(
            msg.sender == owner() ||
                (roles[from] == Role.Sender && roles[to] == Role.Receiver),
            "Must fulfill roles"
        );
        super._beforeTokenTransfer(from, to, amount);
    }

    function getRole(address _address) public view returns (Role) {
        return roles[_address];
    }

    function setRole(address _address, Role _role) public onlyOwner {
        roles[_address] = _role;
        emit SetRole(_address, _role);
    }

    function getName(address _address) public view returns (bytes32) {
        return names[_address];
    }

    function setName(bytes32 _name) public {
        names[msg.sender] = _name;
        emit SetName(msg.sender, _name);
    }
}
