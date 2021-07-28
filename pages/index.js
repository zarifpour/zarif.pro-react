import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import styles from '../styles/Home.module.css'
// import { Cards } from '../components/Cards'
import Card from '../components/Card'
import { Skills } from '../components/Skills'
import { Scroll } from '../components/Scroll'
import FunctionClick from '../components/ex_FunctionClick';

const Home = () => (
    <ReactFullpage
        //FullPage options
        licenseKey={'null'}
        scrollingSpeed={800} /* Options here */

        render={({ state, fullpageApi }) => {
            return (
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
                                <div className={`${styles['ls-bug']} gradient ${styles['zarif']} fade-in`}>Daniel Zarifpour</div>
                                <div className="break"></div>
                                <div className={`${styles['zarif-2']} fade-in anim-delay-2s`}>
                                    <div className={`${styles['ls-bug']} gradient`}>Creator</div>
                                    <div className={`${styles['ls-bug']} ${styles['lh-bug']} gradient`} style={{ margin: "0px 12px" }}>|</div>
                                    <div className={`${styles['ls-bug']} gradient`}>Engineer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <Card
                            title="DApps"
                            description="A collection of decentralized applications, including a faucet, an advertisement auction, and a voting app."
                            link="/dapps"    
                        />
                    </div>
                    <div className="section">
                        <Skills />
                    </div>
                </ReactFullpage.Wrapper>
            );
        }}
    />
);

if (typeof window === 'object') {
    // Check if document is finally loaded
    document.addEventListener("DOMContentLoaded", function () {
        console.log('Finished loading')
        ReactDOM.render(<Home />, document.getElementById('__next'));
    });
}

export default Home
