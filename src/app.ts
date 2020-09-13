import express, { Application, Request, Response } from 'express'

class App
{
    public app: Application
    public port: number

    constructor(appInit: { port: number;}){
        this.app = express()
        this.port = appInit.port
        this.routes(new ProductController())
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
    private products: IProduct[] = [
        {
            id: '1',
            name: 'hello'
        },
        {
            id: '2',
            name: 'hello2'
        }
    ]

    constructor(){
        this.initRoutes()
    }

    public initRoutes(){
        this.router.get(`${this.path}/:id`, this.getProduct)
        this.router.get(this.path, this.getAllProduct)
    }

    getAllProduct = (req: Request, res: Response) => {
        res.send(this.products)
    }
    getProduct = (req: Request, res: Response) => {
        const id = req.params.id
        let result = this.products.find(x => x.id == id)
        if(!result){
            res.status(404).send({
                'error': 'Product not found'
            })
        }
        res.send(result)
    }
}

interface IProduct{
    id: string
    name: string
}
export default App