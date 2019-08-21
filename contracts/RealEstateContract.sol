pragma solidity ^0.4.24;

contract RealEstateContract {
    address public contractOwner;

    struct RealEstate {
        uint id;
        uint price;
        address owner;
    }

    mapping (uint => RealEstate) public realEstates;

    constructor() public {
        contractOwner = msg.sender;
    }

    function createRealEstate(uint _id, uint _price) public payable {
        require(realEstates[_id].id == 0);
        realEstates[_id] = RealEstate(_id, _price, msg.sender);
    }

    function buyRealEstate(uint _id) public payable {
        require(realEstates[_id].id != 0);
        RealEstate memory realEstate = realEstates[_id];
        require(realEstate.price <= msg.value);
        realEstate.owner.transfer(msg.value);
        realEstates[_id] = RealEstate(realEstate.id, realEstate.price, msg.sender);
    }

    function getOwner(uint _id) public view returns (address) {
        require(realEstates[_id].id != 0);
        RealEstate memory realEstate = realEstates[_id];
        return (realEstate.owner);
    }
}
