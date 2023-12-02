import { UserService } from '../services/user.service';
import { type NextFunction, type Request, type Response } from 'express';
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
import Logger from '../core/Logger';

export class UserControler {

    readonly userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
        try {
            // Validate Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                Logger.info('create user error');
                Logger.error(errors.array());
                return res.status(400).json({
                    success: false,
                    error: "Invalid Email"
                });
            }

            const user = await this.userService.createUser(req.body);
            console.log(user);
            const authToken = jwt.sign(user, 'manjot', { expiresIn: '1800s' });
            res.status(201).send({ success: true, authToken, user });
        } catch (err) {
            Logger.error(err);
            // Check if the error is a QueryFailedError related to a duplicate email
            if (err.name === 'QueryFailedError' && err.message.includes("Duplicate entry")) {
                res.status(400).json({ success: false, error: 'Email already exists.' });
            } else {
                res.status(500).json({ success: false, error: "Internal Server Error" });
            }
        }
    };

    public signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Validate Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                Logger.info('login user error');
                Logger.error(errors.array());
                res.status(400).json({
                    success: false,
                    error: "Invalid Email"
                });
                return;
            }

            // Find user by email
            const savedUser = await this.userService.findUserByEmail(req.body.email);

            if (savedUser == null) {
                res.status(400).json({
                    success: false,
                    error: "Enter valid credentials!"
                });
                return;
            }

            // Compare password
            const checkPassword = await bcrypt.compare(req.body.password, savedUser.password);

            if (!checkPassword) {
                res.status(400).json({
                    success: false,
                    error: "Enter valid credentials!"
                });
                return;
            }

            // Return jwt as response

            const authToken = jwt.sign(savedUser, process.env.JWT_SECRET, { expiresIn: '1800s' });
            res.status(201).send({ success: true, authToken, savedUser });
        } catch (err) {
            Logger.error(err);
            res.status(500).json({ success: false, error: "Internnal Server Error" });
        }
    };


}