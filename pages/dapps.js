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

// import your favorite web3 convenience library here

// function getLibrary(provider, connector) {
//     return new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
// }

export const injected = new InjectedConnector({/*{ supportedChainIds: [43113] }*/ });
// activate(injected);

let ethereum = false
let connected = false

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
    rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io']
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
    document.getElementById('connect-btn').innerText = "🎈 Disconnected";
    document.getElementById('connection-status').className = "disconnected";
    document.getElementById('faucet').innerText = "Connect MetaMask";
}
const elemConnecting = () => {
    document.getElementById('connect-btn').innerText = "🍊 Connecting...";
    document.getElementById('connection-status').className = "connecting";
    document.getElementById('faucet').innerText = "Connecting...";
}
const elemConnected = () => {
    document.getElementById('connect-btn').innerText = "🧃 Connected";
    document.getElementById('connection-status').className = "connected";
    document.getElementById('faucet').innerText = "Get Tokens";
    // checkNetwork();
}
let animationName
const changeStatus = (status) => {
    if (document.getElementById("status-msg").style.animationName === "none") {
        document.getElementById("status-msg").style.animationName = animationName;
    }
    document.getElementById("status-msg").style.display = "block";
    document.getElementById("status-msg").innerText = status;
    document.getElementById("status-msg").onanimationend = () => {
        animationName = document.getElementById("status-msg").style.animationName;
        document.getElementById("status-msg").style.animationName = "none";
    };
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
                console.log(ethereum)
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts && accounts.length > 0) {
                    console.log(accounts);
                    console.log(accounts[0]);
                    console.log(ethereum.chainId)
                    if (ethereum.chainId !== 0xa869) {
                        console.log("Connect to AVAX Testnet to use this app.")
                        changeStatus("Connect to AVAX Testnet to use this app")
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
                console.log("Please continue in MetaMask.")
                changeStatus("Please continue in MetaMask")
            } else {
                elemDisconnected();
                console.error(
                    'Connect an account with MetaMask to continue.\n\n' +
                    'https://metamask.io/\n\n' +
                    'Error: ' + error.message
                );
                changeStatus('Error: ' + error.message);
            }
        }
    } else {
        elemDisconnected();
        console.log("Install MetaMask to use this app.");
        changeStatus("Install MetaMask to use this app");
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

        // const handleChainChanged = () => {
        //     // eat errors
        //     activate(injected, undefined, true).catch((error) => {
        //         console.error('Failed to activate after chain changed', error)
        //     })
        // }

        // const handleAccountsChanged = (accounts) => {
        //     if (accounts.length > 0) {
        //         // eat errors
        //         activate(injected, undefined, true).catch((error) => {
        //             console.error('Failed to activate after accounts changed', error)
        //         })
        //     }
        // }

        const handleChainChanged = () => {
            // eat errors
            if (chain === "chainId") {
                changeStatus("")
            } else {
                changeStatus("Connect to AVAX Testnet to use this app")
            }
            activate(injected, undefined, true).catch((error) => {
                console.error('Failed to activate after chain changed', error)
            })
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


        if (typeof window.ethereum !== 'undefined') {

            ethereum = window.ethereum

            console.log('Ethereum detected.')

            // ethereum.on('accountsChanged', function (accounts) {
            //     // Time to reload your interface with accounts[0]!
            //     console.log(accounts[0])
            // })

            // ethereum.on('chainChanged', handleChainChanged)
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
                        🎈 Disconnected
                    </button>
                </div>
            </Fade>

            <Bounce>
                {/* style={{ display: "none" }} */}
                <div id="status-msg" style={{ display: "none" }}>
                    <span id="msg-content">This is a message</span>
                </div>
            </Bounce>

            <div className="landing flex">
                <Fade bottom>
                    <Meta title="Daniel Zarifpour | Dapps" />
                    {/* <div data-tip data-for="card-tip"> */}
                    <Card
                        title="Faucet"
                        description="Get some Zebra tokens on the Avalanche FUJI C-Chain to use my applications."
                        link="/dapps"
                    >
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