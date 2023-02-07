import { Router } from "express";
import { RequestType } from "../../constant";
import { Auth, Valid } from "../../middleware/validate";
import { VoteCommentDto } from "./dto/voteComment.dto";
import voteCommentMiddleware from "./voteComment.middleware";

const router = Router();

router.post("/", Auth, Valid(VoteCommentDto, RequestType.body), voteCommentMiddleware.createVoteComment);

export default router;
