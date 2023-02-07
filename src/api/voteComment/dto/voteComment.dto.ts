import { IsEnum, IsMongoId } from "class-validator";
import { VoteAction } from "../../../constant";

export class VoteCommentDto {
  @IsMongoId()
  commentId: string;

  @IsEnum(VoteAction)
  vote: VoteAction;
}
