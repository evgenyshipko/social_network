import { ServiceBase } from "@src/services/BaseService";
import { LoginData, RegistrationData, User } from "@src/types";

export class AuthService extends ServiceBase {
  protected static BASE_URL = "/api/auth";

  static async checkAuth(): Promise<User> {
    const { data } = await this.get<User>("");
    return data;
  }

  static async login(params: LoginData): Promise<User> {
    const { data } = await this.post<User>("/login", params);
    return data;
  }

  static async register(params: RegistrationData): Promise<User> {
    const { data } = await this.post<User>("/register", params);
    return data;
  }

  static async logout(): Promise<void> {
    const { data } = await this.post<void>("/logout");
    return data;
  }
}
