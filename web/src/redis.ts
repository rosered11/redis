import { Tedis } from "tedis";

class Redis {
    private redis: Tedis
    public source: string
    constructor(init: { port: number; host: string;}){
        this.redis = new Tedis({
            port: init.port,
            host: init.host
        });
        this.source = "redis"
    }

    public async set(key: string, data: any){
        return await this.redis.set(key, data)
    }

    public async get(key: string){
        if(this.check(key)){
            return await this.redis.get(key)
        }
        return null
    }

    public async check(key: string): Promise<boolean>{
        return await this.redis.exists(key) > 0
    }
}

export default Redis