import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    brewery_id?: string;
}

export const validateBreweryId = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Extract the brewery_id from the query parameters
    const { brewery_id } = req.query;

    // Attach brewery_id to the request object
    req.brewery_id = brewery_id as string;

    next();
};