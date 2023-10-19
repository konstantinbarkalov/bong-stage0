
const video = document.getElementById("video");
const startTime = Date.now();
let tm = 1;
let smoothTm = 1;
let isPressed = false;
let pressedCoords = null;
let coords = null;

function loop__fixed() {
    smoothTm = smoothTm * 0.9 + tm * 0.1;
    if (smoothTm < 0.1) {
        video.pause();
    } else {
        video.playbackRate = smoothTm;
        video.play();
    }
}
function loop__vari() {
}

function startFixedLoop() {
    const fixedFps = 60;
    setInterval(loop__fixed, 1000 / fixedFps);
}

function getCurrentTimes() {
    return {
        system: (Date.now() - startTime) / 1000,
        video: video.currentTime,
    }
}

function startVariLoop() {
    loop__vari();
    window.requestAnimationFrame(startVariLoop);
}

function startLoops() {
    startFixedLoop();
    startVariLoop();
}

function start() {
    console.log('Start!');
    video.play()
    startLoops();
}
function onMouseDown(e) {
    const newCoords = {
        x: e.pageX,
        y: e.pageY,
    };
    setIsPressed(true);
    setCoords(newCoords);
}
function onMouseUp(e) {
    const newCoords = {
        x: e.pageX,
        y: e.pageY,
    };
    setIsPressed(false);
    setCoords(newCoords);
}
function onMouseMove(e) {
    const newCoords = {
        x: e.pageX,
        y: e.pageY,
    };
    setCoords(newCoords);
}

function setIsPressed(newIsPressed) {
    if (isPressed !== newIsPressed) {
        if (newIsPressed) {
            pressedCoords = coords;
        } else {
            pressedCoords = null;
        }
    }
    isPressed = newIsPressed;
}

function setCoords(newCoords) {
    if (isPressed && coords) {
        tm = newCoords.x - coords.x; 
    }
    coords = newCoords;
}


    function doStuff2() {
        console.log(video.playbackRate);
        video.playbackRate = -0.5;
    }