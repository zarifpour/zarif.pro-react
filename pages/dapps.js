import Meta from "../components/Meta";
import Card from '../components/Card';

const DApp = () => {
    return(
        <div className="landing flex">
            <Meta title="Daniel Zarifpour | DApps" />
            <Card
                title="DApps"
                description="A collection of decentralized applications, including a faucet, an advertisement auction, and a voting app."
                link="/dapps"
            />
        </div>
    )
}

export default DApp