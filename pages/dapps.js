import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Card from '../components/Card';
import Fade from 'react-reveal/Fade';

let ethereum = false

const connectWallet = async () => {
    if (ethereum) {
        try {
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error('Error:' + error);
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
            <div id="connection-status" className="disconnected">
                <Fade left>
                    🎈 Disconnected
                </Fade>
            </div>
            <div className="landing flex">
                <Fade>
                    <Meta title="Daniel Zarifpour | DApps" />
                    <Card
                        title="Faucet"
                        description="Get some Zebra tokens on the Avalanche FUJI C-Chain to use my applications."
                        link="/dapps"
                    >
                        <div className="flex">
                            <button
                                className="card-button"
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
                </Fade>
            </div>
        </>
    )
}

export default DApp