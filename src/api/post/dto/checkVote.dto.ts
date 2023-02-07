import { IsMongoId } from "class-validator";

export class CheckVoteDto {
  @IsMongoId()
  postId: string;
}
