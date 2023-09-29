import { Request, Response } from "express-serve-static-core"
const asyncWrqper =(fn: any) => {
    return async (req: Request, res: Response, next: any) => {
        try {
            await(fn(req, res, next))
        } catch (error) {
            next(error)
        }
    }
}

export default asyncWrqper