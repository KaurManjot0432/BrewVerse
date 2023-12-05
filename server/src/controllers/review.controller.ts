import { ReviewService } from "../services/review.service";
import { Request, Response, NextFunction } from 'express';
import Logger from '../core/Logger';

interface CustomRequest extends Request {
    brewery_id?: string;
}

export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
        try {
            const review = await this.reviewService.createReview(req.body);
            res.status(201).send({ success: true, review });
        } catch (err) {
            console.log(err);
            Logger.error(err);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };

    public getReviews = async (req: CustomRequest, res: Response) : Promise<void | Response<any>> => {
        try {
            const reviews = await this.reviewService.findByBreweryId(req.brewery_id);
            res.status(200).send({ success: true, reviews});
        } catch (err) {
            console.log(err);
            Logger.error(err);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
}
