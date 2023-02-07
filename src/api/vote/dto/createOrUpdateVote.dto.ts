import { IsArray, ValidateNested } from "class-validator";
import { VoteDto } from "./vote.dto";

export class CreateOrUpdateVoteDto {
  @IsArray()
  @ValidateNested({ each: true })
  votes: VoteDto[];
}
