import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { validateReview } from '../middlewares/validation.middleware';
import { ReviewService } from '../services/review.service';

export class ReviewRouter {
    readonly router: Router = Router();
    readonly reviewController: ReviewController;

    constructor(reviewService: ReviewService) {
        this.reviewController = new ReviewController(reviewService);
    }

    public initializeRoutes(): Router {
        this.router
            .route('/')
            .post(validateReview, this.reviewController.create)
        this.router
            .route('/reviews')
            .get(this.reviewController.getReviews);

        return this.router
    }
}