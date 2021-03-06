import { Module } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { FriendsController } from "./friends.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
