import { IsEnum, IsNumberString, IsOptional, ValidateIf } from "class-validator";
import { SortType } from "../../../constant";

export class GetPostsDto {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  limit: number;

  @IsOptional()
  @ValidateIf((o) => typeof o.tags === "string" || Array.isArray(o.tags))
  tags: string | string[];

  @IsOptional()
  @IsEnum(SortType)
  sortType: SortType;
}
