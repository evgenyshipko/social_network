import React from "react";
import { Content, MainContainer } from "@pages/home/HomePage.styled";
import { useStores } from "@store";
import { Typography } from "@mui/material";
import capitalize from "lodash/capitalize";
import { observer } from "mobx-react-lite";

export const HomePage = observer(() => {
  const {
    AuthStore: { user },
  } = useStores();

  const userName =
    capitalize(user?.firstName) + " " + capitalize(user?.lastName);

  return (
    <MainContainer>
      <Content>
        <Typography>{userName}</Typography>
        <Typography>Birthday: {user.birthday}</Typography>
        <Typography>City: {user.city}</Typography>
        <Typography>About: {user.about}</Typography>
      </Content>
    </MainContainer>
  );
});
