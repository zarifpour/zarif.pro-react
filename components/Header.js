import headerStyles from '../styles/Header.module.css'

export const Header = () => {
    return (
        <div id={headerStyles['fork-me']}>
            <a id="fork-me" href="https://github.com/zarifpour/zarif.pro-react" target="_blank" rel="noreferrer" className="fade-in anim-delay-4-5s"><img loading="lazy" width="149" height="149" src="https://github.com/aral/fork-me-on-github-retina-ribbons/blob/master/images/fork-me-right-white@2x.png?raw=true" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" /></a>
        </div>
    )
}
