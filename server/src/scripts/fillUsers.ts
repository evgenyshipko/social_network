import { createConnection } from "typeorm";
import mysqlConnectionOptions from "../ormconfig";
import { Sex, User } from "../entity/user.entity";
import { v4 as uuidv4 } from "uuid";
import {
  FEMALE_FIRSTNAMES,
  FEMALE_LASTNAMES,
  MALE_FIRSTNAMES,
  MALE_LASTNAMES,
} from "./names";

(async () => {
  const connection = await createConnection(mysqlConnectionOptions);

  const random = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  const generateUser = (): Partial<User> => {
    const sex = random([Sex.MALE, Sex.FEMALE]);

    let firstName: string;
    let lastName: string;

    if (sex === Sex.MALE) {
      firstName = random(MALE_FIRSTNAMES);
      lastName = random(MALE_LASTNAMES);
    } else {
      firstName = random(FEMALE_FIRSTNAMES);
      lastName = random(FEMALE_LASTNAMES);
    }

    return {
      firstName,
      lastName,
      sex,
      city: uuidv4(),
      email: uuidv4(),
      about: uuidv4(),
      birthday: new Date(),
      password: "12345",
    };
  };

  console.log("start");

  for (let j = 0; j < 1000; j++) {
    const usersArr = [];
    for (let i = 0; i < 1000; i++) {
      const user = generateUser();
      usersArr.push(user);
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(usersArr)
      .execute();

    const percent = j / 10;

    console.log(`${percent}% progress`);
  }

  await connection.close();

  console.log("end");
})();
