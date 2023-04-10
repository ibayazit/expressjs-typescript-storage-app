import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => res.status(404).json({
    message: 'Route does not exists!',
    data: [],
    errors: [
        'Route does not exists!'
    ]
})