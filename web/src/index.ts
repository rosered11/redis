import App from './app'
import Redis from "./redis"

const dbport = '30500'
const user = 'root:root'
const server = '128.199.108.10'
const dbname = 'redis'
const redis_server = 'localhost'
const redis_port = 6379

const app = new App({ 
    port: 5000, 
    mongo: `mongodb://${user}@${server}:${dbport}/${dbname}?retryWrites=true&w=majority`,
    redis: new Redis({ port: redis_port, host: redis_server}) 
})
app.listen()