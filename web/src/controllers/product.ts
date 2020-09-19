import express, { Request, Response } from 'express'
import Product, { IProduct } from '../models/product'
import VProduct from '../serializer/product'
import { Tedis } from "tedis";

class ProductController {
    public path = '/product'
    public router = express.Router()
    private product: Product
    private redis: Tedis

    constructor(product: Product, redis: Tedis) {
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
        let products = await this.product.context.find({})
        res.json(products)
    }

    getProduct = async (req: Request, res: Response) => {
        if (await this.redis.exists(req.params.id) > 0) {
            let cache: any = await this.redis.get(req.params.id)

            if (cache) {
                let redis: VProduct = JSON.parse(cache);

                let result = new VProduct({ id: redis.id, name: redis.name, source: "redis" })
                res.json(result)
            }
            else {
                res.status(500).send({
                    'error': 'Internal Error'
                })
            }
        }
        else {
            setTimeout(async () => {
                let data = await this.product.context.findOne({ "id": req.params.id })
                if (!data) {
                    res.status(404).send({
                        'error': 'Product not found'
                    })
                }
                else {
                    let result = new VProduct({ id: data.id, name: data.name, source: "mongo" })
                    await this.redis.set(req.params.id, JSON.stringify({ id: data.id, name: data.name }))
                    res.json(result)
                }
            }, 3000);
        }

    }

    createPost = async (req: Request, res: Response) => {
        const createProduct: IProduct = new this.product.context(req.body)
        createProduct.save()
        res.status(204).send()
    }
}

export default ProductController