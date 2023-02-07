import { IsNumberString, IsOptional, Min } from "class-validator";

export class GetTagDto {
  @IsOptional()
  @IsNumberString()
  limit: number;
}
