import { Tedis } from "tedis";

class Redis {
    private redis: Tedis
    constructor(init: { port: number; host: string;}){
        this.redis = new Tedis({
            port: init.port,
            host: init.host
        });
    }

    public async set(key: string, data: any){
        return await this.redis.set(key, data)
    }

    public async get(key: string){
        return await this.redis.get(key)
    }

    public async check(key: string){
        
    }
}

export default Redis