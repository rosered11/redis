import App from './app'

const dbport = '30500'
const user = 'root:root'
const server = '128.199.108.10'
const dbname = 'redis'
const app = new App({ port: 5000, mongo: `mongodb://${user}@${server}:${dbport}/${dbname}?retryWrites=true&w=majority` })
app.listen()