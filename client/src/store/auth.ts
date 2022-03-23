import { makeObservable, observable, flow, computed, action } from "mobx";
import { AuthService } from "@src/services/AuthService";
import { LoginData, User } from "@src/types";

export class AuthStore {
  error: string = null;

  isFetching = true;

  user: User = null;

  constructor() {
    makeObservable(this, {
      error: observable,
      isFetching: observable,
      user: observable,
      fetchAuth: flow.bound,
      logIn: flow.bound,
      logOut: flow.bound,
    });
  }

  *fetchAuth(): Generator<Promise<User>, void, User> {
    try {
      this.isFetching = true;
      this.user = yield AuthService.checkAuth();
    } catch (error) {
      this.error = error.response?.data;
    } finally {
      this.isFetching = false;
    }
  }

  *logOut(): Generator<Promise<void>, void, void> {
    try {
      this.isFetching = true;
      this.user = null;
      yield AuthService.logout();
    } catch (error) {
      this.error = error.response?.data;
    } finally {
      this.isFetching = false;
    }
  }

  *logIn(params: LoginData): Generator<Promise<User>, void, User> {
    try {
      this.isFetching = true;
      this.user = yield AuthService.login(params);
    } catch (error) {
      this.error = error.response?.data;
    } finally {
      this.isFetching = false;
    }
  }
}
