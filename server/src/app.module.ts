import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import mysqlConnectionOptions from "./ormconfig";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { validate } from "./env.validation";

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(mysqlConnectionOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
