import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ResponseBuilder } from "../../service";
import { CommentService } from "./comment.service";

class CommentController {
  async createComment(req: Request, res: Response, next: NextFunction) {
    const { userId, level, postId } = res.locals;
    const { replyToCommentId, comment } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const newComment = await CommentService.create(
        {
          postId,
          replyToCommentId,
          comment,
          userId,
          level,
        },
        { session },
      );

      await CommentService.updateById(
        replyToCommentId,
        {
          $push: {
            childCommentIds: newComment._id,
          },
        },
        { session },
      );
      await session.commitTransaction();

      const newCommentPopulate = await CommentService.getOneAndPopulate({
        query: {
          _id: newComment.id,
        },
        populate: [
          {
            path: "userInfo",
            select: "email",
          },
        ],
      });

      return ResponseBuilder.send(res, {
        data: newCommentPopulate,
      });
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  }

  async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 0, limit = 5, commentId, postId } = req.query;
      console.log({
        postId,
        ...(commentId ? { _id: commentId, level: 1 } : { level: 0 }),
      });
      const comments = await CommentService.populate({
        query: {
          postId,
          ...(commentId ? { replyToCommentId: commentId, level: 1 } : { level: 0 }),
        },
        populate: [
          {
            path: "userInfo",
            select: "email",
          },
        ],
        page: +page,
        limit: +limit,
        sort: {
          createdAt: -1,
        },
      });

      return ResponseBuilder.send(res, {
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();
