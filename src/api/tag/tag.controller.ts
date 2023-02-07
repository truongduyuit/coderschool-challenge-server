import { Request, Response, NextFunction } from "express";
import { DEFAULT_TAGS, REDIS_TAGS_KEYS } from "../../configs";
import { ResponseBuilder } from "../../service";
import { RedisService } from "../../service/redis";
import { TagService } from "./tag.service";

class TagController {
  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      // only create tag is not exist
      await TagService.createOrUpdate(
        {
          name,
        },
        { name },
      );

      // return ResponseBuilder.send(res);
    } catch (error) {
      next(error);
    }
  }

  async getTags(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit } = req.query;

      // check cache tags
      let tags = await RedisService.getInstance().srandmember(REDIS_TAGS_KEYS, Number(limit) || DEFAULT_TAGS);

      // unique => get all
      if (tags.length) {
        const tagsInDb = await TagService.getAll();
        tags = tagsInDb.map((t) => t.name);
      }

      return ResponseBuilder.send(res, {
        data: tags,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TagController();
