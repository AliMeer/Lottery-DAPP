pragma solidity ^0.4.17;

contract CampaignFactory    {
    address[] private deployedCampaigns;
    
    function createCampaign(uint min) public    {
        address newCampaign = new Campaign(min, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[])  {
        return deployedCampaigns;
    }
}

contract Campaign    {
    
    address public manager;
    uint private minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint min, address sender) public {
        manager = sender;
        minimumContribution = min;
        
    }

    function getManager() public restricted view returns(address){
        return manager;
    }

    function getMininumContribution() public restricted view returns(uint){
        return minimumContribution;
    }
    
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        //approvers.push(msg.sender);
        approversCount++;
    }

    function createRequest(string desc, uint value, address recipient) public restricted  {
        Request memory newRequest = Request({
            description: desc,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
 
    function approveRequest(uint index) public {
        
        Request storage req = requests[index];
        
        require(approvers[msg.sender]);
        require(!req.approvals[msg.sender]);
        
        req.approvals[msg.sender] = true;
        req.approvalCount++;
   
    }
    
    function finaliseRequest(uint index) public restricted  {
        Request storage req = requests[index];
        
        require(!req.complete);
        require(req.approvalCount > (approversCount/2));
        req.recipient.transfer(req.value);
        req.complete = true;
    }    
}


contract Lottery    {
    address public manager;
    address public lastWinner;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);
        
        players.push(msg.sender);
    }

    function random() private view returns(uint) {
        //return uint(block.difficulty);
        return uint(keccak256(abi.encodePacked(block.difficulty, block.number,players)));
    }

    function pickWinner() public{
        uint index = random()%players.length;
        players[index].transfer(address(this).balance);
        lastWinner = players[index];
        players = new address[](0);
    }

    function getPlayers() public view returns(address[])    {
        return players;
    }

    function getPot() public view returns(uint) {
        return address(this).balance;
    }
}