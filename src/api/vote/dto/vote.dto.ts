import { IsEnum, IsMongoId } from "class-validator";
import { VoteAction } from "../../../constant";

export class VoteDto {
  @IsMongoId()
  postId: string;

  @IsEnum(VoteAction)
  vote: VoteAction;
}
