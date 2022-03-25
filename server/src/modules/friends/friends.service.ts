import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entity/user.entity";
import { Repository } from "typeorm";
import { camelizeKeys } from "../../utils/camel";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getUserFriends(userId: string) {
    const result = (await this.usersRepository.query(
      `SELECT * FROM friend_link WHERE user_id_1 = '${userId}' OR user_id_2 = '${userId}'`
    )) as Array<Record<string, any>>;
    return result.map(camelizeKeys);
  }

  async createFriendship(userId1: string, userId2: string) {
    await this.usersRepository.query(
      `INSERT INTO friend_link (user_id_1, user_id_2) VALUES ('${userId1}','${userId2}')`
    );
  }

  async deleteFriendship(userId: string, friendId: string) {
    await this.usersRepository.query(
      `INSERT INTO friend_link (user_id_1, user_id_2) VALUES ('${userId}','${friendId}')`
    );
  }
}
