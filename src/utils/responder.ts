import { Request, Response, NextFunction } from "express";

export default function (fn: CallableFunction) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await fn(req, res, next)

            res.status(response.status ?? 200).json({
                message: response.message ?? 'Request executed successfully',
                data: response.data ?? []
            })
        } catch (error) {
            res.status(400).json({
                message: 'Something went wrong!',
                errors: error
            })
        }
    }
}