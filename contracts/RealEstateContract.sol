pragma solidity ^0.5.6;

contract RealEstateContract {
    address payable contractOwner;

    struct RealEstate {
        uint id;
        uint price;
        address payable owner;
    }

    mapping (uint => RealEstate) public realEstates;

    constructor() public {
        contractOwner = msg.sender;
    }

    function createRealEstate(uint _id, uint _price) public returns (uint, uint, address) {
        require(realEstates[_id].id == 0, "Item ID already exist");
        realEstates[_id] = RealEstate(_id, _price, msg.sender);
        return(realEstates[_id].id, realEstates[_id].price, contractOwner);
    }

    function getItem(uint _id) public view returns (uint, uint, address) {
        require(realEstates[_id].id != 0, "Item doesn't exist");
        return(_id, realEstates[_id].price, realEstates[_id].owner);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function buyRealEstate(uint _id) public payable {
        require(realEstates[_id].id != 0, "Item doesn't exist");
        RealEstate memory realEstate = realEstates[_id];
        require(realEstate.price <= msg.value * 10000);
        realEstate.owner.transfer(msg.value);
        realEstates[_id] = RealEstate(realEstate.id, realEstate.price, msg.sender);
    }

    function deposit() public payable {
    }

    function transfer(uint _value, address payable owner) public returns (bool) {
        // require(getBalance() >= _value);
        owner.transfer(_value);
        return true;
    }
}
