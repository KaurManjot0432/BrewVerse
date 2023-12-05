import Review, { ReviewModel } from '../entities/Review';
import { Types } from 'mongoose';

export class ReviewDAO {
    public async create(review: Review): Promise<Review> {
        const now = new Date();
        review.createdAt = review.updatedAt = now;
        const createdReview = await ReviewModel.create(review);
        return createdReview.toObject();
    }

    public async findByBreweryId(id: string): Promise<Review[] | null> {
        const reviews = await ReviewModel.find({ brewery_id: id }).exec();
        console.log(reviews);
        return reviews;
    }
}