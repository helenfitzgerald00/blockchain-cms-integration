const Web3 = require('web3');

// Assuming you have an Ethereum provider URL (e.g., Infura, Alchemy)
const provider = 'your_ethereum_provider_url';
const web3 = new Web3(provider);

// Your smart contract ABI and address
const contractABI = require('./YourContractABI.json');
const contractAddress = 'your_contract_address';

async function mintNFT(toAddress, tokenId, tokenURI) {
    // Initialize your contract with Web3
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // The account that performs the transaction must be unlocked to sign transactions
    const fromAddress = 'your_ethereum_account_address';
    const privateKey = 'your_private_key'; // Highly sensitive, handle with care

    const data = contract.methods.mint(toAddress, tokenId, tokenURI).encodeABI();

    const tx = {
        from: fromAddress,
        to: contractAddress,
        gas: 2000000, // Set gas limit
        data: data,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return receipt;
}

module.exports = { mintNFT };
