import { flow, flowResult, makeObservable, observable } from "mobx";
import { User } from "@src/types";
import { FriendData, FriendsService } from "@services/FriendsService";
import { UserService } from "@services/UserService";

export class ProfileStore {
  isFetching = true;

  friends: FriendData[] = [];

  users: User[] = [];

  constructor() {
    makeObservable(this, {
      isFetching: observable,
      friends: observable,
      fetchFriends: flow.bound,
      fetchUsers: flow.bound,
      deleteFriendship: flow.bound,
      createFriendship: flow.bound,
    });
  }

  *fetchFriends(): Generator<Promise<FriendData[]>, void, FriendData[]> {
    try {
      this.isFetching = true;
      this.friends = yield FriendsService.getFriends();
    } finally {
      this.isFetching = false;
    }
  }

  *fetchUsers(): Generator<Promise<User[]>, void, User[]> {
    try {
      this.isFetching = true;
      this.users = yield UserService.getUsers();
    } finally {
      this.isFetching = false;
    }
  }

  *createFriendship(userId: string): Generator<Promise<void>, void, void> {
    try {
      this.isFetching = true;
      yield FriendsService.createFriendship(userId);
      yield flowResult(this.fetchFriends());
    } finally {
      this.isFetching = false;
    }
  }

  *deleteFriendship(userId: string): Generator<Promise<void>, void, void> {
    try {
      this.isFetching = true;
      yield FriendsService.deleteFriendship(userId);
      yield flowResult(this.fetchFriends());
    } finally {
      this.isFetching = false;
    }
  }
}
