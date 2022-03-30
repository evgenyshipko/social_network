import { ServiceBase } from "@src/services/BaseService";

export type FriendData = { id: string; firstName: string; lastName: string };

export class FriendsService extends ServiceBase {
  protected static BASE_URL = "/api/friends";

  static async getFriends(userId?: string): Promise<FriendData[]> {
    const { data } = await this.get<FriendData[]>(userId ? `/${userId}` : "");
    return data;
  }

  static async createFriendship(userId: string): Promise<void> {
    await this.post<void>(`/${userId}`);
  }

  static async deleteFriendship(userId: string): Promise<void> {
    await this.delete<void>(`/${userId}`);
  }
}
