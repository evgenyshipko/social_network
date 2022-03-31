import { ConnectionOptions } from "typeorm";

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
  migrationsRun: true,
  migrationsTransactionMode: "each",
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};

// eslint-disable-next-line import/no-default-export
export default mysqlConnectionOptions;
