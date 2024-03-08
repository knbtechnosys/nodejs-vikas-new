import * as express from 'express';
var cors = require('cors')
import Socketio from "./scoket";
import WebSocketIo from "./WebSocket";
import Routes from "../routes/routes";
export default class App {
    private app: any;
    private http: any;
    private port: Number;
    constructor(port: Number) {
        this.port = port;
    }

    start = () => {
        this.app = express();
        this.app.use(cors());

        // this.app.use(bodyParser.json()); // support json encoded bodies
        this.app.use(express.urlencoded({ extended: true })); // support encoded bodies

        this.http = require("http").createServer(this.app);

        new Socketio(this.http,);
        // new WebSocketIo(this.http);

        new Routes(this.app);

        this.http.listen(this.port, () => {
            console.log(`App listen on port ${this.port}`);
        });


    }
}