import Meta from './Meta'
import { Header } from './Header'
import { Footer } from './Footer'
import { Stars } from './Stars'
import styles from '../styles/Layout.module.css'

export const Layout = ({ children }) => {
    return (
        <>
            <Meta />
            <main>
                <Header />
                <Footer />
                <Stars />
                {children}
            </main>
        </>
    )
}
