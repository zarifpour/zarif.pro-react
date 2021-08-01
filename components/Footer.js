import footerStyles from '../styles/Footer.module.css'

const footerButtons = [
    { href: "https://www.github.com/zarifpour", id: "github-svg", src: "/svg/github.svg", alt: "Github Logo" },
    { href: "https://dzarif.medium.com", id: "medium-svg", src: "/svg/medium.svg", alt: "Medium Logo" },
    { href: "https://www.linkedin.com/in/zarifpour/", id: "linkedin-svg", src: "/svg/linkedin.svg", alt: "LinkedIn Logo" },
    { href: "mailto:daniel@zarif.pro", id: "mail-svg", src: "/svg/mail.svg", alt: "Mail Icon" }
];

export const Footer = () => {
    return (
        <div className={footerStyles.footer}>
            <div className={`${footerStyles['button-wrapper']} fade-in anim-delay-4s flex`}>
                <div className={footerStyles['responsive-container']}>
                    {footerButtons.map(button => (
                        <a key={button.id} href={button.href} target="_blank" rel="noreferrer">
                            <button className="btn-2">
                                <span>
                                    <img id={button.id} className="svg-icon" src={button.src} alt={button.alt} />
                                </span>
                            </button>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
