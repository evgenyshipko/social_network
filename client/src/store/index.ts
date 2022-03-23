import { AuthStore } from "@store/auth";
import { createContext, useContext } from "react";
import { createBrowserHistory } from "history";

const createStore = () => {
  const authStore = new AuthStore();

  return {
    AuthStore: authStore,
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
