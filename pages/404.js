import Link from 'next/link'

function Custom404() {
    return (
        <div id="landing" className="flex noselect landing">
            <div className="title-box flex">
                <div className="heading fade-in">404</div>
                <div className="break"></div>
                <div className="body fade-in">Page not found</div>
            </div>
            <div className="fade-in" style={{ position: "fixed", bottom: "200px", pointerEvents: "auto", textDecoration: "underline", zIndex: "99"}}>
                <Link href="/">Return</Link>
            </div>
        </div>
    )
}
export default Custom404