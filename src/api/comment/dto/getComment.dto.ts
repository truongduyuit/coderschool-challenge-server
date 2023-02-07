import { IsMongoId, IsNumberString, IsOptional } from "class-validator";

export class GetCommentDto {
  @IsMongoId()
  postId: string;

  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  limit: string;

  @IsOptional()
  @IsMongoId()
  commentId: string;
}
