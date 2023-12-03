import { UserService } from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Logger from '../core/Logger';

export class UserControler {
    constructor(private readonly userService: UserService) { }

    private handleValidationErrors(req: Request, res: Response): boolean {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Logger.info('Validation error');
            Logger.error(errors.array());
            res.status(400).json({ success: false, error: 'Invalid Email or Password' });
            return true;
        }
        return false;
    }

    private handleUserNotFound(savedUser: any, res: Response): boolean {
        if (!savedUser) {
            Logger.info("User doesn't exist");
            res.status(400).json({ success: false, error: 'Enter valid credentials!' });
            return true;
        }
        return false;
    }

    private handlePasswordMismatch(res: Response): void {
        Logger.info('Wrong password');
        res.status(400).json({ success: false, error: 'Enter valid credentials!' });
    }

    private generateAuthToken(user: any): string {
        return jwt.sign(user, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1800s' });
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
        try {
            if (this.handleValidationErrors(req, res)) return;

            const user = await this.userService.createUser(req.body);
            const authToken = this.generateAuthToken(user);

            res.status(201).send({ success: true, authToken, user });
        } catch (err) {
            Logger.error(err);
            if (err.name === 'MongoServerError' && err.code === 11000 && err.keyPattern && err.keyPattern.email) {
                res.status(400).json({ success: false, error: 'Email already exists.' });
            } else {
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
        }
    };

    public signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (this.handleValidationErrors(req, res)) return;

            const savedUser = await this.userService.findUserByEmail(req.body.email);

            if (this.handleUserNotFound(savedUser, res)) return;

            const checkPassword = await bcrypt.compare(req.body.password, savedUser.password);

            if (!checkPassword) {
                this.handlePasswordMismatch(res);
                return;
            }

            const authToken = this.generateAuthToken(savedUser);
            res.status(201).send({ success: true, authToken, savedUser });
        } catch (err) {
            Logger.error(err);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };
}
