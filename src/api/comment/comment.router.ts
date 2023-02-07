import { Router } from "express";
import { RequestType } from "../../constant";
import { Auth, Valid } from "../../middleware/validate";
import commentController from "./comment.controller";
import commentMiddleware from "./comment.middleware";
import { CreateCommentDto } from "./dto/createComment.dto";
import { GetCommentDto } from "./dto/getComment.dto";

const router = Router();

router.post(
  "/",
  Auth(),
  Valid(CreateCommentDto, RequestType.body),
  commentMiddleware.createComment,
  commentController.createComment,
);

router.get("/", Auth(true), Valid(GetCommentDto, RequestType.query), commentController.getComments);

export default router;
