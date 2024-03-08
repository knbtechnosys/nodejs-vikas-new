import Redis from "../config/redis"

export default class OauthController {
    constructor() {

    }
    checkUser = async (req: any, res: any) => {
        console.log(req.body)
        let userInfo = await Redis.client.hGetAll(`user:${req.body.mobile}`);
        console.log("userInfo", userInfo);
        if (Object.keys(userInfo).length === 0) {
            const userId = await Redis.client.incr(`userCount`);
            console.log("userId", userId);
            userInfo = {
                ...req.body,
                userId,
                online: false
            }
            console.log("userInfo", userInfo);
            const writeRes = await Redis.client.hSet(`user:${req.body.mobile}`, userInfo);
            console.log("writeRes", writeRes);
        }

        const users = await Redis.client.keys("user:*");
        const allusers: any = [];
        if (users.length !== 0) {
            for (let i = 0; i < users.length; i++) {
                if (`user:${req.body.mobile}` == users[i])
                    continue;
                const uInfo = await Redis.hGetAll(users[i]);
                console.log("uInfo", uInfo);
                allusers.push({ ...uInfo });
            }
        }

        res.send({ userInfo, allusers })
    }
}