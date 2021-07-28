import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars as Space } from "@react-three/drei";
// import * as THREE from "three";
import star from "../public/img/star.png"
import starsStyles from '../styles/Stars.module.css'

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    // console.log(windowSize);
    return windowSize;
}

export const Stars = () => {
    const size = useWindowSize();
    const width = size.width;
    const height = size.height;

    // let scene, camera, renderer, stars, starGeo;
    // function init() {
    //     scene = new THREE.Scene();
    //     camera = new THREE.PerspectiveCamera(
    //         60,
    //         { width } / { height },
    //         1,
    //         1000
    //     );
    //     camera.position.z = 1;
    //     camera.rotation.x = Math.PI / 2;

    //     renderer = new THREE.WebGLRenderer();
    //     renderer.setSize({ width }, { height });

    //     var canvas = renderer.domElement;
    //     canvas.setAttribute("id", "star-canvas");
    //     canvas.setAttribute("class", "fade-in");

    //     document.getElementById('star-canvas').appendChild(canvas);

    //     starGeo = new THREE.Geometry();
    //     for (let i = 0; i < 6000; i++) {
    //         star = new THREE.Vector3(
    //             Math.random() * 600 - 300,
    //             Math.random() * 600 - 300,
    //             Math.random() * 600 - 300
    //         );
    //         star.velocity = 0;
    //         star.acceleration = 0.0001;
    //         starGeo.vertices.push(star);
    //     }

    //     let sprite = new THREE.TextureLoader().load("/assets/star.png");
    //     let starMaterial = new THREE.PointsMaterial({
    //         color: 0xaaaaaa,
    //         size: 0.7,
    //         map: sprite,
    //     });

    //     stars = new THREE.Points(starGeo, starMaterial);
    //     scene.add(stars);

    //     window.addEventListener("resize", onWindowResize, false);

    //     animate();
    // }
    // function onWindowResize() {
    //     camera.aspect = { width } / { height };
    //     camera.updateProjectionMatrix();
    //     renderer.setSize({ width }, { height });
    // }
    // function animate() {
    //     starGeo.vertices.forEach((p) => {
    //         p.velocity += p.acceleration;
    //         p.y -= p.velocity;

    //         if (p.y < -200) {
    //             p.y = 200;
    //             p.velocity = 0;
    //         }
    //     });
    //     starGeo.verticesNeedUpdate = true;
    //     stars.rotation.y += 0.0005;

    //     renderer.render(scene, camera);
    //     requestAnimationFrame(animate);
    // }
    // init();

    return (
        <Canvas id={starsStyles['star-canvas']} className="fade-in">
            {/* <OrbitControls /> */}
            <Space />
        </Canvas>
    )
}

// if (typeof window !== 'undefined') {
//     ReactDOM.render(<Canvas />, document.getElementById("star-canvas"));
// }