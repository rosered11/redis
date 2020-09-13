import express, { Application, Request, Response } from 'express'
import Product, { IProduct } from './product'
import bodyParser from 'body-parser'
import cors from 'cors'

class App
{
    public app: Application
    public port: number

    constructor(appInit: { port: number; mongo: string;}){
        this.app = express()
        this.port = appInit.port
        this.app.use(cors)
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

class ProductController
{
    public path = '/product'
    public router = express.Router()
    private product: Product
 
    constructor(product: Product){
        this.product = product
        this.initRoutes()
    }

    public initRoutes(){
        this.router.get(`${this.path}/:id`, this.getProduct)
        this.router.get(this.path, this.getAllProduct)
        this.router.post(this.path, this.createPost)
    }

    getAllProduct = async (req: Request, res: Response) => {
        let products = await this.product.context.find({})
        console.log(`product => ${process}`)
        res.json(products)
    }

    getProduct = async (req: Request, res: Response) => {       
        let result = await this.product.context.find({ "id": req.params.id })
        if(!result){
            res.status(404).send({
                'error': 'Product not found'
            })
        }
        res.json(result)
    }

    createPost = async (req: Request, res: Response) => {
        const createProduct: IProduct = new this.product.context(req.body)
        createProduct.save()
        res.status(204).send()
    }
}


export default App