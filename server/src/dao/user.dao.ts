import User, { UserModel } from '../entities/User';
import { Types } from 'mongoose';

export class UserDAO {
    public async create(user: User): Promise<User> {
        const now = new Date();
        user.createdAt = user.updatedAt = now;
        const createdUser = await UserModel.create(user);
        return createdUser.toObject();
    }


    public async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email: email }).exec();
        return user;
    }

    public async findById(id: Types.ObjectId): Promise<User | null> {
        const user = await UserModel.findOne({ _id: id }).exec();
        return user;
    }
}