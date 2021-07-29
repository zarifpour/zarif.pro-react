import { Layout } from '../components/Layout'
import { AppWrapper } from '../components/AppWrapper'
import '../styles/globals.css'

function App({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppWrapper>
    )
}

export default App