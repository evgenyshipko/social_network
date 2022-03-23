import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useStores } from "@store";
import { AuthorizedRoute } from "@src/components/AuthorizedRoute";
import { HomePage } from "@pages/HomePage";
import { AuthPage } from "@pages/AuthPage";
import { RegistrationPage } from "@pages/RegisterPage";

export enum Path {
  REGISTRATION = "/registration",
  LOGIN = "/login",
  MAIN = "/",
}

export const Routes = (): JSX.Element => {
  const {
    AuthStore: { fetchAuth },
  } = useStores();

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  return (
    <Switch>
      <Route path={Path.LOGIN} component={AuthPage} exact />

      <Route path={Path.REGISTRATION} component={RegistrationPage} exact />

      <AuthorizedRoute path={Path.MAIN} component={HomePage} exact />
    </Switch>
  );
};
