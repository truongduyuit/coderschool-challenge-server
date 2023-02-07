import { Request, Response, NextFunction } from "express";
import { ErrorCode, HTTP_CODE, RecordStatus } from "../../constant";
import { CustomError } from "../../service";
import { PostService } from "./../post/post.service";

class VoteMiddleware {
  async createVote(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.body;

    try {
      const post = await PostService.getOne({
        _id: postId,
        status: RecordStatus.active,
      });

      if (!post) {
        throw new CustomError({
          code: ErrorCode.POST_NOT_FOUND,
          status: HTTP_CODE.BadRequest,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new VoteMiddleware();
