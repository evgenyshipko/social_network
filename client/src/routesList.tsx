import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStores } from "@store";
import { LoginPage } from "@pages/LoginPage";
import { RegistrationPage } from "@pages/RegisterPage";
import { MainPage } from "@pages/MainPage";
import { observer } from "mobx-react-lite";
import { FriendPage } from "@pages/FriendPage";
import { SearchPage } from "@pages/SearchPage";
import { AuthLayout } from "@src/components/AuthLayout";

export enum Path {
  REGISTRATION = "/registration",
  LOGIN = "/login",
  MAIN = "/",
  FRIEND = "/:id",
  SEARCH = "/search",
}

export const RoutesList = observer((): JSX.Element => {
  const {
    AuthStore: { fetchAuth },
  } = useStores();

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  return (
    <Routes>
      <Route path={Path.LOGIN} element={<LoginPage />} />

      <Route path={Path.REGISTRATION} element={<RegistrationPage />} />

      <Route path={Path.MAIN} element={<AuthLayout />}>
        <Route path={Path.MAIN} element={<MainPage />} />

        <Route path={Path.SEARCH} element={<SearchPage />} />

        <Route path={Path.FRIEND} element={<FriendPage />} />
      </Route>
    </Routes>
  );
});
