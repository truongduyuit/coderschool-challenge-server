import { IsArray, IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
import { SortType } from "../../../constant";

export class GetPostsDto {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  limit: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsEnum(SortType)
  sortType: SortType;
}
