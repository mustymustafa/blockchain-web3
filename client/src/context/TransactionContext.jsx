import React, {useEffect, useState} from 'react'
import {ethers} from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    console.log('ETH CONTRACT' + provider, signer, transactionContract);
    return transactionContract;
}

export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState()
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''})
    const [isLoading, setLoading] = useState(false)

    const [Tcount, setTcount] = useState(localStorage.getItem('transactionCount'))


    const handleChange = (e,name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

    const checkIfWalletIsConnected = async () => {
        try {
            
        if(!ethereum) return alert('Please install metamask');
        //get ethereum accounts
        const accounts = await ethereum.request({method: 'eth_accounts'})
        if(accounts.length){
            console.log(accounts)
            setCurrentAccount(accounts[0])
            //get all transactions

        } else {
            console.log('No accounts found')
        }
          } catch (error) {
              console.log(error)
             throw new Error('No ethereum object')
        }
     
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');

            //get all accounts and be able to choose one
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object')
        }
    }

     const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
              method: "eth_sendTransaction",
              params: [
                {
                  from: currentAccount,
                  to: addressTo,
                  gas: "0x5208", // it must be in hex. get the decimal then use Ethereum Unit Converter. ether uses gwei (sub unit of ether)
                  value: parsedAmount._hex, // conver to gwei or hex
                },
              ],
            });

            //store the transaction
           const transactionHash = await transactionContract.addToBlockChain(
             addressTo,
             parsedAmount,
             keyword,
             message
           );
           setLoading(true);
           console.log('Loading -' + transactionHash.hash)
           await transactionHash.wait(); // wait for the transaction to be finished
           setLoading(false);
           console.log('success -' + transactionHash.hash)

           const transactionCount = await transactionContract.getTransactionCount();
            setTcount(transactionCount.toNumber());
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
                {children}
        </TransactionContext.Provider>
    )

}