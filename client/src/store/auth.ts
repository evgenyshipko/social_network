import { makeObservable, observable, flow, computed, action } from "mobx";
import { AuthService } from "@src/services/AuthService";
import { LoginData, RegistrationData, User } from "@src/types";

export class AuthStore {
  error: string = null;

  isFetching = true;

  user: User = null;

  registrationData: RegistrationData = {
    email: undefined,
    sex: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    birthday: undefined,
    about: undefined,
    city: undefined,
  };

  constructor() {
    makeObservable(this, {
      error: observable,
      isFetching: observable,
      user: observable,
      fetchAuth: flow.bound,
      logIn: flow.bound,
      logOut: flow.bound,
      register: flow.bound,
      setRegistrationData: action.bound,
      registrationData: observable,
    });
  }

  setRegistrationData<Key extends keyof RegistrationData>(
    key: Key,
    value: RegistrationData[Key]
  ) {
    this.registrationData[key] = value === "" ? undefined : value;
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

  *register(): Generator<Promise<User>, void, User> {
    try {
      this.isFetching = true;
      this.user = yield AuthService.register(this.registrationData);
    } catch (error) {
      this.error = error.response?.data;
    } finally {
      this.isFetching = false;
    }
  }
}
