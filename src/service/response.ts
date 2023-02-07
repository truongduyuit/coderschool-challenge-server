import { Response } from "express";
import { Logger } from "../configs/logger/logger";
import { HTTP_CODE, LOG_ENVIRONMENTS } from "../constant";
import { IData, IError } from "../interface";

const logResEnv = process.env.LOG_RESPONSE_ENV || LOG_ENVIRONMENTS.console;
const logErrorEnv = process.env.LOG_ERROR_ENV || LOG_ENVIRONMENTS.file;

export class CustomError extends Error {
  error: IError;

  constructor(error: IError) {
    super();

    this.error = error;
  }
}

export class ResponseBuilder {
  static send(res: Response, data: IData) {
    // Logger.getLogger(logResEnv as LOG_ENVIRONMENTS).info(data);
    return res.status(data.status || HTTP_CODE.Ok).json(data);
  }
}

export class ErrorBuilder {
  static send(res: Response, error: IError) {
    Logger.getLogger(logErrorEnv as LOG_ENVIRONMENTS).error(error);
    return res.status(error?.status || HTTP_CODE.InternalServerError).json(error);
  }
}
