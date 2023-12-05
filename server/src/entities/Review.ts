import { model, Schema, Types } from 'mongoose';

export const REVIEW_DOCUMENT_NAME = 'Review';
export const REVIEW_COLLECTION_NAME = 'reviews';

export default interface Review {
  _id: Types.ObjectId;
  rating: number;
  description: string;
  user: Types.ObjectId | string; // Reference to the user
  brewery_id: string; // Reference to the brewery
  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema = new Schema<Review>(
  {
    rating: {
      type: Schema.Types.Number,
      min: 1,
      max: 5,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    brewery_id: {
      type: Schema.Types.String,
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
  },
);

// Indexes can be added as needed

export const ReviewModel = model<Review>(
  REVIEW_DOCUMENT_NAME,
  reviewSchema,
  REVIEW_COLLECTION_NAME
);
