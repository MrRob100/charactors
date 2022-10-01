// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

// Uncomment this line to use console.log
//import "hardhat/console.sol";

contract Characters {

    struct Character {
        uint id;
        string name;
        string phrases;
        string image;
        uint votes;
        bool active;
        address creator;
    }

//    Character[] characters;

    mapping(uint => Character) characters;

    uint characterNextKey;

    uint activeCharactersCount;

    function addCharacter(string memory _name, string memory _phrases, string memory _image) public {
        characters[characterNextKey] = Character(characterNextKey, _name, _phrases, _image, 0, true, msg.sender);
        characterNextKey++;
        activeCharactersCount++;
    }

    function getCharacters() public view returns (Character[] memory) {
        Character[] memory values = new Character[](characterNextKey);
        for (uint i = 0; i < characterNextKey; i++) {
            if(characters[i].active) {
                values[i] = characters[i];
            }
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

    function getActiveCharactersCount() public view returns (uint) {
        return activeCharactersCount;
    }

    function deleteCharacter(uint _id) public {
        characters[_id].active = false;
        activeCharactersCount--;
    }

    function updateCharacter(uint _id, string memory _name, string memory _phrases, string memory _image) public {
        characters[_id].name = _name;
        characters[_id].phrases = _phrases;
        characters[_id].image = _image;
    }
}