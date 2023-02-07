import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { REDIS_TAGS_KEYS } from "../../configs";
import { RecordStatus, SortType } from "../../constant";
import { ResponseBuilder } from "../../service";
import { RedisService } from "../../service/redis";
import { TagService } from "../tag/tag.service";
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
      const { page, limit, tags: tagsInput, sortType = SortType.latest } = req.query;

      const posts = await PostService.populate({
        query: {
          status: RecordStatus.active,
          ...(tagsInput && {
            tags: {
              $elemMatch: {
                $in: tagsInput,
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

      return ResponseBuilder.send(res, {
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
