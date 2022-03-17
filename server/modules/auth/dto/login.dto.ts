import { MaxLength, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}
