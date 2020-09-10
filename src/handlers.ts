import { Request, Response } from 'express'

interface HelloResponse{
    hello: string
}

type HelloBuilder = (name: string) => HelloResponse

const helloBuilder: HelloBuilder = name => ({ hello: name });

export const rootHandler2 = (req :Request, res :Response) => res.send('API is working 🤓')

class Handler {
    rootHandler(req: Request, res: Response): any{
        return res.send('API is working 🤓')
    }
    helloHandler(req: Request, res: Response): any{
        const { params } = req;
        const { name = 'World' } = params;
        const response = helloBuilder(name);

        return res.json(response);
    }
}

//export default new Handler()