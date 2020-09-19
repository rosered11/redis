import mongoose = require("mongoose");

export interface IProduct extends mongoose.Document
{
    id: string
    name: string
}

class Product
{
    //mongodb://root:root@localhost:30500/demo?retryWrites=true&w=majority
    public context: mongoose.Model<IProduct>;
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
}

export default Product