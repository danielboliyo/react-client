import Web3 from 'web3/dist/web3.min.js';
import detectEthereumProvider from '@metamask/detect-provider';
import abi from 'contracts/abi';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

/**
 * ConnectWeb3() is a function that returns an object with two properties: account and shortAccount.
 * The account property is the user's Ethereum address, and the shortAccount property is the first 5
 * characters of the user's Ethereum address, followed by 3 dots, followed by the last 6 characters of
 * the user's Ethereum address.
 * @returns An object with two properties: account and shortAccount.
 */
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
        //console.log(error);
        throw new Error(error.message);
    }
};
//contract function send
/**
 * It takes a vote and an account, and then sends the vote to the contract
 * @param vote - the vote you want to send
 * @param account - The address of the account that will be used to send the transaction.
 * @returns The result of the transaction.
 */
export const sendVote = async (vote, account) => {
    try {
        const provider = await detectEthereumProvider();
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(abi, contractAddress);
        const gas = await contract.methods.vote(vote).estimateGas({ from: account });
        //console.log('gas', gas);
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
            from: account,
            gas,
            gasPrice
        };
        const result = await contract.methods.vote(vote).send(tx);
        return result;
    } catch (error) {
        //console.log(error);
        throw new Error(error);
    }
};

/**
 * It takes an account address as an argument, and then it uses that account address to call the
 * changeConsultationState() function on the smart contract.
 * @param {String} account - the address of the user who is logged in
 * @returns The result of the transaction.
 */
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
        //console.log(error);
        throw new Error(error.message);
    }
};

/**
 * It gets all the votes from the smart contract.
 * @returns An array of objects.
 */
export const getAllVotes = async () => {
    try {
        const provider = await detectEthereumProvider();
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(abi, contractAddress);
        const result = await contract.methods.getAllVotes().call();
        return result;
    } catch (error) {
        //console.log(error);
        throw new Error(error.message);
    }
};

/**
 * This function will take a wallet address and an account address and will authorize the wallet
 * address to be able to send and receive tokens from the contract address.
 * @param {String} wallet - The wallet address you want to authorize
 * @param {String} account - The address of the account that is authorizing the wallet.
 * @returns The transaction hash.
 */
export const authorizedWallet = async (wallet, account) => {
    try {
        const provider = await detectEthereumProvider();
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(abi, contractAddress);
        const result = await contract.methods.authorizeWallet(wallet).send({ from: account });
        return result;
    } catch (error) {
        //console.log(error);
        throw new Error(error.message);
    }
}; 
