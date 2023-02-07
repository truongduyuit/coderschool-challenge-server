import { Router } from "express";
import { RequestType } from "../../constant";
import { Valid } from "../../middleware/validate";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refreshtoken.dto";
import userController from "./user.controller";
import userMiddleware from "./user.middleware";

const router = Router();

router.post("/signup", Valid(CreateUserDto, RequestType.body), userMiddleware.createUser, userController.createUser);

router.post("/signin", Valid(LoginDto, RequestType.body), userMiddleware.login, userController.login);

router.post(
  "/refresh",
  Valid(RefreshTokenDto, RequestType.body),
  userMiddleware.refreshToken,
  userController.refreshToken,
);

export default router;
