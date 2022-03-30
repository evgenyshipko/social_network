import React, { useEffect } from "react";
import { Content, FriendsBlock, MainContainer } from "@pages/pages.styled";
import { useStores } from "@store";
import { Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import Spacer from "@src/components/Spacer/Spacer";
import { getUserName } from "@src/components/UserName";
import { UserInfo } from "@src/components/UserInfo";
import { useParams } from "react-router-dom";

export const FriendPage = observer(() => {
  const {
    FriendStore: { fetchFriends, attach, detach, user, friends, isFetching },
  } = useStores();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    attach(id);
    fetchFriends(id);
    return detach;
  }, [fetchFriends, id, attach, detach]);

  const isLoaded = !isFetching && Boolean(user) && id;

  return (
    isLoaded && (
      <MainContainer>
        <Content>
          <UserInfo user={user} />

          <Spacer size={10} vertical />

          <FriendsBlock>
            <Typography>
              Friends: {friends.map((friend) => getUserName(friend)).join(", ")}
            </Typography>
          </FriendsBlock>
        </Content>
      </MainContainer>
    )
  );
});
