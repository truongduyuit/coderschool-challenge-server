import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ErrorCode, HTTP_CODE } from "../../constant";
import { CustomError } from "../../service";
import { JWTUtils, PasswordUtils } from "../../utils";
import { UserService } from "./user.service";

class UserMiddleware {
  async createUser(req: Request, _: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      // check each email is generated only once
      const userByEmail = await UserService.getOne({ email });

      if (userByEmail) {
        throw new CustomError({
          code: ErrorCode.EMAIL_ALREADY_EXISTS,
          status: HTTP_CODE.BadRequest,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // find user by email
      const userByEmail = await UserService.getOne({ email });
      if (!userByEmail) {
        throw new CustomError({
          code: ErrorCode.INCORRECT_EMAIL_OR_PASSWORD,
          status: HTTP_CODE.BadRequest,
        });
      }

      // validate password with saved hash
      const passwordIsCorrect = PasswordUtils.verify(password, userByEmail.password);
      if (!passwordIsCorrect) {
        throw new CustomError({
          code: ErrorCode.INCORRECT_EMAIL_OR_PASSWORD,
          status: HTTP_CODE.BadRequest,
        });
      }

      // pass user information to controller to generate JWT token
      res.locals.user = userByEmail;
      next();
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      const decodedToken = JWTUtils.verifyToken(refreshToken);

      if (decodedToken) {
        const { userId } = decodedToken as JwtPayload;

        // need to check user status again in more complicated case
        const user = await UserService.getById(userId);

        if (!user) {
          throw new CustomError({
            code: ErrorCode.USER_NOT_FOUND,
            status: HTTP_CODE.BadRequest,
          });
        }

        res.locals.user = user;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserMiddleware();
