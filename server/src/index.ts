import express, { type Application, type Request, type Response } from 'express';
import * as dotenv from 'dotenv';
import { mongoose } from './database/dataSource';
import { UserRouter } from './routes/user.routes';
let cors = require("cors");

dotenv.config();

class App {
  public app: Application
  public port: string | number

  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? 5000

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({
      origin : '*'
    }));

    this.initializeDb()
    this.initializeRoutes()
    this.initializeMiddlewares()
  }

  private initializeRoutes(): void {
    this.app.use('/user', new UserRouter().initializeRoutes());
  }

  private initializeDb(): void {
    mongoose.run();
  }

  private initializeMiddlewares(): void {
    this.app.use((err: Error, req: Request, res: Response, next: any) => {
      console.error(err)

      res.status(500).send({
        reason: err.message ?? 'Internal Server Error'
      })
    })
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started at port : ${this.port}`)
    })
  }
}

const app = new App()
app.listen()