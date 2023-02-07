import { Request, Response, NextFunction } from "express";
import { MAX_COMMENT_LEVEL } from "../../configs";
import { ErrorCode, HTTP_CODE, RecordStatus } from "../../constant";
import { CustomError } from "../../service";
import { PostService } from "../post/post.service";
import { CommentService } from "./comment.service";

class CommentMiddleware {
  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId, replyToCommentId } = req.body;

      const [post, replyComment] = await Promise.all([
        PostService.getOne({
          _id: postId,
          status: RecordStatus.active,
        }),
        replyToCommentId &&
          CommentService.getOne({
            _id: replyToCommentId,
            postId,
          }),
      ]);

      if (!post) {
        throw new CustomError({
          code: ErrorCode.POST_NOT_FOUND,
          status: HTTP_CODE.BadRequest,
        });
      }

      if (replyToCommentId && !replyComment) {
        throw new CustomError({
          code: ErrorCode.REPLY_COMMENT_NOT_FOUND,
          status: HTTP_CODE.BadRequest,
        });
      }

      res.locals.level = replyComment
        ? replyComment.level > MAX_COMMENT_LEVEL
          ? replyComment.level
          : replyComment.level + 1
        : 0;
      res.locals.postId = post._id;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentMiddleware();
