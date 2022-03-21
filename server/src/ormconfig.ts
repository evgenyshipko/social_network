import { ConnectionOptions } from "typeorm";

export const mysqlConnectionOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "social",
  password: "social",
  database: "social",
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrationsTransactionMode: "each",
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};

// eslint-disable-next-line import/no-default-export
export default mysqlConnectionOptions;
