import Web3 from "web3";

export default function balances(rpc, contractAddress, wallet, tokens) {
   const web3 = new Web3(rpc);
    const contract = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"tokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"users","type":"address[]"},{"name":"tokens","type":"address[]"}],"name":"balances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"}], contractAddress);
    return contract.methods.balances([wallet], tokens).call();
}

