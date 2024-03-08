import { getRoom } from "../helpers/commonHelper";
import Redis from "./redis"
export default class Socketio {
    private http: any;
    private io: any;
    constructor(http: any) {
        this.http = http;

        this.io = require('socket.io')(http, {
            cors: {
                origin: '*',
            }
        });
        this.init();

    }

    init = () => {
        this.io.on('connection', async (client: any) => {
            console.log("connected user id ", client.handshake.query.userid, client.handshake.query.mobile);
            await Redis.client.hSet(`user:${client.handshake.query.mobile}`, 'online', 1);
            client.on("startchat", async (payload: any) => {
                console.log("startchat payload", payload);
                const rommId = getRoom(payload.chatId, payload.userId)
                console.log("startchat rommId", rommId);

                client.join(rommId);
                const messages: any = await Redis.client.LRANGE(`chat:${rommId}`, 0, -1);
                this.io.in(rommId).emit('fetchmessage', messages);

                client.broadcast.to(rommId).emit('online', client.handshake.query.userid);


            });
            client.on("sendmessage", async (payload: any) => {
                console.log("sendmessage payload", payload);
                const rommId = getRoom(payload.receiverId, payload.userId)
                console.log("sendmessage rommId", rommId);

                await Redis.client.rPush(`chat:${rommId}`, JSON.stringify(payload));

                // client.broadcast.to(rommId).emit('receivermessage', payload);
                this.io.in(rommId).emit('receivermessage', payload);

            });

            client.on("disconnect", async () => {
                console.log("disconnect", client.handshake.query);
                this.io.emit('offline', client.handshake.query.userid);
                await Redis.client.hSet(`user:${client.handshake.query.mobile}`, 'online', 0);
            });

        });
    }
}