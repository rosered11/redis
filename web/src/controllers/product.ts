import express, { Request, Response } from 'express'
import Product from '../models/product'
import VProduct from '../serializer/product'
import Redis from '../redis'

class ProductController {
    public path = '/product'
    public router = express.Router()
    private product: Product
    private redis: Redis

    constructor(product: Product, redis: Redis) {
        this.product = product
        this.redis = redis
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(`${this.path}/:id`, this.getProduct)
        this.router.get(this.path, this.getAllProduct)
        this.router.post(this.path, this.createPost)
    }

    getAllProduct = async (req: Request, res: Response) => {
        let products = await this.product.find()
        res.json(products)
    }

    getProduct = async (req: Request, res: Response) => {
        let data: any = await this.redis.get(req.params.id)
        if(data){
            let redis: VProduct = JSON.parse(data);
            let result: VProduct = { id: redis.id, name: redis.name, source: this.redis.source }
            res.json(result)
        }
        else {
            let data = await this.product.findBy(req.params.id)
            if(data){
                let result: VProduct = { id: data.id, name: data.name, source: this.product.source }
                await this.redis.set(req.params.id, JSON.stringify({ id: data.id, name: data.name }))
                res.json(result)
            }
            else{
                res.status(404).send({
                    'error': 'Product not found'
                })
            }
        }
    }

    createPost = async (req: Request, res: Response) => {
        this.product.insert(req.body)
        res.status(204).send()
    }
}

export default ProductController