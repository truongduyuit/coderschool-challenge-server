import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from "../../service";
import { VoteCommentService } from "./voteComment.service";

class VoteCommentController {
  async createVoteComment(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals;
    const { commentId, vote } = req.body;

    try {
      const newVote = await VoteCommentService.createOrUpdate(
        { userId, commentId },
        {
          userId,
          commentId,
          vote,
        },
      );

      return ResponseBuilder.send(res, {
        data: newVote,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new VoteCommentController();
