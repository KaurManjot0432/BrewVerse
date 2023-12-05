import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUser, validateSignin } from '../middlewares/validation.middleware';
import { UserService } from '../services/user.service';

export class UserRouter {
  readonly router: Router = Router();
  readonly userController: UserController;

  constructor(userService: UserService) {
    this.userController = new UserController(userService); 
  }

  public initializeRoutes(): Router {
    this.router
      .route('/')
      .post(validateUser, this.userController.create)
    this.router
      .route('/signin')
      .post(validateSignin, this.userController.signin);

    return this.router
  }
}