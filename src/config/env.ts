class Environment {
    public env: String;
    constructor(env: String) {
        this.env = env;
    }
    getRedis() {
        return {
            username: 'default',
            password: 'Vikas#110$$',
            host: '43.231.127.135',
        }

    }
}

export default new Environment('dev');
