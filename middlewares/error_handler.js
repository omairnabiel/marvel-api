import { ApiError } from '../utils/api_error.js'

export const errorHandlerMiddleware = (err,req,res,next) => {
    if(err instanceof ApiError) {
       return res.status(err.code).json({
            message: err.message
        })
    }
    res.status(500)
}