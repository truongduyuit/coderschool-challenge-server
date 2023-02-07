import { Request, Response, NextFunction } from "express";
import { ResponseBuilder } from "../../service";
import { JWTUtils, PasswordUtils } from "../../utils";
import { UserService } from "./user.service";
import { IUser } from "./user.model";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // use hash password instead of password to avoid SQL injection when login
      const passwordHash = PasswordUtils.hash(password);

      const user = await UserService.create({
        email,
        password: passwordHash,
      });

      // shouldn't response password
      const { password: p, ...data } = user;

      return ResponseBuilder.send(res, {
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(_: Request, res: Response, next: NextFunction) {
    try {
      // get user information from middleware
      const { _id, email } = res.locals.user as IUser;

      // set user id to payload JWT token
      const accessToken = JWTUtils.generateAccessToken({
        userId: _id,
        email,
      });

      const refreshToken = JWTUtils.generateRefreshToken({
        userId: _id,
        email,
      });

      return ResponseBuilder.send(res, {
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(_: Request, res: Response, next: NextFunction) {
    try {
      // get user information from middleware
      const { _id } = res.locals.user as IUser;

      // set user id to payload JWT token
      const accessToken = JWTUtils.generateAccessToken({
        userId: _id,
      });

      // if the refresh token expires, I want the user to log in again
      // so don't generate new refresh token

      return ResponseBuilder.send(res, {
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
