import { Router } from "express";
import { RequestType } from "../../constant";
import { Auth, Valid } from "../../middleware/validate";
import { VoteCommentDto } from "./dto/voteComment.dto";
import voteCommentController from "./voteComment.controller";
import voteCommentMiddleware from "./voteComment.middleware";

const router = Router();

router.post(
  "/",
  Auth(),
  Valid(VoteCommentDto, RequestType.body),
  voteCommentMiddleware.createVoteComment,
  voteCommentController.createVoteComment,
);

export default router;
