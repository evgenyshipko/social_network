import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import mysqlConnectionOptions from "./ormconfig";

@Module({
  imports: [TypeOrmModule.forRoot(mysqlConnectionOptions)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
