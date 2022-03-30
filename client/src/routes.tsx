import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useStores } from "@store";
import { AuthorizedRoute } from "@src/components/AuthorizedRoute";
import { LoginPage } from "@pages/LoginPage";
import { RegistrationPage } from "@pages/RegisterPage";
import { ProfilePage } from "@pages/ProfilePage";
import { observer } from "mobx-react-lite";
import { FriendPage } from "@pages/FriendPage";

export enum Path {
  REGISTRATION = "/registration",
  LOGIN = "/login",
  PROFILE = "/",
  FRIEND = "/:id",
}

export const Routes = observer((): JSX.Element => {
  const {
    AuthStore: { fetchAuth },
  } = useStores();

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  return (
    <Switch>
      <Route path={Path.LOGIN} component={LoginPage} exact />

      <Route path={Path.REGISTRATION} component={RegistrationPage} exact />

      <AuthorizedRoute path={Path.PROFILE} component={ProfilePage} exact />

      <AuthorizedRoute path={Path.FRIEND} component={FriendPage} exact />
    </Switch>
  );
});
