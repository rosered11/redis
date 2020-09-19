import express, { Application, Request, Response } from 'express'
import Product, { IProduct } from './models/product'
import bodyParser from 'body-parser'
import cors = require('cors')
import ProductController from './controllers/product'

class App
{
    public app: Application
    public port: number

    constructor(appInit: { port: number; mongo: string;}){
        this.app = express()
        this.port = appInit.port
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.routes(new ProductController(new Product({ constring: appInit.mongo })))
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