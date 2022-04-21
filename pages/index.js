import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import { Skills } from '../components/Skills';
import { Scroll } from '../components/Scroll';
import Fade from 'react-reveal/Fade';
import Link from 'next/link';
import Router from 'next/router';

const ViewApps = React.forwardRef(({ onClick, href }, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            View Apps
        </a>
    )
})

const Home = () => (

    <ReactFullpage
        //FullPage options
        licenseKey={'null'}
        scrollingSpeed={800} /* Options here */
        // lockAnchors={true}
        anchors={['1', '2', '3']}
        // scrollBar={true}
        // verticalAlign={true}

        render={({ state, fullpageApi }) => {
            return (
                <>
                    <ReactFullpage.Wrapper>
                        {/* <div className="section">
                        <div class="flex">
                            <FunctionClick />
                        </div>
                    </div> */}
                        <div className="section">
                            <Scroll />
                            <div className="landing flex">
                                <div className="title-box no-pointer flex">
                                    <div className={`${styles['ls-bug']} gradient ${styles['zarif']} title-shadow fade-in`}>Daniel Zarifpour</div>
                                    <div className="break"></div>
                                    <div className={`${styles['zarif-2']} fade-in anim-delay-2s`}>
                                        <div className={`${styles['ls-bug']} ${styles['creator']} title-shadow gradient`}>Creator</div>
                                        <div className={`${styles['ls-bug']} ${styles['lh-bug']} title-shadow gradient`} style={{ margin: "0px 12px" }}>|</div>
                                        <div className={`${styles['ls-bug']} ${styles['engineer']} title-shadow gradient`}>Engineer</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            {/* <Scroll /> */}
                            <Fade>
                                <Card
                                    title="Dapps"
                                    description="A faucet, an advertisement auction, a voting contract, and more coming soon – powered by my ERC-20 token."
                                    // description="A collection of decentralized applications, including a faucet, an advertisement auction, a voting contract, and more to come soon."
                                    link="/dapps"
                                >
                                    <Link href="/dapps">
                                        <div className="flex">
                                            <button
                                                id="view-apps"
                                                className="card-button connect-wallet"
                                            >
                                                <span>
                                                    <a>View Apps</a>
                                                    {/* <img style={{}} height="28px" width="28px" src="/img/ethereum-eth-logo.png" /> */}
                                                </span>
                                            </button>
                                        </div>
                                    </Link>
                                </Card>
                            </Fade>
                        </div>
                        <div className="section">
                            <Fade>
                                <Skills />
                            </Fade>
                        </div>
                    </ReactFullpage.Wrapper>
                </>
            );
        }}
    />
);

// if (typeof window === 'object') {
//     // Check if document is finally loaded
//     document.addEventListener("DOMContentLoaded", function () {
//         console.log('Finished loading')
//         ReactDOM.render(<Home />, document.getElementById('__next'));
//     });
// }

export default Home
