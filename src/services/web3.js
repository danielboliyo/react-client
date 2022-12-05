import Web3 from 'web3/dist/web3.min.js';
import detectEthereumProvider from '@metamask/detect-provider';
import abi from 'contracts/abi';

const contractAddress = '0x8bd6a0a14d8375e7586e60fb10d32aca2c0de927';

export const connectWeb3 = async () => {
    try {
        const provider = await detectEthereumProvider();
        await provider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const shortAccount = account.substring(0,5)+ '...' +(account).substring(38,54)
        return { account, shortAccount };
    } catch (error) {
        console.log(error);
    }
};
//contract function send
export const sendVote = async (vote, account) => {
    try {
        const provider = await detectEthereumProvider();
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(abi, contractAddress);
        const gas = await contract.methods.vote(vote).estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
            from: account,
            gas,
            gasPrice
        };
        const result = await contract.methods.vote(vote).send(tx);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const changeStatusConsulation = async (account) => {
    try {
        const provider = await detectEthereumProvider();
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(abi, contractAddress);
        const gas = await contract.methods.changeConsultationState().estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
            from: account,
            gas,
            gasPrice
        };
        const result = await contract.methods.changeConsultationState().send(tx);
        return result;
    } catch (error) {
        console.log(error);
    }
};
