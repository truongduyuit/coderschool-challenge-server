import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @IsMongoId()
  postId: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsOptional()
  @IsMongoId()
  replyToCommentId: string[];
}
