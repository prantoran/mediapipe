import { FACEMESH_TESSELATION } from './config.js';

class State {
    constructor() {
        this.canvasCtx = null;
        this.canvasCtxGL = null;
        this.imgPointer = null;
        this.maskPointer = null;
        this.imgSize = 0;
        this.graph = null;
        this.imgChannelsCount = 4;
        this.detectFace = false;
        this.selfieSegmentation = false;
        this.useBackgroundImage = false;
        this.useBackgroundColor = false;
        this.showFaceMesh = false;
        this.maskRawData = null;
        this.maskCtx = null;
        this.background = null;
    }

    getMaskRawData() {
        return this.maskRawData;
    }
};

const state = new State();

const MASK = {
    FACE_DETECTION: 1,
    SELFIE_SEGMENTATION: 2
};

const setBackgroundColor = function (event) {
    console.log("event.target.value", event.target.value);
    state.maskCtx.fillStyle = event.target.value;
    state.maskCtx.fillRect(0, 0, 640, 480);
    state.maskRawData = state.maskCtx.getImageData(0, 0, 640, 480);
    Module.HEAPU8.set(state.maskRawData.data, state.maskPointer);

}


const loadFile = function (event) {
    const image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    if (!state.background) {
        state.background = new Image();
    }
    state.background.onload = function () {
        state.maskCtx.drawImage(state.background, 0, 0, 640, 480);
        state.maskRawData = state.maskCtx.getImageData(0, 0, 640, 480);
        Module.HEAPU8.set(state.maskRawData.data, state.maskPointer);

    }
    state.background.src = document.getElementById("output").src; // Set source path

};


function runGraph(state, videoElem, Module) {
    if (!state.graph) {
        state.graph = new Module.GraphContainer();
    }

    const camera = new Camera(videoElem, {
        onFrame: async () => {
            state.canvasCtx.drawImage(videoElem, 0, 0, 640, 480);
            state.canvasDirectInputOutputCtx.drawImage(videoElem, 0, 0, 640, 480);

            const rawData = state.canvasCtx.getImageData(0, 0, 640, 480);
            const rawDataSize = state.imgChannelsCount * rawData.width * rawData.height;

            state.canvasCtxOutput.clearRect(0, 0, state.canvasElementOverlay.width, state.canvasElementOverlay.height);

            state.canvasCtxOutput.drawImage(state.canvasCtxGL.canvas, 0, 0, 640, 480);

            if (!state.imgSize || state.imgSize != rawDataSize) {

                if (state.imgPointer) {
                    Module._free(state.imgPointer);
                }

                if (state.maskPointer) {
                    Module._free(state.maskPointer);
                }

                state.imgSize = rawDataSize;
                state.imgPointer = Module._malloc(state.imgSize);
                state.maskPointer = Module._malloc(state.imgSize);
            }

            Module.HEAPU8.set(rawData.data, state.imgPointer);

            if (state.getMaskRawData() && (state.useBackgroundImage || state.useBackgroundColor)) {
//                 // Module.HEAPU8.set(state.getMaskRawData().data, state.maskPointer);
//                 const ret = state.graph.runWithMask(state.imgPointer, state.maskPointer, state.imgSize);
            } else {
//                 const ret = state.graph.runWithMask(state.imgPointer, state.imgPointer, state.imgSize);
            }

            const n = 468; //state.graph.facesLandmarks.size();
            if (state.showFaceMesh && n > 0) {
                
                state.canvasCtxOutput.strokeStyle = "white";
                state.canvasCtxOutput.lineWidth = 1;
                state.canvasCtxOutput.globalAlpha = 1.0;

                state.canvasCtxOutput.beginPath();
                for (let i = 0; i < FACEMESH_TESSELATION.length;i ++) {
//                     const u = state.graph.getFaceMeshLandMark(FACEMESH_TESSELATION[i][0]);
//                     const v = state.graph.getFaceMeshLandMark(FACEMESH_TESSELATION[i][1]);

                    // state.canvasCtxOutput.moveTo(u.x * rawData.width, u.y*rawData.height);
                    // state.canvasCtxOutput.lineTo(v.x * rawData.width, v.y*rawData.height);
                    state.canvasCtxOutput.stroke();
                }
            }

            if (state.detectFace) {
//                 const n = state.graph.boundingBoxes.size();

                state.canvasCtxOutput.strokeStyle = "cyan";
                state.canvasCtxOutput.lineWidth = 5;
                state.canvasCtxOutput.globalAlpha = 0.7;

//                 for (let i = 0; i < n; i++) {
//                     const bb = state.graph.boundingBoxes.get(i);
//                     const w = bb.width * rawData.width;
//                     const h = bb.height * rawData.height;
//                     const x = bb.x * rawData.width;
//                     const y = bb.y * rawData.height;
//                     state.canvasCtxOutput.strokeRect(x, y, w, h);
//                 }
            }
        },
        width: 640,
        height: 480
    });

    camera.start();
    // Module.runMPGraph();
}


