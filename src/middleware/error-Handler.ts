import { Request, Response, } from "express"
import { CustomAPIError } from "../errors/custome-error"
const errorHandler = (err: any, req: Request, res: Response, next: any) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Something went wrong!' })
}

export default errorHandler