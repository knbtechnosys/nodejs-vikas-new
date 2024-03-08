import { createClient } from 'redis';
import env from "./env";
export default new class Redis {
    public client: any;
    constructor() {
        console.log("Redis constructor");
        this.init();
    }
    init = async () => {
        var rediConf = env.getRedis();
        this.client = createClient({
            username: rediConf.username,
            password: rediConf.password,
            socket: {
                host: rediConf.host,
                port: 6379,

            }
        });
        this.client.on('error', (err: any) => console.log('Redis Client Error', err));

        await this.client.connect();
        console.log("Connect");
    }

    setData = async (key: any, value: any) => {
        return await this.client.set(key, value);

    }
    getData = async (key: any) => {
        return await this.client.get(key);

    }
    hGetAll = async (key: any) => {
        console.log("sdc", key);
        return await this.client.hGetAll(key);

    }

    // var r = await Redis.getData("foo");
    // var r = await Redis.setData("foo", "changes");
    // var r = await Redis.getData("foo");
    // console.log(r);

    // const res1 = await Redis.client.lPush('users', 'bike:1');
    // await Redis.client.lPush('users', 'bike:2');

    // const fieldsAdded = await Redis.client.hSet(
    //     'bike:1',
    //     {
    //         model: 'Deimos',
    //         brand: 'Ergonom',
    //         type: 'Enduro bikes',
    //         price: 4972,
    //     },
    // )

    // const rr = await Redis.client.hGetAll("bike:1");
    // console.log("rr", rr.model);
}();