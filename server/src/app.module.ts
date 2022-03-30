import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import mysqlConnectionOptions from "./ormconfig";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { validate } from "./env.validation";
import { FriendsModule } from "./modules/friends/friends.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConnectionOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    AuthModule,
    UserModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
