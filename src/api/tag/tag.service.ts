import { MongooseBaseService } from "../../utils";
import { ITag, TagModel } from "./tag.model";

export const TagService = new MongooseBaseService<ITag>(TagModel);
