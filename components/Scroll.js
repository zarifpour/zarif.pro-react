import scrollStyles from '../styles/Scroll.module.css'

const hints = [
    { id: "right-scroll", class: `${scrollStyles['scroll-down']}` },
    { id: "left-scroll", class: `${scrollStyles['scroll-down']} ${scrollStyles['scroll-down--left']}` }
];

export const Scroll = () => {
    return (
        <div id={scrollStyles['scroll-hint']} className="fade-in anim-delay-4-5s">
            {hints.map(hint => (
                <div key={hint.id} className={hint.class}>
                    <span>scroll down</span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-down" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-arrow-down fa-w-14 fa-5x">
                        <path fill="white"
                            d="M443.5 248.5l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L241 419.9V44c0-6.6-5.4-12-12-12h-10c-6.6 0-12 5.4-12 12v375.9L28.5 241.4c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.8 4.8-12.3.1-17z"
                        ></path>
                    </svg>
                </div>
            ))}
        </div>
    )
}
