const { ethers } = require('ethers');
require('dotenv').config();

// Sepolia provider
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

// Credentials setup
const address = `${process.env.ADDRESS}`;
const privateKey = `${process.env.PRIVATE_KEY}`;
const signer = new ethers.Wallet(privateKey, provider);
