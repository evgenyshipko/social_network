import styled from "@emotion/styled";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { CircularProgress } from "@mui/material";
import { useStores } from "@store";
import { Path } from "@src/routesList";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #edeef0;
`;

export const Content = styled.div`
  width: 500px;
  background-color: white;
  height: 100vh;
  border-radius: 5px;
  padding: 30px;
`;

export const AuthLayout = observer(() => {
  const {
    AuthStore: { isFetching, user },
  } = useStores();

  const isAuth = user && !isFetching;

  if (isFetching) {
    return <CircularProgress />;
  }

  if (isAuth) {
    return (
      <MainContainer>
        <Content>
          <Outlet />
        </Content>
      </MainContainer>
    );
  }

  return <Navigate to={Path.LOGIN} />;
});
