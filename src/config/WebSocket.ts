import { WebSocketServer } from 'ws';
import {Server} from "http";

export default class WebSocketIo {
    private server: Server;
    private wss: any;
    constructor(server: Server) {
        this.server = server;
        this.wss = new WebSocketServer({ server });

        this.init();

    }
    init = () => {
        this.wss.on('connection', function connection(ws: any) {
            console.log("connection established");
            ws.on('error', console.error);

            ws.on('message', function message(data: any) {
                console.log('received: %s', data);
            });

            ws.send('something');
        });

    }
}