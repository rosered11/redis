import express, { Application } from 'express'
import Product from './models/product'
import bodyParser from 'body-parser'
import cors from 'cors'
import ProductController from './controllers/product'
import Redis from "./redis"

class App
{
    public app: Application
    public port: number

    constructor(appInit: { port: number; mongo: string; redis: Redis}){
        this.app = express()
        this.port = appInit.port
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.routes(
            new ProductController(
                new Product({ constring: appInit.mongo }),
                appInit.redis
            )
        )
    }

    private routes(controller: ProductController){
        this.app.use('/', controller.router)
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App