window.onload = function () {

    const videoElement = document.getElementById('input_video');
    videoElement.style.width = "100%";


    const videoContainer = document.getElementById("input_video_container");
    videoContainer.width = "100%";
    const videoContainerOuput = document.getElementById("output_video_container");
    videoContainerOuput.width = "100%";

    state.canvasElementInput = document.getElementById('input_video_canvas');
    state.canvasElementInput.style.position = "absolute";
    state.canvasElementInput.style.width = "100%";
    state.canvasElementInput.style.top = "1.6em";
    state.canvasElementInput.style.left = "0";
    state.canvasCtx = state.canvasElementInput.getContext('2d');

    state.canvasMaskElement = document.getElementById('mask_canvas');
    state.canvasMaskElement.style.width = "100%";
    state.canvasMaskElement.style.display = "none";
    state.maskCtx = state.canvasMaskElement.getContext('2d');


    state.canvasDirectInputOutput = document.getElementById("direct_input_ouput");
    state.canvasDirectInputOutput.style.postion = "absolute";
    state.canvasDirectInputOutput.style.width = "100%";
    state.canvasDirectInputOutput.style.top = "1.6em";
    state.canvasDirectInputOutput.style.left = "0";
    state.canvasDirectInputOutputCtx = state.canvasDirectInputOutput.getContext('2d');

    state.canvasGL = document.querySelector("#glCanvas");
    state.canvasGL.style.postion = "absolute";
    state.canvasGL.style.width = "100%";
    state.canvasGL.style.top = "1.6em";
    state.canvasGL.style.left = "0";


    Module.canvas = state.canvasGL;

    // Initialize the GL context
    state.canvasCtxGL = state.canvasGL.getContext("webgl2", { preserveDrawingBuffer: true });

    // Only continue if WebGL is available and working
    if (state.canvasCtxGL === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    state.canvasGL.addEventListener(
        "webglcontextlost",
        function (e) {
            alert('WebGL context lost. You will need to reload the page.');
            e.preventDefault();
        },
        false
    );

    // Set clear color to black, fully opaque
    state.canvasCtxGL.clearColor(25 / 255, 118 / 255, 210 / 255, 0.5); // rgb alpha
    // Clear the color buffer with specified clear color
    state.canvasCtxGL.clear(state.canvasCtxGL.COLOR_BUFFER_BIT);


    state.canvasElementOverlay = document.getElementById('overlay_canvas');
    state.canvasElementOverlay.style.position = "absolute";
    state.canvasElementOverlay.style.width = "100%";
    state.canvasElementOverlay.style.top = "1.6em";
    state.canvasElementOverlay.style.left = "0";

    state.canvasCtxOutput = state.canvasElementOverlay.getContext('2d');

    document.getElementById("btnRunGraph").onclick = function () {
        document.getElementById("btnRunGraph").style.display = "none";
        state.canvasDirectInputOutput.style.display = "";
        runGraph(state, videoElement, Module);
    }

    document.getElementById("btnFaceMesh").onclick = function () {
        state.showFaceMesh = !state.showFaceMesh;
        if (state.showFaceMesh) {
            document.getElementById("btnFaceMesh").innerHTML = "<span>Hide Face Mesh</span>";
        } else {
            document.getElementById("btnFaceMesh").innerHTML = "<span>Show Face Mesh</span>";
        }
    }

    document.getElementById("btnFaceDetection").onclick = function () {
        state.detectFace = !state.detectFace;
        if (state.detectFace) {
            document.getElementById("btnFaceDetection").innerHTML = "<span>Disable Face Detection</span>";
        } else {
            document.getElementById("btnFaceDetection").innerHTML = "<span>Enable Face Detection</span>";
        }
    }

    document.getElementById("btnSelfieSegmentation").onclick = function () {
        state.selfieSegmentation = !state.selfieSegmentation;
        if (state.selfieSegmentation) {
            state.canvasDirectInputOutput.style.display = "none";
            state.canvasGL.style.display = "";
            document.getElementById("selfie_segmentation_opts").style.display = "";
            document.getElementById("btnSelfieSegmentation").innerHTML = "<span>Disable Selfie Segmentation</span>";
        } else {
            state.canvasDirectInputOutput.style.display = "";
            state.canvasGL.style.display = "none";

            document.getElementById("selfie_segmentation_opts").style.display = "none";
            document.getElementById("btnSelfieSegmentation").innerHTML = "<span>Enable Selfie Segmentation</span>";
        }

    }

    document.getElementById("btnSetBackground").onclick = function () {
        state.useBackgroundImage = !state.useBackgroundImage;

        if (state.useBackgroundImage) {
            document.getElementById("background_input").style.display = "block";
        } else {
            document.getElementById("background_input").style.display = "none";
        }
    }

    document.getElementById("btnSetBackgroundColor").onclick = function () {
        state.useBackgroundColor = !state.useBackgroundColor;

        if (state.selfieSegmentation && state.useBackgroundColor) {
            document.getElementById("color_input").style.display = "block";
        } else {
            document.getElementById("color_input").style.display = "none";
        }
    }

    document.getElementById("file").onchange = function (event) {
        loadFile(event);
    }

    document.getElementById("favcolor").onchange = function (event) {
        setBackgroundColor(event);
    }
}
