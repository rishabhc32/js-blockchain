const CryptoJS = require('crypto-js');

class Block {
	constructor(index, previousHash, data){
		this.index = index;
		this.previousHash = previousHash;
		this.timestamp = Math.floor(Date.now() / 1000);
		this.data = data;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return CryptoJS.SHA256(	this.index.toString() + 
								this.previousHash.toString() + 
								this.timestamp.toString() + 
								this.data.toString() 
								).toString();
	}

	isStructureValid() {
	return typeof this.index === 'number'
		&& typeof this.hash === 'string'
		&& typeof this.previousHash === 'string'
		&& typeof this.timestamp === 'number'
		&& typeof this.data === 'string'
	}
}

function isNewBlockValid(newBlock, previousBlock){
	if(newBlock.index === 0)
		return false;
	else if(previousBlock.index+1 !== newBlock.index)
		return false;
	else if(previousBlock.hash !== newBlock.previousHash)
		return false;
	else if(newBlock.calculateHash() !== newBlock.hash)
		return false;

	return true;
};

function isChainValid(chain){
	if(JSON.stringify(chain[0]) !== JSON.stringify(genesisBlock))
		return false;
	for (let i = 1; i < chain.length; i++) {
		if( !isNewBlockValid(chain[i], chain[i-1]) )
			return false;
	}
	return true;
};

function getLatestBlock(){
	return blockchain[blockchain.length - 1];
};

function getBlockchain(){
	return blockchain;
};

const generateBlock = function(data){
	const previousBlock = getLatestBlock();
	const newBlock = new Block(previousBlock.index+1, previousBlock.hash, data);
	return newBlock;
};

const genesisBlock = new Block( 0, '', 'RC');
var blockchain = [genesisBlock];
//let b = generateBlock('Saumil');
blockchain[1] = generateBlock('Saumil');
if(blockchain[1].isStructureValid() && isChainValid(blockchain))
	console.log('Done bro!');
else
	console.log('Error in blockchain structure');