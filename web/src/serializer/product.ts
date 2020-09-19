class Product{
    id: string
    name: string
    source: string

    constructor(init: { id: string; name: string; source: string; }){
        this.id = init.id
        this.name = init.name
        this.source = init.source
    }
}

export default Product