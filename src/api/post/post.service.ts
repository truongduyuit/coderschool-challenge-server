import { MongooseBaseService } from "../../utils";
import { IPost, PostModel } from "./post.model";

export const PostService = new MongooseBaseService<IPost>(PostModel);
