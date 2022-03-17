import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entity/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { formatDate } from "../../utils/dates";
import {v4 as generateUid } from 'uuid'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getByEmail(email: string) {
    const users = await this.usersRepository.query(`SELECT * FROM user WHERE email = '${email}'`);
    if (users.length > 0) {
      return users[0];
    }
    throw new NotFoundException("User with this email does not exist");
  }

  async create(userData: RegisterDto) {

    const {firstName, lastName, email, password, sex, city} = userData

    const about = userData.about || null

    const birthDay = formatDate(new Date(userData.birthday))

    const id = generateUid()

    const query = `INSERT INTO user (id, first_name, last_name, password, birthday, sex, city, email, about) VALUES ('${id}', '${firstName}', '${lastName}', '${password}', '${birthDay}', '${sex}', '${city}', '${email}', '${about}')`

    await this.usersRepository.query(query);

    return this.getById(id)
  }

  async getById(id: string) {
    const user = await this.usersRepository.query(`SELECT * FROM user WHERE id = '${id}'`);
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

}
