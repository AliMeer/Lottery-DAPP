pragma solidity ^ 0.4 .24;

contract Lottery {
    /**@manager stores address of the contract owner
     * this is also the address that deployed the contract
     * @players an array of address types which stores 
     * public address of all lottery entries
     * @playerNames an array of string types which stores
     * names of all the players.
     * @previousPlayers an array of address types which stores
     * the address list of players from the previous game
     * @previousNames an array od string type which stores
     * names of players from the previous game
     * @previousAddy address of player from previous game who won the lottery
     * @previousName Name of player who won previous game
     * 
     */
    address private manager;
    address[] public players;
    string[] public playerNames;
    address[] public previousPlayers;
    string[] public previousNames;
    address public previousAddy;
    string public previousName;
    uint256 public previousPot;

    constructor() public {
        manager = msg.sender;
    }

    function enter(string name) public payable {
        require(msg.value > 0.01 ether);

        if (
            keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("")) ||
            keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("0"))
        ) {

            name = "Anonymous";
        }

        players.push(msg.sender);
        playerNames.push(name);

        if (players.length > 4) {
            chooseWinner();
        }
    }

    function random() private view returns(uint) {
        //return uint(block.difficulty);
        return uint(keccak256(abi.encodePacked(block.difficulty, block.number, now)));
    }

    function chooseWinner() private {
        uint index = random() % players.length;
        previousPot = (this).balance;
        players[index].transfer(address(this).balance);
        previousAddy = players[index];
        previousName = playerNames[index];
        previousNames = playerNames;
        previousPlayers = players;
        players = new address[](0);
        playerNames = new string[](0);
    }

    function getPot() public view returns(uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns(address[])    {
        return players;
    }

    function getPreviousPlayers() public view returns(address[])    {
        return previousPlayers;
    }

}