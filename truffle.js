const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

const privateKey = fs.readFileSync(".secret").toString().trim();
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

module.exports = {
  networks: {
    klaytn: {
      provider: () => new HDWalletProvider(privateKey, "https://api.baobab.klaytn.net:8651"),
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
  },
}