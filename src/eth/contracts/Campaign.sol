// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract Factory {
    Campaign[] public deployedCampaigns;
    mapping(address => Campaign[]) public donatedTo;
    mapping(address => Campaign[]) public myCampaigns;

    event DeployedAt(Campaign loc);

    function createCampaign(uint minimum, string memory titleCont, string memory descriptionCont) public {
        Campaign newCampaign = new Campaign(minimum, titleCont, descriptionCont, msg.sender, address(this));
        deployedCampaigns.push(newCampaign);
        addMyCampaigns(msg.sender, newCampaign);
        emit DeployedAt(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }

    function allMyCampaigns(address index) public view returns (Campaign[] memory){
        return myCampaigns[index];
    }

   function allMyDonatedTo(address index) public view returns (Campaign[] memory){
        return donatedTo[index];
    }

    function addDonatedTo(address donator, Campaign donatedToFunc) public  {
        Campaign[] storage addedDonations = donatedTo[donator];
        addedDonations.push(donatedToFunc);
        donatedTo[donator] = addedDonations;
    }

    function addMyCampaigns(address manager, Campaign newCampaign) public  {
        Campaign[] storage campaigns = myCampaigns[manager];
        campaigns.push(newCampaign);
        myCampaigns[manager] = campaigns;
    }
}

contract Campaign  {
    struct Transaction {
        string description;
        uint value;
        address recipient;
    }
    
    struct Donation {
        uint amount;
        string comment;
    }

    struct Donator {
        bool exists;
        string name;
        uint date;
        Donation[] donations;
    }
    address public originalFactory;
    address public manager;
    uint public minimumContribution;
    string public title;
    string public description;
    address[] public membersList;
    mapping(address => Donator) public members;
    Transaction[] public transactions;

    constructor (uint minimum, string memory titleCont, string memory descriptionCont, address managerCont, address originalFactoryCont) {
        manager = managerCont;
        minimumContribution = minimum;
        title = titleCont;
        description = descriptionCont;
        originalFactory = originalFactoryCont;
    }
    
    function getDonations (address donator) public view returns(Donation[]memory){
        return (members[donator].donations);
    }

    function getMemberList () public view returns(address[]memory){
        return membersList;
    }

   function getTransactions () public view returns(Transaction[]memory){
        return transactions;
    }

    function newDonatorContribution(string memory nameDonator, string memory commentDonator) public payable {
        require(msg.value > minimumContribution);
        require(!members[msg.sender].exists);
        membersList.push(msg.sender);
        Donator storage newDonator = members[msg.sender];
        newDonator.name = nameDonator;
        newDonator.date = block.timestamp;
        newDonator.exists = true;

        Donation memory newDonation = Donation({amount: msg.value, comment:commentDonator});
        newDonator.donations.push(newDonation);
        Factory factory = Factory(originalFactory);
        factory.addDonatedTo(msg.sender, this);
    }

    function addDonation(string memory commentDonator) public payable {
        require(msg.value > minimumContribution);
        require(members[msg.sender].exists);

        Donator storage donor = members[msg.sender];
        Donation memory newDonation = Donation({amount: msg.value, comment:commentDonator});

        donor.donations.push(newDonation);
    }

    function makeTransaction (string memory descriptionTransact, uint amountTransact, address recipientTransact)public{
        require(msg.sender == manager);
        Transaction memory newTransaction = Transaction({
            description: descriptionTransact,
            value: amountTransact,
            recipient: recipientTransact
        });

        payable(recipientTransact).transfer(amountTransact);
        transactions.push(newTransaction);
    }

    function balance () public view returns(uint256){
        return address(this).balance;
    }
}