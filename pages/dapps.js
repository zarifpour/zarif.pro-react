import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Card from '../components/Card';
import Fade from 'react-reveal/Fade';
import ReactTooltip from 'react-tooltip';
import MetaMaskOnboarding from '@metamask/onboarding';
import { Web3ReactProvider } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import Bounce from 'react-reveal/Bounce';
import { ethers } from 'ethers';
import { Contract } from "web3-eth-contract";
import { lastIndexOf } from "lodash";

// import your favorite web3 convenience library here

// function getLibrary(provider, connector) {
//     return new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
// }

export const injected = new InjectedConnector({/*{ supportedChainIds: [43113] }*/ });
// activate(injected);
let ethereum = false
let connected = false
let activeCard = 1;

const toHex = (num) => {
    return '0x' + num.toString(16)
}

export const RINKEBY_NETWORK_PARAMS = [{
    chainId: toHex(4), // Hex: 0x4
    chainName: 'Rinkeby Test Network',
    nativeCurrency: {
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrl: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrl: ['https://rinkeby.etherscan.io']
}]

export const AVALANCHE_MAINNET_PARAMS = {
    chainId: toHex(43114), // Hex: 0xa86a
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/']
}

export const AVALANCHE_TESTNET_PARAMS = [{
    chainId: toHex(43113), // Hex: 0xa869
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
}]

export const ARBITRUM_TESTNET_PARAMS = [{
    chainId: toHex(421611), // Hex: 0xa28b
    chainName: 'Arbitrum Testnet',
    nativeCurrency: {
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io/#/']
}]

const elemDisconnected = () => {
    document.getElementById('connect-btn').innerText = "???? Disconnected";
    document.getElementById('connection-status').className = "disconnected";
    document.getElementsByClassName('connect-wallet').innerText = "Connect MetaMask";
}
const elemConnecting = () => {
    document.getElementById('connect-btn').innerText = "???? Connecting...";
    document.getElementById('connection-status').className = "connecting";
    document.getElementsByClassName('connect-wallet').innerText = "Connecting...";
}
const elemConnected = () => {
    document.getElementById('connect-btn').innerText = "???? Connected";
    document.getElementById('connection-status').className = "connected";
    document.getElementById('faucet').innerText = "Get Tokens";
    document.getElementById('faucet').onclick = faucet;
    document.getElementById('ad-auction').innerText = "Place Bid";
    document.getElementById('ad-auction').onclick = adAuction;
    document.getElementById('election').innerText = "Start Election";
    document.getElementById('election').onclick = election;
    // checkNetwork();
}
let animationName
const changeStatus = (status) => {
    if (document.getElementById("status-msg").style.animationName === "none") {
        document.getElementById("status-msg").style.animationName = animationName;
    }
    document.getElementById("status-msg").style.display = "block";
    document.getElementById("msg-content").innerHTML = status;
    document.getElementById("status-msg").onanimationend = () => {
        animationName = document.getElementById("status-msg").style.animationName;
        document.getElementById("status-msg").style.animationName = "none";
    };
}

function checkNetwork() {
    if (ethereum.chainId !== "0x4") {
        console.log("Switch to Rinkeby Network to use this app.")
        changeStatus("Switch to <a target='_blank' href='https://gist.github.com/zarifpour/309fdf60e6993a11a0ef8f72f1f95546'>Rinkeby Network</a> to use this app")
        return false;
    } else {
        return true;
    }
}

async function approveToken(address, amount) {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const tokenAddress = "0xeED62950d07f80d2890B418871055846ACB6b9d0"

    const tokenAbi = ["function approve(address _spender, uint256 _value) public returns (bool success)"];

    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

    const signedContract = tokenContract.connect(signer);
    // try {
    //     await signedContract.estimateGas.withdraw();
    // } catch (error) {
    //     console.log(error);
    // }
    if (checkNetwork()) {
        try {
            let tx = await signedContract.approve(address, amount);
            document.getElementById('ad-auction').innerText = "Approving...";
            document.getElementById('ad-auction').disabled = true;
            let receipt = await provider.waitForTransaction(tx.hash);
            console.log(receipt);
            adAuction();
            changeStatus("<span style='color: lightgreen;'>Approval successful.<br><br>TXN: <a target='_blank' href='https://rinkeby.etherscan.io/tx/" + tx.hash + "'>" + tx.hash + "</a></span>");
            console.log("Approved " + address + " to withdraw " + amount / 1000000000000000000n + " tokens.\n\nTXN:", tx)
        } catch (error) {
            console.error(
                'Error: ' + error.message
            );
            let index1 = "execution reverted: ";
            let index2 = '","data":{"originalError":';
            let error_msg = error.message.match(new RegExp(index1 + "(.*)" + index2));
            if (error_msg !== null) {
                changeStatus("<span style='color: salmon;'>Error: " + error_msg[1] + "</span>");
            } else {
                console.log(error.message);
            }
        }
        document.getElementById('ad-auction').innerText = "Place Bid";
        document.getElementById('ad-auction').disabled = false;
    }
}

async function faucet() {
    // console.log('onClick Function changed successfully!');

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    // console.log(provider);
    // console.log(signer);

    const faucetAddress = "0xE8690e96bEC46b1d7C0281a7FAf1589d20475a87"

    const faucetAbi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "contractBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "liquidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "waitTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "zebraToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const faucetContract = new ethers.Contract(faucetAddress, faucetAbi, provider);

    const signedContract = faucetContract.connect(signer);
    // try {
    //     await signedContract.estimateGas.withdraw();
    // } catch (error) {
    //     console.log(error);
    // }
    if (checkNetwork()) {
        try {
            let tx = await signedContract.withdraw();
            changeStatus("<span style='color: lightgreen;'>TXN: <a target='_blank' href='https://rinkeby.etherscan.io/tx/" + tx.hash + "'>" + tx.hash + "</a></span>");
            console.log(tx)
        } catch (error) {
            console.error(
                'Error: ' + error.message
            );
            let index1 = "execution reverted: ";
            let index2 = '","data":{"originalError":';
            let error_msg = error.message.match(new RegExp(index1 + "(.*)" + index2));
            if (error_msg !== null) {
                changeStatus("<span style='color: salmon;'>Error: " + error_msg[1] + "</span>");
            } else {
                console.log(error.message);
            }
        }
    }
}

function loadAd(imgUrl, bid) {
    document.getElementById("a-img-url").src = imgUrl;
    document.getElementById("current-bid").innerHTML = bid;
}

async function adAuction() {
    // console.log('onClick Function changed successfully!');

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    // console.log(provider);
    // console.log(signer);

    const auctionAddress = "0x574B0F0BbcE782439C1e9B7A362eD7a19d2d8f32"

    const auctionAbi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "url",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "bid",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "PublishAdvertisement",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawal",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "adImageUrl",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "advertisementId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "advertiser",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_adImageUrl",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "bid",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "bidTimeStamp",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getImageUrl",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getLastBid",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "lastBid",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "zebraToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const auctionContract = new ethers.Contract(auctionAddress, auctionAbi, provider);

    const signedContract = auctionContract.connect(signer);

    let image = document.getElementById("image-url").value;
    let amount = document.getElementById("bid").value;
    amount = BigInt(amount) * 1000000000000000000n;
    // try {
    //     await signedContract.estimateGas.withdraw();
    // } catch (error) {
    //     console.log(error);
    // }
    if (checkNetwork()) {
        try {
            let tx = await signedContract.bid(image, amount);
            changeStatus("<span style='color: lightgreen;'>TXN: <a target='_blank' href='https://rinkeby.etherscan.io/tx/" + tx.hash + "'>" + tx.hash + "</a></span>");
            console.log(tx)
            loadAd(image, amount / 1000000000000000000n)
        } catch (error) {
            console.error(
                'Error: ' + error.message
            );
            let index1 = "execution reverted: ";
            let index2 = '","data":{"originalError":';
            let error_msg = error.message.match(new RegExp(index1 + "(.*)" + index2));
            if (error_msg !== null) {
                if (error_msg[1] === "ERC20: transfer amount exceeds allowance") {
                    // console.log("check")
                    // console.log("here")
                    // let approval = await approveToken(auctionAddress, amount)
                    // console.log("Approval:", approval)
                    approveToken(auctionAddress, amount);
                }
                changeStatus("<span style='color: salmon;'>Error: " + error_msg[1] + "</span>");
            } else {
                console.log(error.message);
            }
        }
    }
}

async function election() {
    // console.log('onClick Function changed successfully!');

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    // console.log(provider);
    // console.log(signer);

    const faucetAddress = "0xE8690e96bEC46b1d7C0281a7FAf1589d20475a87"

    const faucetAbi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "contractBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "liquidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "waitTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "zebraToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const faucetContract = new ethers.Contract(faucetAddress, faucetAbi, provider);

    const signedContract = faucetContract.connect(signer);
    // try {
    //     await signedContract.estimateGas.withdraw();
    // } catch (error) {
    //     console.log(error);
    // }
    if (checkNetwork()) {
        try {
            let tx = await signedContract.withdraw();
            changeStatus("<span style='color: lightgreen;'>TXN: <a target='_blank' href='https://rinkeby.etherscan.io/tx/" + tx.hash + "'>" + tx.hash + "</a></span>");
            console.log(tx)
        } catch (error) {
            console.error(
                'Error: ' + error.message
            );
            let index1 = "execution reverted: ";
            let index2 = '","data":{"originalError":';
            let error_msg = error.message.match(new RegExp(index1 + "(.*)" + index2));
            if (error_msg !== null) {
                changeStatus("<span style='color: salmon;'>Error: " + error_msg[1] + "</span>");
            } else {
                console.log(error.message);
            }
        }
    }
}

const connectWallet = async () => {
    elemConnecting();
    if (ethereum) {
        try {
            if (!ethereum.isMetaMask) {
                alert("Please install MetaMask.");
            } else {
                // Will open the MetaMask UI
                // You should disable this button while the request is pending!

                // console.log(ethereum)

                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts && accounts.length > 0) {
                    // console.log(accounts);
                    // console.log(accounts[0]);
                    // console.log(ethereum.chainId)
                    // addNetwork(RINKEBY_NETWORK_PARAMS, accounts)
                    if (checkNetwork()) {
                        changeStatus("")
                    }
                    elemConnected();
                }
                else {
                    elemDisconnected();
                    console.log("Please connect an account to use this app.")
                    changeStatus("Please connect an account to use this app")
                }
            }
        } catch (error) {
            if (error.message.includes("already pending")) {
                console.log("Continue in MetaMask.")
                changeStatus("Continue in MetaMask")
            } else {
                elemDisconnected();
                console.error(
                    'Connect an account with MetaMask to continue.\n\n' +
                    'https://metamask.io/\n\n' +
                    'Error: ' + error.message
                );
                changeStatus("<span style='color: salmon;'>Error: " + error.message + "</span>");
            }
        }
    } else {
        elemDisconnected();
        console.log("Install MetaMask to use this app.");
        changeStatus("Install <a target='_blank' href='https://metamask.io'>MetaMask</a> to use this app");
    }
}

const addNetwork = (params, accounts) => {
    // injected.getProvider().then(provider => {
    //     provider
    //         .request({
    //             method: 'wallet_addEthereumChain',
    //             params: [params, accounts[0]],
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // })
    ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [params, accounts[0]],
    })
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        });
    console.log(toHex(43113))
}

