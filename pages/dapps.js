import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Card from '../components/Card';
import Fade from 'react-reveal/Fade';
import ReactTooltip from 'react-tooltip';
import MetaMaskOnboarding from '@metamask/onboarding';

let ethereum = false

const connectWallet = async () => {
    if (ethereum) {
        try {
            if (!ethereum.isMetaMask) {
                alert("Please install MetaMask.");
            } else {
                // Will open the MetaMask UI
                // You should disable this button while the request is pending!
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts && accounts.length > 0) {
                    console.log(accounts[0]);
                    document.getElementById('connection-status').innerText = "🧃 Connected";
                    document.getElementById('connection-status').className = "connected";
                    document.getElementById('faucet').innerText = "Get Tokens";
                }
                else {
                    alert("Please connect an account to use these apps.")
                }
            }
        } catch (error) {
            console.error(
                'Connect an account with MetaMask to continue.\n' +
                'https://metamask.io/\n\n' +
                'Error: ' + error.message
            );
        }
    } else {
        alert('You need a Web3 enabled browser to use this app.');
    }
}

const DApp = () => {

    useEffect(() => {

        if (typeof window.ethereum !== 'undefined') {

            ethereum = window.ethereum

            console.log('Ethereum detected.')


            // ethereum.on('accountsChanged', function (accounts) {
            //     // Time to reload your interface with accounts[0]!
            //     console.log(accounts[0])
            // })
        } else {
            console.log("Ethereum not detected.");
        }

    }, [])

    return (
        <>
            <Fade left>
                <div id="connection-status" className="disconnected">
                    🎈 Disconnected
                </div>
            </Fade>

            <div className="landing flex">
                <Fade>
                    <Meta title="Daniel Zarifpour | DApps" />
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
                                style={{
                                    width: "-webkit-fill-available",
                                    height: "clamp(30px, 6vw, 60px)"
                                }}
                                onClick={connectWallet}
                            >
                                <span>
                                    Enable Ethereum
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

export default DApp