import { ValidatorOptions, validate } from "class-validator";
import { ErrorCode, HTTP_CODE, RequestType } from "../constant";
import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { ValidationError } from "class-validator/types/validation/ValidationError";
import { CustomError, ErrorBuilder } from "../service/response";
import jsonWebToken from "jsonwebtoken";
import { Logger } from "../configs/logger/logger";
import { UserService } from "./../api/user/user.service";

export function Valid(dtoClass: any, requestType: RequestType, options: ValidatorOptions = {}) {
  return async function (req: Request, res: Response, next: NextFunction) {
    let data;
    if (requestType === RequestType.query) data = req.query;
    else if (requestType === RequestType.body) data = req.body;
    else if (requestType === RequestType.params) data = req.params;
    else if (requestType === RequestType.headers) data = req.headers;

    data = plainToInstance(dtoClass, data);
    const err = await validate(data, { ...options });

    if (err.length > 0) {
      Logger.getLogger().error(JSON.stringify(err));

      return ErrorBuilder.send(res, {
        status: HTTP_CODE.BadRequest,
        code: ErrorCode.BAD_REQUEST,
      });
    }

    next();
  };
}

export function Auth(notRequired?: boolean) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"] || "";
    const headersToken = authorization.split(" ");

    try {
      if (headersToken[0] === "Bearer" && headersToken[1]) {
        const match = jsonWebToken.verify(headersToken[1], process.env.JWT_SECRET || "") as any;

        if (match) {
          const { userId, email } = match;

          if (notRequired) {
            res.locals.userId = userId;
            return next();
          }

          const user = await UserService.getOne({
            _id: userId,
            email,
          });

          if (user) {
            res.locals.userId = userId;
            return next();
          }
        }
      }

      throw new CustomError({
        code: ErrorCode.UNAUTHORIZED,
        status: HTTP_CODE.Unauthorized,
      });
    } catch (error) {
      return ErrorBuilder.send(res, {
        status: HTTP_CODE.Unauthorized,
        code: ErrorCode.UNAUTHORIZED,
      });
    }
  };
}
