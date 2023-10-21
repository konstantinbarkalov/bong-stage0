class App {
    constructor() {
        this.video = document.getElementById("video");
        this.startTime = Date.now();
        this.tm = 1;
        this.smoothTm = 1;
        this.isPressed = false;
        this.pressedCoords = null;
        this.coords = null;
    }

    loop__fixed() {
        this.smoothTm = this.smoothTm * 0.9 + this.tm * 0.1;
        if (this.smoothTm < 0.1) {
            this.video.pause();
        } else {
            this.video.playbackRate = this.smoothTm;
            this.video.play();
        }
    }
    loop__vari() {
    }

    startFixedLoop() {
        const fixedFps = 60;
        setInterval(() => this.loop__fixed(), 1000 / fixedFps);
    }

    getCurrentTimes() {
        return {
            system: (Date.now() - this.startTime) / 1000,
            video: this.video.currentTime,
        }
    }

    startVariLoop() {
        this.loop__vari();
        window.requestAnimationFrame(() => this.startVariLoop());
    }

    startLoops() {
        this.startFixedLoop();
        this.startVariLoop();
    }

    start() {
        console.log('Start!');
        this.video.play();
        this.startLoops();
    }
    onMouseDown(e) {
        const newCoords = {
            x: e.pageX,
            y: e.pageY,
        };
        this.setIsPressed(true);
        this.setCoords(newCoords);
    }
    onMouseUp(e) {
        const newCoords = {
            x: e.pageX,
            y: e.pageY,
        };
        this.setIsPressed(false);
        this.setCoords(newCoords);
    }
    onMouseMove(e) {
        const newCoords = {
            x: e.pageX,
            y: e.pageY,
        };
        this.setCoords(newCoords);
    }

    setIsPressed(newIsPressed) {
        if (this.isPressed !== newIsPressed) {
            if (newIsPressed) {
                this.pressedCoords = this.coords;
            } else {
                this.pressedCoords = null;
            }
        }
        this.isPressed = newIsPressed;
    }

    setCoords(newCoords) {
        if (this.isPressed && this.coords) {
            this.tm = newCoords.x - this.coords.x;
        }
        this.coords = newCoords;
    }


    doStuff2() {
        console.log(this.video.playbackRate);
        this.video.playbackRate = -0.5;
    }
}