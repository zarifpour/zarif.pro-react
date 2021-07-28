import Link from 'next/link'
import cardsStyles from '../styles/Cards.module.css'

export const Cards = () => {
    return (
        <div id="cards" className={`${cardsStyles.cards} flex`} style={{ margin: "0vw 12vw" }}>
            <div className="text-box no-pointer to-fade-in fast-anim">
                <div className={`${cardsStyles.card} flex`} style={{ background: "rgb(6, 6, 8)" }}>
                    <div style={{ fontSize: ".3em", textTransform: "none" }}>
                        <p className={cardsStyles["card-title"]}>
                            <span>
                                <Link href="/dapps">
                                    <a>DApps</a>
                                </Link>
                            </span>
                        </p>
                        <p className={cardsStyles["card-info"]} style={{ fontSize: ".8em", color: "rgb(171, 178, 185)" }}>
                            A collection of decentralized applications, including a faucet, an advertisement auction, and a voting app.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}