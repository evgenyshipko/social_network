import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import bcrypt from "bcrypt";
import { RegisterDto } from "../user/dto/registerDto";

enum MySqlErrorCode {
  UniqueViolation = "1169",
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === MySqlErrorCode.UniqueViolation) {
        throw new BadRequestException("User with that email already exists");
      }
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException("Wrong credentials provided");
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new BadRequestException("Wrong credentials provided");
    }
  }
}
