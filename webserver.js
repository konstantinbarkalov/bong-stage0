import express from 'express';
import os from 'os';
export class Webserver {
    constructor(port = 3000) {
        this.port = port;
    };
    start() {
        this.expressApp = express();
        this.expressApp.use(express.static('./static')); // Serve files
        this.expressApp.listen(this.port);
        console.log(`server started at http://${os.hostname}:${this.port}`);
    }
}
