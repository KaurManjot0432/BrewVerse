import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Logger from './core/Logger';
import { mongoose } from './database/dataSource';
import { UserRouter } from './routes/user.routes';
import { UserService } from './services/user.service';
let cors = require("cors");

class App {
  public app: Application;
  public port: string | number;

  constructor(userService: UserService) {
    this.app = express();
    this.port = process.env.PORT ?? 5000;

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({
      origin: '*'
    }));

    this.initializeDb();
    this.initializeRoutes(userService);
    this.initializeMiddlewares();
  }

  private initializeRoutes(userService: UserService): void {
    this.app.use('/user', new UserRouter(userService).initializeRoutes());
  }

  private initializeDb(): void {
    mongoose.run();
  }

  private initializeMiddlewares(): void {
    this.app.use((err: Error, req: Request, res: Response, next: any) => {
      Logger.error(err);

      res.status(500).send({
        reason: err.message ?? 'Internal Server Error'
      });
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started at port : ${this.port}`);
    });
  }
}

const userService = new UserService(); // Instantiate UserService
const app = new App(userService);
app.listen();
