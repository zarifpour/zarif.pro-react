import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* SEO */}
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            {/* JS */}
            <script type="text/javascript" src="/utils/tagcanvas.min.js"></script>
            <link rel="icon" href="/img/logo.png" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: "@zarifpour",
    keywords: "web development, software engineering, programming, blockchain",
    description: "Creator | Engineer. I am a Blockchain passioned Full-stack engineer — making complex ideas into simple applications."
}

export default Meta