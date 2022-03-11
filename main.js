// Import SHA256 Function
const SHA256 = require('crypto-js/sha256');

// Create a Block
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    // Calculate the Hash of blocks
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

// Create the Blockchain
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    // Create the Genesis block
    createGenesisBlock(){
        return new Block(0, "05/05/2001", "Genesis Block", "0");
    }

    // Get the Latest Block
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    // Add a new Block
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // Check for the validity of the block
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            // Check for the validity of the current block
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            // Check if a block points to the correct previous block
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

// Test our blockchain by creating a new coin called osbornCoin
let osbornCoin = new Blockchain();
osbornCoin.addBlock(new Block(1, "13/04/2020", {amount:4}));
osbornCoin.addBlock(new Block(2, "06/06/2020", {amount:10}));
osbornCoin.addBlock(new Block(3, "12/12/2020", {amount:88}));

// Test if a block is valid
console.log('Is blockchain valid? ' + osbornCoin.isChainValid());

// Try tampering with a coin to see if it will be valid
osbornCoin.chain[1].data = {amount: 5000};
// What if I act smart by recalculating a new hash for the block I've tampered with
osbornCoin.chain[1].hash = osbornCoin.chain[1].calculateHash();
console.log('Is blockchain valid? ' + osbornCoin.isChainValid());

// Run our blockchain to see how it looks like
//console.log(JSON.stringify(osbornCoin, null, 4));