import { Request, Response, NextFunction } from "express";
import { ErrorCode, HTTP_CODE, RecordStatus } from "../../constant";
import { CustomError } from "../../service";
import { CommentService } from "../comment/comment.service";

class VoteCommentMiddleware {
  async createVoteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.body;

    try {
      const comment = await CommentService.getOne({
        _id: commentId,
        status: RecordStatus.active,
      });

      if (!comment) {
        throw new CustomError({
          code: ErrorCode.COMMENT_NOT_FOUND,
          status: HTTP_CODE.BadRequest,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new VoteCommentMiddleware();
