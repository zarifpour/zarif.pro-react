import Head from 'next/head';
import React, { useEffect } from "react";
import skillsStyles from "../styles/Skills.module.css"

const skills = [
    { href: "#git_", title: "Git" },
    { href: "#json_", title: "JSON" },
    { href: "#solidity_", title: "Solidity" },
    { href: "#html_", title: "HTML" },
    { href: "#react_", title: "React" },
    { href: "#python_", title: "Python" },
    { href: "#sql_", title: "SQL" },
    { href: "#shopify_", title: "Shopify" },
    { href: "#aws_", title: "AWS" },
    { href: "#wordpress_", title: "WordPress" },
    { href: "#npm_", title: "npm" },
    { href: "#css_", title: "CSS" },
    { href: "#jquery_", title: "jQuery" },
    { href: "#js_", title: "JavaScript" },
    { href: "#c++_", title: "C++" },
    { href: "#java_", title: "Java" },
    { href: "#php_", title: "PHP" },
    { href: "#selenium_", title: "Selenium" },
    { href: "#remix_", title: "Remix" },
    { href: "#ganache_", title: "Ganache" },
    { href: "#hubspot_", title: "HubSpot" },
    { href: "#node.js_", title: "Node.js" },
    { href: "#hiveos_", title: "HiveOS" },
    { href: "#crypto_", title: "Crypto" },
    { href: "#mining_", title: "Mining" },
    { href: "#photoshop_", title: "Photoshop" },
    { href: "#illustrator_", title: "Illustrator" },
    { href: "#premier-pro_", title: "Premier Pro" },
    { href: "#truffle_", title: "Truffle" },
    { href: "#pyqt_", title: "PyQT" },
    { href: "#hardhat_", title: "Hardhat" }
];

export const Skills = () => {

    useEffect(() => {
        console.log("Loading TagCanvas...");

        TagCanvas.wheelZoom = false;
        TagCanvas.textFont = "Raleway, sans-serif";
        TagCanvas.textColour = "white";
        TagCanvas.textHeight = 26;
        TagCanvas.outlineMethod = "size";
        TagCanvas.outlineIncrease = 10;
        TagCanvas.maxSpeed = 0.03;
        TagCanvas.minBrightness = 0.2;
        TagCanvas.depth = 0.92;
        TagCanvas.pulsateTo = 0.6;
        TagCanvas.initial = [0.1, -0.1];
        TagCanvas.decel = 0.98;
        TagCanvas.reverse = true;
        TagCanvas.hideTags = false;
        TagCanvas.shadow = false;
        TagCanvas.shadowBlur = 3;
        TagCanvas.weight = false;
        TagCanvas.imageScale = null;
        TagCanvas.fadeIn = 1000;
        TagCanvas.clickToFront = 600;
        TagCanvas.width = window.innerWidth;
        TagCanvas.height = window.innerHeight;

        try {
            TagCanvas.Start("tagcanvas", "taglist");
        } catch (e) {
            console.log("Canvas error.");
            console.log(e);
        }
    }, [])

    return (
        <>
            <Head>
                <script type="text/javascript" src="/utils/tagcanvas.min.js"></script>
            </Head>

            <div id="skill-sphere" className={`${skillsStyles.tagcanvas} flex`}>
                <canvas
                    id="tagcanvas"
                    width="820"
                    height="600"
                    style={{
                        maxWidth: '1000px',
                        width: '100%',
                        zIndex: '99',
                        position: 'relative',
                        margin: '0 auto'
                    }}
                    className="to-fade-in fast-anim"
                >
                </canvas>
            </div>
            <div id="taglist" style={{ display: 'none' }}>
                <ul>
                    {skills.map(skill => (
                        <li key={skill.title}><a href={skill.href}>{skill.title}</a></li>
                    ))}
                </ul>
            </div>
        </>
    )
}