import footerStyles from '../styles/Footer.module.css'

const footerButtons = [
    { href: "https://www.twitter.com/dzar1f", id: "twitter-svg", src: "/svg/twitter.svg", alt: "Twitter" },
    { href: "https://www.linkedin.com/in/zarifpour/", id: "linkedin-svg", src: "/svg/linkedin.svg", alt: "LinkedIn" },
    { href: "https://www.github.com/zarifpour", id: "github-svg", src: "/svg/github.svg", alt: "Github" },
    // { href: "https://dzarif.medium.com", id: "medium-svg", src: "/svg/medium.svg", alt: "Medium" },
    // { href: "mailto:daniel@zarif.pro", id: "mail-svg", src: "/svg/mail.svg", alt: "E-Mail" },
];

export const Footer = () => {
    return (
        <div className={footerStyles.footer}>
            <div className={`${footerStyles['button-wrapper']} fade-in anim-delay-4s flex`}>
                <div className={footerStyles['responsive-container']}>
                    {footerButtons.map(button => (
                        <a key={button.id} href={button.href} target="_blank" rel="external" draggable="false">
                            <button className={`${footerStyles['glow-on-hover']} glow-on-hover`}>
                                <span>
                                    <img id={button.id} className="svg-icon" src={button.src} alt={button.alt} draggable="false" />
                                </span>
                            </button>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
