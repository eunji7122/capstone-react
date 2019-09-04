pragma solidity ^0.4.24;

contract RealEstateContract {
    address public contractOwner;

    struct RealEstate {
        int id;
        int price;
        address owner;
    }

    mapping (int => RealEstate) public realEstates;

    constructor() public {
        contractOwner = msg.sender;
    }

    function createRealEstate(int _id, int _price) public payable {
        require(realEstates[_id].id == 0);
        realEstates[_id] = RealEstate(_id, _price, msg.sender);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function deposit() public payable {  
        
    } 

    // function buyRealEstate(int _id) public payable {
    //     require(realEstates[_id].id != 0);
    //     RealEstate memory realEstate = realEstates[_id];
    //     require(realEstate.price <= msg.value);
    //     realEstate.owner.transfer(msg.value);
    //     realEstates[_id] = RealEstate(realEstate.id, realEstate.price, msg.sender);
    // }

    function transfer(uint _value) public returns (bool) {
        require(getBalance() >= _value);
        msg.sender.transfer(_value);
        return true;
    }

    // function getOwner(int _id) public view returns (address) {
    //     require(realEstates[_id].id != 0);
    //     RealEstate memory realEstate = realEstates[_id];
    //     return (realEstate.owner);
    // }
}
