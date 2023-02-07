import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 32, {
    message: "Password must be between 8 and 32 characters",
  })
  password: string;
}
