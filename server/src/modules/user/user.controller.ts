import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import JwtAuthenticationGuard from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";

export type UserQueryParams = {
  firstName?: string;
  lastName?: string;
  offset?: number;
  limit?: number;
};

// закомментил для проведения .wrk тестов по ручке GET api/user
// @UseGuards(JwtAuthenticationGuard)
@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Req() request, @Query() params: UserQueryParams) {
    const userId = request.user?.id;

    return this.userService.getUserList(userId, params);
  }

  @Get(":userId")
  async createFriendship(
    @Req() request,
    @Param("userId", new ParseUUIDPipe()) userId: string
  ) {
    return this.userService.getById(userId);
  }
}
