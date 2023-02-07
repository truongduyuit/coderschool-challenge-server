import { NextFunction, Request, Response } from "express";
import { VoteAction } from "../../constant";
import { ResponseBuilder } from "../../service";
import { VoteService } from "./vote.service";

class VoteController {
  async createVote(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals;
    const { postId, vote } = req.body;

    try {
      const newVote = await VoteService.createOrUpdate(
        { userId, postId },
        {
          userId,
          postId,
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

  async checkVote(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals;
    const { postId } = req.body;

    try {
      const vote = await VoteService.getOne({
        userId,
        postId,
      });

      return ResponseBuilder.send(res, {
        data: vote?.vote || VoteAction.normal,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new VoteController();
