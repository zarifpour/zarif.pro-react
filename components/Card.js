import Link from 'next/link'
import cardStyles from '../styles/Card.module.css'

const Card = ({ title, link, description }) => {
    return (
        <div id="card-container" className="flex no-pointer to-fade-in fast-anim">
            <div id="card" className={cardStyles.card}>
                <div id="text-container">
                    <p className={cardStyles["card-title"]}>
                        <span>
                            <Link href={link}>
                                <a>{title}</a>
                            </Link>
                        </span>
                    </p>
                    <p className={cardStyles["card-info"]}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

Card.defaultProps = {
    title: "Card",
    link: "/",
    description: "This component is a template for displaying information in the form of a card."
}

export default Card