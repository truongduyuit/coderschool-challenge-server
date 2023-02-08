import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { REDIS_TAGS_KEYS } from "../../configs";
import { RecordStatus, SortType, VoteAction } from "../../constant";
import { ResponseBuilder } from "../../service";
import { RedisService } from "../../service/redis";
import { mapArrayToObjectWithKey } from "../../utils";
import { CommentService } from "../comment/comment.service";
import { TagService } from "../tag/tag.service";
import { IVote } from "../vote/vote.model";
import { VoteService } from "../vote/vote.service";
import { PostService } from "./post.service";

class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals;
    const { title, content, selectedTags: tags } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const post = await PostService.create(
        {
          title,
          content,
          tags,
          userId,
        },
        { session },
      );

      // because tags in PostModel is string[] not ref to TagModel
      // & tag model only use to suggest,
      // so in this case we don't need use transaction & saved to db sync
      // we can use job or message queue to handle
      // but this is a simple example
      await Promise.allSettled([
        RedisService.getInstance().sadd(REDIS_TAGS_KEYS, tags),
        tags.map((tag: string) => {
          // create or update avoid create already exist unique tag name
          TagService.createOrUpdate({ name: tag }, { name: tag }, { session });
        }),
      ]);

      await session.commitTransaction();
      return ResponseBuilder.send(res, {
        data: post,
      });
    } catch (error) {
      await session.abortTransaction;
      next(error);
    } finally {
      session.endSession();
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const post = await PostService.getOneAndPopulate({
        query: {
          _id: id,
          status: RecordStatus.active,
        },
        populate: {
          path: "userInfo",
          select: "email",
        },
      });

      return ResponseBuilder.send(res, {
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals;
      const { id } = req.params;

      const post = await PostService.updateOne(
        {
          _id: id,
          userId,
        },
        {
          status: RecordStatus.deleted,
        },
      );

      return ResponseBuilder.send(res, {
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals;
      const { page, limit, tags: tagsInput, sortType = SortType.latest } = req.query;

      const posts = await PostService.populate({
        query: {
          status: RecordStatus.active,
          ...(tagsInput && {
            tags: {
              $elemMatch: {
                $in: typeof tagsInput === "string" ? [tagsInput] : tagsInput,
              },
            },
          }),
        },
        populate: {
          path: "userInfo",
          select: "email",
        },
        sort: {
          createdAt: sortType === SortType.latest ? -1 : 1,
        },
        ...(page && { page: +page }),
        ...(limit && { limit: +limit }),
      });

      const postIds = posts.records.map((p) => p._id);

      const promises: any[] = [
        VoteService.aggregate([
          {
            $match: {
              postId: { $in: postIds },
              vote: { $in: [VoteAction.upvote, VoteAction.downvote] },
            },
          },
          {
            $group: {
              _id: "$postId",
              upvotes: {
                $sum: {
                  $cond: [{ $eq: ["$vote", VoteAction.upvote] }, 1, 0],
                },
              },
              downvotes: {
                $sum: {
                  $cond: [{ $eq: ["$vote", VoteAction.downvote] }, 1, 0],
                },
              },
            },
          },
        ]),
        CommentService.aggregate([
          {
            $match: {
              postId: { $in: postIds },
            },
          },
          {
            $group: {
              _id: "$postId",
              comments: { $sum: 1 },
            },
          },
        ]),
      ];

      // The logged in user will check if the user has voted this comment
      if (userId) {
        promises.push(
          VoteService.getByQuery({
            query: {
              userId,
              postId: {
                $in: postIds,
              },
            },
            page: 0,
            limit: postIds.length,
          }),
        );
      }

      const [voteInfos, commentCount, votePostOfUser] = await Promise.all(promises);
      const objVoteInfo = mapArrayToObjectWithKey(voteInfos, "_id");
      const objCommentCount = mapArrayToObjectWithKey(commentCount, "_id");
      const objVotePostOfUser = votePostOfUser ? mapArrayToObjectWithKey(votePostOfUser.records, "postId") : {};

      posts.records = posts.records.map((post) => {
        return {
          ...post,
          ...objVoteInfo[post._id],
          ...objCommentCount[post._id],
          ...objVotePostOfUser[post._id],
        };
      });

      return ResponseBuilder.send(res, {
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
