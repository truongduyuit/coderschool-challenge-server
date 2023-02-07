import { MongooseBaseService } from "../../utils";
import { IVoteComment, VoteCommentModel } from "./voteComment.model";

export const VoteCommentService = new MongooseBaseService<IVoteComment>(VoteCommentModel);