const showCard1 = () => {
    document.getElementById("card" + activeCard).style.display = "none";
    activeCard = 1;
    document.getElementById("card1").style.display = "block";
}

const showCard2 = () => {
    document.getElementById("card" + activeCard).style.display = "none";
    activeCard = 2;
    document.getElementById("card2").style.display = "block";
}

const showCard3 = () => {
    document.getElementById("card" + activeCard).style.display = "none";
    activeCard = 3;
    document.getElementById("card3").style.display = "block";
}

const Dapp = () => {

    // async function loadBlockchainData() {
    //     try {
    //         const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    //         const network = await web3.eth.net.getNetworkType()
    //         console.log("Network:", network)
    //     } catch (error) {
    //         console.error(
    //             'To use this app make sure your browser supports Web3.\n\n' +
    //             'Error: ' + error.message
    //         );
    //     }
    // }

    // loadBlockchainData()

    // const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does

    useEffect(() => {

        const handleChainChanged = () => {
            // eat errors
            if (ethereum.chainId === "0x4") {
                changeStatus("<span style='color: lightgreen;'>Connected to Rinkeby</span>")
            } else {
                changeStatus("Switch to <a target='_blank' href='https://gist.github.com/zarifpour/309fdf60e6993a11a0ef8f72f1f95546'>Rinkeby Network</a> to use this app")
            }
            // activate(injected, undefined, true).catch((error) => {
            //     console.error('Failed to activate after chain changed', error)
            // })
        }

        const handleAccountsChanged = (accounts) => {
            if (accounts.length > 0) {
                // // eat errors
                // activate(injected, undefined, true).catch((error) => {
                //     console.error('Failed to activate after accounts changed', error)
                // })
                console.log(accounts)
                // connectWallet()
            }
        }

        async function loadAdAuction() {
            // console.log('onClick Function changed successfully!');

            const provider = new ethers.providers.Web3Provider(ethereum);

            // console.log(provider);
            // console.log(signer);

            const auctionAddress = "0x574B0F0BbcE782439C1e9B7A362eD7a19d2d8f32"

            const auctionAbi = [
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "previousOwner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "OwnershipTransferred",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "url",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "bid",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "name": "PublishAdvertisement",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "Withdrawal",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "adImageUrl",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "advertisementId",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "advertiser",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_adImageUrl",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "bid",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "bidTimeStamp",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getImageUrl",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getLastBid",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "lastBid",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "renounceOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "zebraToken",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];

            const auctionContract = new ethers.Contract(auctionAddress, auctionAbi, provider);

            if (checkNetwork()) {
                try {
                    let tx = await auctionContract.getImageUrl();
                    let tx2 = await auctionContract.lastBid();
                    tx2 = BigInt(tx2) / 1000000000000000000n;
                    console.log(tx)
                    console.log(tx2)
                    // if (tx.trim) // last place forgot why I was doing this maybe to see if no network detected... ah yes I remember for no image load default
                    loadAd(tx, tx2)

                } catch (error) {
                    console.error(
                        'Error: ' + error.message
                    );
                    let index1 = "execution reverted: ";
                    let index2 = '","data":{"originalError":';
                    let error_msg = error.message.match(new RegExp(index1 + "(.*)" + index2));
                    if (error_msg !== null) {
                        changeStatus("<span style='color: salmon;'>Error: " + error_msg[1] + "</span>");
                    } else {
                        console.log(error.message);
                    }
                }
            }
        }


        if (typeof window.ethereum !== 'undefined') {

            ethereum = window.ethereum

            console.log('Ethereum detected.')

            loadAdAuction();

            // ethereum.on('accountsChanged', function (accounts) {
            //     // Time to reload your interface with accounts[0]!
            //     console.log(accounts[0])
            // })

            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)

        } else {
            console.log("Ethereum not detected.");
        }

    }, [])

    return (
        <>
            <Fade left>
                <div id="connection-status" className="disconnected" onClick={connectWallet}>
                    <button id="connect-btn">
                        ???? Disconnected
                    </button>
                </div>
            </Fade>

            <Bounce>
                {/* style={{ display: "none" }} */}
                <div id="status-msg" style={{ display: "none", zIndex: "103" }}>
                    <span id="msg-content">This is a message</span>
                    {/* <span id="only-desktop" style={{ display: "none" }}>(on your desktop)</span> */}
                </div>
            </Bounce>

            <div className="landing flex">
                <Fade bottom>
                    <Meta title="@zarifpour | Dapps" />
                    {/* <div data-tip data-for="card-tip"> */}
                    <div id="card-component-container" style={{ zIndex: "101", position: "absolute", height: "34vh" }}>
                        <div id="dapp-container" className="flex">
                            <div id="dapp-btns" className="responsive-container">
                                <button id="dapp1" onClick={showCard1} className="btn-2">
                                    <img src="/svg/drop.svg" alt="Faucet" />
                                </button>
                                <button id="dapp2" onClick={showCard2} className="btn-2">
                                    <img src="/svg/dollar.svg" alt="Auction" />
                                </button>
                                <button id="dapp3" onClick={showCard3} className="btn-2">
                                    <img src="/svg/archive.svg" alt="Poll" />
                                </button>
                            </div>
                        </div>
                        <div id="card1" style={{ paddingBottom: "calc(3vw + 150px)" }}>
                            <Card
                                title="Faucet"
                                description="Get some Zebra tokens on the Rinkeby Test Network to use my applications."
                                link="/dapps"
                            >
                                {/* <Fade> */}

                                {/* </Fade> */}
                                <div className="flex">
                                    <button
                                        id="faucet"
                                        className="card-button connect-wallet"
                                        onClick={connectWallet}
                                    >
                                        <span>
                                            Connect MetaMask
                                            {/* <img style={{}} height="28px" width="28px" src="/img/ethereum-eth-logo.png" /> */}
                                        </span>
                                    </button>
                                </div>
                            </Card>
                        </div>
                        <div id="card2" style={{ display: "none", paddingBottom: "calc(3vw + 250px)" }}>
                            <Card
                                title="Ad Auction"
                                description="This advertisement space displays the image of the highest bidder until they are outbid."
                                link="/dapps"
                            >
                                <div className="flex">
                                    <div style={{ position: "absolute", right: "0", top: "0" }}>
                                        Bid: <span id="current-bid">...</span>
                                    </div>
                                    <div className="break" style={{ margin: "0" }}></div>
                                    <div id="place-here" style={{ marginBottom: "1em" }}>
                                        <img id="a-img-url" src="/img/placeholder.png" />
                                    </div>
                                    <div className="break" style={{ margin: "0" }}></div>
                                    {/* <form style={{ width: "-webkit-fill-available" }}> */}
                                    <div className="input-container" style={{ marginBottom: "1em", display: "flex" }}>
                                        <input
                                            id="image-url"
                                            type="url"
                                            placeholder="Paste Image URL"
                                            className="input-text"
                                            style={{ width: "75%" }}
                                        />
                                        <input
                                            id="bid"
                                            type="number"
                                            placeholder="Bid"
                                            className="input-text"
                                            style={{ width: "25%" }}
                                        />
                                    </div>
                                    <div className="input-container" style={{ marginBottom: "1em" }}>
                                    </div>
                                    <button
                                        id="ad-auction"
                                        type="submit"
                                        className="card-button connect-wallet"
                                        onClick={connectWallet}
                                    >
                                        <span>
                                            Connect MetaMask
                                            {/* <img style={{}} height="28px" width="28px" src="/img/ethereum-eth-logo.png" /> */}
                                        </span>
                                    </button>
                                    {/* </form> */}
                                </div>
                            </Card>
                        </div>
                        <div id="card3" style={{ display: "none", paddingBottom: "calc(3vw + 150px)" }}>
                            <Card
                                title="Election"
                                description="Start an election and collect voting results at the end of the voting period."
                                link="/dapps"
                            >
                                <div className="flex">
                                    <button
                                        id="election"
                                        className="card-button connect-wallet"
                                        onClick={connectWallet}
                                    >
                                        <span>
                                            Connect MetaMask
                                            {/* <img style={{}} height="28px" width="28px" src="/img/ethereum-eth-logo.png" /> */}
                                        </span>
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </div>
                    {/* </div> */}
                    {/* <ReactTooltip id="card-tip" role="example">
                        <div style={{ textAlign: "center" }}>
                            <p style={{ margin: "0" }}>Please make sure to switch MetaMask</p>
                            <p style={{ margin: "0" }}>network to the Avalanche FUJI C-Chain.</p>
                        </div>
                    </ReactTooltip> */}
                </Fade>
            </div>
        </>
    )
}

export default Dapp