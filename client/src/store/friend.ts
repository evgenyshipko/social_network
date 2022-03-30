import { action, flow, flowResult, makeObservable, observable } from "mobx";
import { User } from "@src/types";
import { FriendData, FriendsService } from "@services/FriendsService";
import { UserService } from "@services/UserService";

export class FriendStore {
  isFetching = true;

  friends: FriendData[] = [];

  user: User;

  constructor() {
    makeObservable(this, {
      user: observable,
      isFetching: observable,
      friends: observable,
      fetchFriends: flow.bound,
      attach: flow.bound,
      detach: action,
    });
  }

  *fetchFriends(
    id: string
  ): Generator<Promise<FriendData[]>, void, FriendData[]> {
    try {
      this.isFetching = true;
      this.friends = yield FriendsService.getFriends(id);
    } finally {
      this.isFetching = false;
    }
  }

  *attach(id: string): Generator<Promise<User>, void, User> {
    try {
      this.isFetching = true;
      this.user = yield UserService.getUserById(id);
    } finally {
      this.isFetching = false;
    }
  }

  detach = () => {
    this.user = undefined;
    this.friends = [];
  };
}
