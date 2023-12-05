import { ReviewDAO } from "../dao/review.dao";
import Review from "../entities/Review";

export class ReviewService {
    readonly reviewDAO: ReviewDAO

    constructor() {
        this.reviewDAO = new ReviewDAO()
    }

    public async createReview(review: Review): Promise<Review> {
        return await this.reviewDAO.create(review);
    }

    public async findByBreweryId(id: string): Promise<Review[] | null> {
        return await this.reviewDAO.findByBreweryId(id);
    }
}