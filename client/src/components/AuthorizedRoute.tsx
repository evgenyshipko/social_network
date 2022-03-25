import React, { ComponentType, FC, useCallback } from "react";
import { useStores } from "@store";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { Path } from "@src/routes";

interface ProtectedRouteProps extends RouteProps {
  title?: string;
  redirectTo?: string;
}

const withProtect =
  <T extends object>(
    Component: ComponentType,
    condition: boolean,
    redirectTo: string
  ): FC<T> =>
  (props) =>
    condition ? <Component {...props} /> : <Redirect to={redirectTo} />;

export const AuthorizedRoute: FC<ProtectedRouteProps> = ({
  redirectTo = Path.LOGIN,
  ...restProps
}) => {
  const {
    AuthStore: { user, isFetching },
  } = useStores();

  const isAuth = user && !isFetching;

  const ProtectedRoute = useCallback(withProtect(Route, !isAuth, redirectTo), [
    isAuth,
  ]);

  return <ProtectedRoute {...restProps} />;
};
