import express from 'express';
export class Webserver {
    constructor(port = 3000) {
        this.port = port;
    };
    start() {
        this.expressApp = express();
        this.expressApp.use(express.static('./static')); // Serve files
        this.expressApp.listen(this.port);
    }
}
