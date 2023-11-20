// SPDX-License-Identifier: GPL-3.0
pragma solidity ^ 0.8.9;

import "./library/RBAC.sol";

contract MHM2023 {
    
    using Roles for Roles.Role;

    Roles.Role private _admins;

    event Mint(address indexed minter, uint256 indexed mintId);
    event Burn(address indexed burner , uint256 indexed mintId);
    event TransferFrom(address indexed from, address indexed to, uint256 mintId);
    event Transfer(address indexed from, address indexed to, uint256 mintId);
    event Approve(address indexed approver , uint256 indexed mintId);

    struct Document {
        address landlor;
        address owner;
        address approver;
        bool lock;
        bool sellPosition;
    }

    mapping(uint256 => Document) private docInstruct;

    constructor(){
        // set msg.sender for first admin collection    
        _admins.add(msg.sender);
    }

    modifier onlyAdmin (){
        require(_admins.has(msg.sender) , "DOSE_NOT_HAVE_ADMIN_ROLE");
        _;
    }
    
    function addAdmin(address walletAddress) public onlyAdmin(){
              _admins.add(walletAddress);
    }

    function removeAdmin(address walletAddress) public onlyAdmin(){
        _admins.remove(walletAddress);
    }

    function mint(uint256 mintId) public onlyAdmin() {
        require(docInstruct[mintId].landlor == address(0),"mintId already exist");
        docInstruct[mintId].landlor = msg.sender;
        docInstruct[mintId].owner = msg.sender;

        assert((docInstruct[mintId].landlor == msg.sender)&&(docInstruct[mintId].owner == msg.sender));
        emit Mint(msg.sender, mintId);
    }

    function transfer(uint256 mintId, address to) public {
        require(docInstruct[mintId].lock != true , "documents must be locked");
        require(docInstruct[mintId].landlor == msg.sender, "Just landlor can transfer");

        docInstruct[mintId].landlor = to;
        
        assert(docInstruct[mintId].landlor == to);
        emit Transfer(msg.sender, to, mintId);
    }

    function transferFrom(address from , address to , uint256 mintId) public {

        require(to != address(0) , "receiver address was not valid");
        require(docInstruct[mintId].owner != address(0), "mintId was empty");
        require(msg.sender == docInstruct[mintId].approver , "Just approver can tranferFrom");
    
        docInstruct[mintId].landlor = to;
        docInstruct[mintId].approver = address(0);

        assert((docInstruct[mintId].landlor == to) && (docInstruct[mintId].approver == address(0)));
        emit TransferFrom(from, to, mintId);
    }

    function approver(address approverAddress, uint256 mintId) public {
        
        require(docInstruct[mintId].owner != address(0), "mintId was not valid");
        require(docInstruct[mintId].lock != true , "document was locked");
        require((docInstruct[mintId].approver == address(0)) || (docInstruct[mintId].approver == docInstruct[mintId].landlor),"Approver already exists");
        require(msg.sender == docInstruct[mintId].landlor , "Just landldor can approve");

        docInstruct[mintId].approver = approverAddress;
        
        assert(docInstruct[mintId].approver == approverAddress);
        emit Approve(approverAddress, mintId);
    }

    function lock(uint256 mintId) public{
        require((msg.sender == docInstruct[mintId].owner) || (msg.sender == docInstruct[mintId].approver), "your not owner");
        require(docInstruct[mintId].lock == false , "mintId already locked");
        docInstruct[mintId].lock = true;
        assert(docInstruct[mintId].lock == true);
    }

    function unlock(uint256 mintId) public {
        require((docInstruct[mintId].approver == msg.sender)||(docInstruct[mintId].owner == msg.sender) , "your not approver");
        require(docInstruct[mintId].lock == true , "mint id was unlock");
        docInstruct[mintId].lock = false;
        assert(docInstruct[mintId].lock == false);
    }

    function burn(uint256 mintId) public onlyAdmin(){
        require(msg.sender == docInstruct[mintId].owner, "your not owner");

        delete docInstruct[mintId];

        assert(docInstruct[mintId].owner == address(0));

        emit Burn(msg.sender, mintId);

    }

    function ownerOf(uint256 mintId) public onlyAdmin() view returns(address){
        require(docInstruct[mintId].landlor != address(0) , "mintId was not valid");
        return docInstruct[mintId].owner;
    }

    function landlordOf(uint256 mintId) public onlyAdmin() view returns (address){
        require(docInstruct[mintId].landlor != address(0) , "mintId was not valid");
        return docInstruct[mintId].landlor;
    }

    function approverOf(uint256 mintId) public onlyAdmin() view returns (address){
        require(mintId != 0 , "mintId was not exist");
        require(docInstruct[mintId].landlor != address(0) , "mintId was not valid");
        return docInstruct[mintId].approver;
    }

}