import { Sex } from "../../../entity/user.entity";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsDate()
  birthday: Date;

  @IsEnum(Object.values(Sex))
  sex: Sex;

  @IsString()
  city: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  about: string
}
