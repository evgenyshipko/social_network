import { v4 as createUuid } from "uuid";
import { action, makeObservable, observable } from "mobx";
import { AlertColor } from "@mui/material";

export enum NoticeType {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
}

interface NoticeParams {
  context?: string;
  uuid?: string;
  delaySeconds?: typeof Infinity | number;
}

interface NoticePrivateParams extends NoticeParams {
  text?: string;
  type?: AlertColor;
}

type Notice = Omit<NoticePrivateParams, "delaySeconds">;

export class NoticeStore {
  items: Notice[] = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      initDefault: action,
      initError: action,
      initSuccess: action,
      drop: action,
    });
  }

  initError = (text: string, params?: NoticeParams) => {
    this.init({ ...params, type: NoticeType.ERROR, text });
  };

  initDefault = (text: string, params?: NoticeParams) => {
    this.init({ ...params, type: NoticeType.DEFAULT, text });
  };

  initSuccess = (text: string, params?: NoticeParams) => {
    this.init({ ...params, type: NoticeType.SUCCESS, text });
  };

  private init({
    text,
    type,
    context,
    delaySeconds = 5,
  }: NoticePrivateParams): void {
    const uuid = createUuid();

    console.log("init");

    const newItem = {
      text,
      type,
      context,
      uuid,
    };

    this.items = [
      ...this.items.filter((notice) => notice.context !== context),
      newItem,
    ];

    const MILLISECOND_PER_SECOND = 1000;

    if (delaySeconds !== Infinity) {
      setTimeout(() => this.drop(uuid), delaySeconds * MILLISECOND_PER_SECOND);
    }
  }

  drop(payload: string): void {
    this.items = this.items.filter((notice) => notice.uuid !== payload);
  }
}
