import { MongooseBaseService } from "../../utils";
import { CommentModel, IComment } from "./comment.model";

export const CommentService = new MongooseBaseService<IComment>(CommentModel);
