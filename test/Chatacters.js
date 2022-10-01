const { expect } = require("chai");
const { ethers } = require("hardhat");

require("@nomiclabs/hardhat-waffle");

describe("Characters", function () {
    let contract;
    let owner;

    beforeEach(async function () {

        //get contract
        const Characters = await ethers.getContractFactory("Characters");

        //deploy contract passing in any constructor args
        const characters = await Characters.deploy();

        //wait till actually deployed
        contract = await characters.deployed();

        [owner] = await ethers.getSigners();
    });

    it("Should be able to list all characters", async function() {
        await contract.addCharacter("Cobble", '{"0": "wheres the cog", "1": "wreck the bed"}', 'test.png');
        await contract.addCharacter("Thie", '{"0": "pandas", "1": "sean paul is the best"}', 'test.png');

        let retrievedCharacters = await contract.getCharacters();
        let phrases0 = JSON.parse(retrievedCharacters[0]["phrases"]);
        let phrases1 = JSON.parse(retrievedCharacters[1]["phrases"]);

        expect(retrievedCharacters[0]["name"]).to.equal("Cobble");

        expect(phrases0[0]).to.equal('wheres the cog');
        expect(phrases0[1]).to.equal('wreck the bed');

        expect(phrases1[0]).to.equal('pandas');
        expect(phrases1[1]).to.equal('sean paul is the best');

        expect(retrievedCharacters[1]["name"]).to.equal("Thie");
    });

    it("Should be able to add vote to a character", async function() {
        await contract.addCharacter("Vince", '{"0": "wheres the phone", "1": "planetary"}', 'test.png');
        let nextKey = await contract.getCharacterNextKey();
        await contract.addVoteToCharacter(nextKey - 1);
        let votedCharacter = await contract.getCharacter(nextKey - 1);

        expect(votedCharacter.votes).to.equal(1);
    });

    it("Should be able to retrieve a character", async function() {
        await contract.addCharacter("Clarence Anders", '{"0": "by no means", "1": "by all means"}', 'test.png');
        let nextKey = await contract.getCharacterNextKey();
        let character = await contract.getCharacter(nextKey - 1);
        expect(character.name).to.equal("Clarence Anders");
        let phrases = JSON.parse(character.phrases);
        expect(phrases[0]).to.equal("by no means");
        expect(phrases[1]).to.equal("by all means");
    });
    
    it("Should be able to mark character as innactive", async function() {
        await contract.addCharacter("Steph Sharpe", '{"0": "will be inactive", "1": "go away"}', 'test.png');
        let nextKey = await contract.getCharacterNextKey();
        let activeCharsCount = await contract.getActiveCharactersCount();
        expect(activeCharsCount).to.equal(1);
        await contract.deleteCharacter(nextKey - 1);
        let activeCharsCountPostDelete = await contract.getActiveCharactersCount();
        expect(activeCharsCountPostDelete).to.equal(0);
        let charsPostDelete = await contract.getCharacters();
    })

    it("Should be able to update a character", async function() {
        await contract.addCharacter("Suzi Chazinho", '{"0": "edit this", "1": "go away"}', 'test.png');
        let nextKey = await contract.getCharacterNextKey();
        await contract.updateCharacter(nextKey - 1, 'Sophi Caffezinho', '{"0": "rain again"}', 'test.png');
        let updatedChar = await contract.getCharacter(nextKey - 1);
        expect(updatedChar.name).to.equal('Sophi Caffezinho');
        let phrases = JSON.parse(updatedChar.phrases);
        expect(phrases[0]).to.equal("rain again");
    })
});