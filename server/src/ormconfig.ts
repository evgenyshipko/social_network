import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const mysqlConnectionOptions: ConnectionOptions = {
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT) || 3306,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrationsRun: false,
  migrationsTransactionMode: "each",
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  logging: true,
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};

// eslint-disable-next-line import/no-default-export
export default mysqlConnectionOptions;
