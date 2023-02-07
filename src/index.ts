import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./api/routes";
import { Logger } from "./configs/logger/logger";
import { injectRequestId, useMorgan } from "./middleware";
import { CustomError, ErrorBuilder, Mongoose } from "./service";
import { RedisService } from "./service/redis";

dotenv.config();

const app: Express = express();
const host = process.env.HOST;
const port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(injectRequestId);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(useMorgan(morgan));

// init service when start server
Mongoose.init();
RedisService.getInstance();

app.use("/api", router);

app.use((err: CustomError, _: Request, res: Response, __: NextFunction) => {
  Logger.getLogger().error(err);
  return ErrorBuilder.send(res, err.error);
});

app.listen(port, () => {
  console.log(`[⚡️]: Server is running at ${host}:${port}`);
});
