import App from './app'

const app = new App({ port: 5000, mongo: 'mongodb://root:root@localhost:30500/redis?retryWrites=true&w=majority' })
app.listen()