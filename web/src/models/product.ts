import mongoose = require("mongoose");
import { setTimeout } from 'timers';

export interface IProduct extends mongoose.Document
{
    id: string
    name: string
}

class Product
{
    private context: mongoose.Model<IProduct>;
    public source: string = 'mongo'
    constructor(args: { constring: string;}){
        mongoose.connect(args.constring, (err: any) =>{
            if(err){
                console.log(err.message);
            }
            else{
                console.log("Product Connected...");
            }
        })
        this.context = this.init()
    }

    init(){
        let productSchema = new mongoose.Schema({
            id: { type: String, required: true },
            name: { type: String }
        })

        return mongoose.model<IProduct>("Product", productSchema)
    }

    async find(){
        return await this.context.find({})
    }

    async findBy(key: string){
        await this.deley(3000)
        return await this.context.findOne({ "id": key })
    }

    async insert(data: any){
        let create = new this.context(data)
        return await create.save()
    }

    async deley(ms: number){
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export default Product