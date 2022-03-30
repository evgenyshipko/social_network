import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from "@nestjs/common";
import JwtAuthenticationGuard from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";

@UseGuards(JwtAuthenticationGuard)
@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Req() request) {
    const userId = request.user?.id;

    return this.userService.getUserList(userId);
  }

  @Get(":userId")
  async createFriendship(
    @Req() request,
    @Param("userId", new ParseUUIDPipe()) userId: string
  ) {
    return this.userService.getById(userId);
  }
}
