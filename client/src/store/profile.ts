import { flow, flowResult, makeObservable, observable } from "mobx";
import { User } from "@src/types";
import { FriendData, FriendsService } from "@services/FriendsService";
import { UserService } from "@services/UserService";

export class ProfileStore {
  isFetching = false;

  friends: FriendData[] = [];

  users: User[] = [];

  isUsersFetching = false;

  constructor() {
    makeObservable(this, {
      users: observable,
      isFetching: observable,
      friends: observable,
      fetchFriends: flow.bound,
      fetchUsers: flow.bound,
      deleteFriendship: flow.bound,
      createFriendship: flow.bound,
      isUsersFetching: observable,
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

  *fetchUsers(
    firstName: string,
    lastName: string
  ): Generator<Promise<User[]>, void, User[]> {
    try {
      this.isUsersFetching = true;
      this.users = yield UserService.getUsers(firstName, lastName);
    } finally {
      this.isUsersFetching = false;
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
