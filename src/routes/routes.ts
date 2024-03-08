import OauthController from "../controller/oauthController"
var path = require("path");
var fs = require('fs');

export default class Routes {
    private app: any;
    private oauthController: OauthController;
    constructor(app: any) {
        this.app = app;
        this.oauthController = new OauthController();
        this.routes();
    }
    routes = () => {
        this.app.get('/', (req: any, res: any) => {
            var file = path.join(__dirname + '../../view/index.html');
            console.log(file);
            console.log("Login l ");
            res.sendFile(file);
        });

        this.app.get('/style.css', (req: any, res: any) => {
            var cssPath = path.join(__dirname, '../assets/style.css');

            var fileStream = fs.createReadStream(cssPath, "UTF-8");
            res.writeHead(200, { "Content-Type": "text/css" });
            fileStream.pipe(res);
        });

        this.app.post('/authuser', (req: any, res: any) => {
            this.oauthController.checkUser(req, res);
        });
    }
}