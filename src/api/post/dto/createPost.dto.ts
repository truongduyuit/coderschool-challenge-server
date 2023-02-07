import { IsArray, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  selectedTags: string[];
}
