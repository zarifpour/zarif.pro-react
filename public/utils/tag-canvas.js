//<![CDATA[
    window.onload = function () {
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
        }
    };
    function restart() {
        TagCanvas.shape = shape;
        TagCanvas.lock = lock;
        TagCanvas.Start("tagcanvas", ttags);
    }
    function changetags(t) {
        ttags = t;
        restart();
    }
//]]>

// try {
//     TagCanvas.Start(
//         'tagcanvas',
//         'taglist',
//         {
//             wheelZoom: 'false',
//             textFont: 'Raleway, sans-serif',
//             textColour: 'white',
//             textHeight: '26',
//             outlineMethod: 'size',
//             outlineIncrease: '10',
//             maxSpeed: '0.03',
//             minBrightness: '0.2',
//             depth: '0.92',
//             pulsateTo: '0.6',
//             initial: '[0.1, -0.1]',
//             decel: '0.98',
//             reverse: 'true',
//             hideTags: 'false',
//             shadow: 'false',
//             shadowBlur: '3',
//             weight: 'false',
//             imageScale: 'null',
//             fadeIn: ' 1000',
//             clickToFront: '600',
//             width: 'window.innerWidth',
//             height: 'window.innerHeight'
//         }
//     );
// }
// catch (e) {
//     document.getElementById('skill-sphere').style.display = 'none';
//     console.log("Canvas error.");
// }

    // useEffect(() => {
    //     eval(
    //         `try {
    //             TagCanvas.Start(
    //                 'tagcanvas',
    //                 'taglist',
    //                 {
    //                     wheelZoom: 'false',
    //                     textFont: 'Raleway, sans-serif',
    //                     textColour: 'white',
    //                     textHeight: '26',
    //                     outlineMethod: 'size',
    //                     outlineIncrease: '10',
    //                     maxSpeed: '0.03',
    //                     minBrightness: '0.2',
    //                     depth: '0.92',
    //                     pulsateTo: '0.6',
    //                     initial: '[0.1, -0.1]',
    //                     decel: '0.98',
    //                     reverse: 'true',
    //                     hideTags: 'false',
    //                     shadow: 'false',
    //                     shadowBlur: '3',
    //                     weight: 'false',
    //                     imageScale: 'null',
    //                     fadeIn: ' 1000',
    //                     clickToFront: '600',
    //                     width: 'window.innerWidth',
    //                     height: 'window.innerHeight'
    //                 }
    //             );
    //         }
    //         catch(e) {
    //             document.getElementById('skill-sphere').style.display = 'none';
    //         }`
    //     );
    // }, []);