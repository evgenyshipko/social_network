import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import JwtAuthenticationGuard from "../auth/guards/jwt-auth.guard";
import { FriendsService } from "./friends.service";

@UseGuards(JwtAuthenticationGuard)
@Controller("api/friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get(":userId")
  async getFriendsById(
    @Req() request,
    @Param("userId", new ParseUUIDPipe()) userId: string
  ) {
    return this.friendsService.getUserFriends(userId);
  }

  @Get()
  async getFriends(@Req() request) {
    const userId = request.user?.id;

    return this.friendsService.getUserFriends(userId);
  }

  @Post(":friendId")
  async createFriendship(
    @Req() request,
    @Param("friendId", new ParseUUIDPipe()) friendId: string
  ) {
    const userId = request.user?.id;

    return this.friendsService.createFriendship(userId, friendId);
  }

  @Delete(":friendId")
  async deleteFriendship(
    @Req() request,
    @Param("friendId", new ParseUUIDPipe()) friendId: string
  ) {
    const userId = request.user?.id;

    return this.friendsService.deleteFriendship(userId, friendId);
  }
}
