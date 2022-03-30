import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entity/user.entity";
import { Repository } from "typeorm";
import { camelizeKeys } from "../../utils/camel";

type FriendData = { id: string; firstName: string; lastName: string };

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getUserFriends(userId: string): Promise<Array<FriendData>> {
    const result = await this.usersRepository.query(
      `SELECT u.id, u.first_name, u.last_name 
               FROM user u 
               INNER JOIN friend_link fl ON u.id = fl.user_id_2 
               WHERE fl.user_id_1 = '${userId}'
             UNION ALL
             SELECT u.id, u.first_name, u.last_name 
               FROM user u 
               INNER JOIN friend_link fl ON u.id = fl.user_id_1 
               WHERE fl.user_id_2 = '${userId}'
             `
    );
    return result.map(camelizeKeys) as Array<FriendData>;
  }

  async createFriendship(userId1: string, userId2: string) {
    await this.usersRepository.query(
      `INSERT INTO friend_link (user_id_1, user_id_2) VALUES ('${userId1}','${userId2}')`
    );
  }

  async deleteFriendship(userId1: string, userId2: string) {
    await this.usersRepository.query(
      `DELETE FROM friend_link WHERE user_id_1 = '${userId1}' AND user_id_2 = '${userId2}'`
    );
    await this.usersRepository.query(
      `DELETE FROM friend_link WHERE user_id_2 = '${userId1}' AND user_id_1 = '${userId2}'`
    );
  }
}
