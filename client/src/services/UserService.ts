import { ServiceBase } from "@src/services/BaseService";
import { User } from "@src/types";

export class UserService extends ServiceBase {
  protected static BASE_URL = "/api/user";

  static async getUsers(
    firstName?: string,
    lastName?: string
  ): Promise<User[]> {
    const { data } = await this.get<User[]>(
      "",
      {},
      { params: { firstName, lastName } }
    );
    return data;
  }

  static async getUserById(userId: string): Promise<User> {
    const { data } = await this.get<User>(`/${userId}`);
    return data;
  }
}
