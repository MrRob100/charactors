// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
//import "hardhat/console.sol";

contract Characters {

    struct Character {
        uint id;
        string name;
        string phrases;
        uint votes;
        address creator;
    }

//    Character[] characters;

    mapping(uint => Character) characters;

    uint characterNextKey;

    function addCharacter(string memory _name, string memory _phrases) public {
        characters[characterNextKey] = Character(characterNextKey, _name, _phrases, 0, msg.sender);
        characterNextKey++;
    }

    function getCharacters() public view returns (Character[] memory) {
        Character[] memory values = new Character[](characterNextKey);
        for (uint i = 0; i < characterNextKey; i++) {
            values[i] = characters[i];
        }

        return values;
    }

    function addVoteToCharacter(uint _id) public {
        characters[_id].votes = characters[_id].votes + 1;
    }

    function getCharacter(uint _id) public view returns (Character memory) {
        Character[] memory data = new Character[](characterNextKey);
        data[0] = characters[_id];

        return data[0];
    }

    function getCharacterNextKey() public view returns (uint) {
        return characterNextKey;
    }
}