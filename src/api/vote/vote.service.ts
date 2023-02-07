import { MongooseBaseService } from "../../utils";
import { IVote, VoteModel } from "./vote.model";

export const VoteService = new MongooseBaseService<IVote>(VoteModel);
