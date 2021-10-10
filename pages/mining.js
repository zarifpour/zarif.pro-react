import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Card from '../components/Card';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Head from 'next/head'

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

function breakevenMonth(profit, cost, fee, vFee) {
    let months = 1;
    let p = profit;
    let f = fee;
    if (f >= p) return 0;
    while (p - f - vFee - cost < 0) {
        months++;
        p = profit * months;
        f = fee * months;
    }
    return months;
}

const calculateProfit = () => {
    let variableFee = document.getElementById('variable-fee').value || 0;
    let miningFee = document.getElementById('mining-fee').value || 0;
    miningFee = miningFee / 100;
    let numGpu = document.getElementById('num-gpu').value || 0;
    let costGpu = document.getElementById('cost-gpu').value || 0;
    let numRigs = document.getElementById('num-rigs').value || 0;
    let costRig = document.getElementById('cost-rig').value || 0;
    let totalCostRig = (costGpu * numGpu) * numRigs + (costRig * numRigs);
    let revenueDay = document.getElementById('revenue-day').value || 0;
    let electricDay = document.getElementById('electric-day').value || 0;
    let months = document.getElementById('months').value || 0;
    let profitDay = revenueDay - electricDay;
    let oneGpuProfitMonth = profitDay * 30;
    let allProfitMonth = oneGpuProfitMonth * numGpu;
    let allRigsProfitMonth = allProfitMonth * numRigs;
    let monthMiningFee = (allRigsProfitMonth * miningFee);
    let totalMiningFee = (monthMiningFee * months) + variableFee;
    let totalProfit = (allRigsProfitMonth * months) - totalMiningFee;
    let difference = totalProfit - totalCostRig;
    let breakeven = breakevenMonth(allRigsProfitMonth, totalCostRig, monthMiningFee, variableFee);
    alert(`
        **************
        ${months} month(s)
        **************
        
        COST: ${totalCostRig}
        PROFIT: ${totalProfit}
        TOTAL: ${difference}

        BREAKEVEN: ${breakeven} month(s)
        FEE: ${totalMiningFee}
    `)
}

const Mining = () => {
    useEffect(() => {
        const next = document.getElementById('__next');
        const main = next.children[0];
        main.removeChild(main.children[0]);
        main.removeChild(main.children[0]);
    }, [])
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            </Head>
            <Bounce>
                {/* style={{ display: "none" }} */}
                <div id="status-msg" style={{ display: "none", zIndex: "103" }}>
                    <span id="msg-content">This is a message</span>
                    <span id="only-desktop" style={{ display: "none" }}>(on your desktop)</span>
                </div>
            </Bounce>

            <div className="landing flex">
                <Fade bottom>
                    <Meta title="@zarifpour | Mining Calculator" />
                    {/* <div data-tip data-for="card-tip"> */}
                    <div id="card-component-container2" style={{ zIndex: "101" }}>
                        {/* <div id="dapp-container" className="flex">
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
                        </div> */}
                        <div id="card1" style={{}}>
                            <Card
                                title="Mining Calculator"
                                description="Project profit, cost, and breakeven of your mining rig."
                                link="/dapps"
                            >
                                {/* <Fade> */}

                                {/* </Fade> */}
                                <div className="flex">
                                    <div className="input-container" style={{ marginBottom: "1em", display: "flex" }}>
                                        <input
                                            id="num-gpu"
                                            type="number"
                                            placeholder="GPU(s) per Rig"
                                            className="input-text"
                                            style={{ width: "50%" }}
                                        />
                                        <input
                                            id="cost-gpu"
                                            type="number"
                                            placeholder="Cost per GPU"
                                            className="input-text"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                    <div className="input-container" style={{ marginBottom: "1em", display: "flex" }}>
                                        <input
                                            id="num-rigs"
                                            type="number"
                                            placeholder="Number of Rigs"
                                            className="input-text"
                                            style={{ width: "50%" }}
                                        />
                                        <input
                                            id="cost-rig"
                                            type="number"
                                            placeholder="Cost per Rig"
                                            className="input-text"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                    <div className="input-container" style={{ marginBottom: "1em", display: "flex" }}>
                                        <input
                                            id="revenue-day"
                                            type="number"
                                            placeholder="Revenue / day"
                                            className="input-text"
                                            style={{ width: "50%" }}
                                        />
                                        <input
                                            id="electric-day"
                                            type="number"
                                            placeholder="Cost / day"
                                            className="input-text"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                    <div className="input-container" style={{ marginBottom: "1em", display: "flex" }}>
                                        <input
                                            id="mining-fee"
                                            type="number"
                                            placeholder="Mining fee (%)"
                                            className="input-text"
                                            style={{ width: "50%" }}
                                        />
                                        <input
                                            id="variable-fee"
                                            type="number"
                                            placeholder="Startup Cost"
                                            className="input-text"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                    <div className="input-container" style={{ marginBottom: "1em", display: "flex" }}>
                                        <input
                                            id="months"
                                            type="number"
                                            placeholder="Months"
                                            className="input-text"
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                    <div className="input-container" style={{ marginBottom: "1em" }}>
                                    </div>
                                    <button
                                        id="ad-auction"
                                        type="submit"
                                        className="card-button connect-wallet"
                                        onClick={calculateProfit}
                                    >
                                        <span>
                                            Calculate
                                            {/* <img style={{}} height="28px" width="28px" src="/img/ethereum-eth-logo.png" /> */}
                                        </span>
                                    </button>
                                    {/* </form> */}
                                </div>
                            </Card>
                        </div>
                        {/* </div> */}
                        {/* <ReactTooltip id="card-tip" role="example">
                        <div style={{ textAlign: "center" }}>
                            <p style={{ margin: "0" }}>Please make sure to switch MetaMask</p>
                            <p style={{ margin: "0" }}>network to the Avalanche FUJI C-Chain.</p>
                        </div>
                    </ReactTooltip> */}
                    </div>
                </Fade>
            </div>
        </>
    )
}

export default Mining