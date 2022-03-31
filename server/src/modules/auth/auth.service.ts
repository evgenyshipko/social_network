import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

enum MySqlErrorCode {
  UniqueViolation = "ER_DUP_ENTRY",
}

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const user = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });

      user.password = undefined;

      return user;
    } catch (error) {
      if (error?.code === MySqlErrorCode.UniqueViolation) {
        throw new BadRequestException("User with that email already exists");
      }
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.userService.getByEmail(email);

    await this.verifyPassword(plainTextPassword, user.password);

    user.password = undefined;

    return user;
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

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRATION_TIME"
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
