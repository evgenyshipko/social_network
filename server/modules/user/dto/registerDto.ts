import { Sex } from "../../../entity/user.entity";
import { IsEnum, IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsString()
  salt: string;

  @IsString()
  birthday: Date;

  @IsEnum(Object.values(Sex))
  sex: Sex;

  @IsString()
  city: string;

  @IsString()
  email: string;
}
