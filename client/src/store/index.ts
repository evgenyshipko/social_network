import { AuthStore } from "@store/auth";
import { createContext, useContext } from "react";
import { createBrowserHistory } from "history";
import { NoticeStore } from "@store/notice";

const createStore = () => {
  const authStore = new AuthStore();

  const noticeStore = new NoticeStore();

  return {
    AuthStore: authStore,
    NoticeStore: noticeStore,
  };
};

export const stores = createStore();

export type RootStore = ReturnType<typeof createStore>;

export const StoresContext = createContext<RootStore | null>(null);

export const history = createBrowserHistory();

export const useStores = (): RootStore => {
  const stores = useContext(StoresContext);

  if (!stores) {
    throw new Error(
      "useStores() следует использовать внутри <StoresContext.provider />"
    );
  }

  return stores;
};
