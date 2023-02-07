import { Router } from "express";
import { RequestType } from "../../constant";
import { Auth, Valid } from "../../middleware/validate";
import { CheckVoteDto } from "../post/dto/checkVote.dto";
import { VoteDto } from "./dto/vote.dto";
import voteController from "./vote.controller";
import voteMiddleware from "./vote.middleware";

const router = Router();

router.post("/", Auth, Valid(VoteDto, RequestType.body), voteMiddleware.createVote, voteController.createVote);

router.post("/check", Auth, Valid(CheckVoteDto, RequestType.body), voteController.checkVote);

export default router;
