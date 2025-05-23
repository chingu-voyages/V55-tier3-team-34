import {Response, NextFunction, Request} from 'express'
export interface AppError extends Error {
    status?: number
}

export const errorHandler = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction,

) => {
    console.error(`${req.hostname}: ${req.method}:${req.statusCode}: ${error.status}: ${error.message}`)
    res.status(error.status || 500).json({
        message: error.message || 'internal server Error '
    })
}
