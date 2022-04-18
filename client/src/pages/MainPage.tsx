import React, { useEffect } from "react";
import { FriendsBlock } from "@pages/pages.styled";
import { useStores } from "@store";
import { Button, Chip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import Spacer from "@src/components/Spacer/Spacer";
import { getUserName } from "@src/components/UserName";
import { UserInfo } from "@src/components/UserInfo";
import { useNavigate } from "react-router-dom";
import { Path } from "@src/routesList";

export const MainPage = observer(() => {
  const {
    AuthStore: { user, logOut },
    ProfileStore: { fetchFriends, friends, deleteFriendship },
  } = useStores();

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <UserInfo user={user} />

        <Button style={{ height: "40px" }} variant="contained" onClick={logOut}>
          Log out
        </Button>
      </div>

      <Spacer size={10} vertical />

      <FriendsBlock>
        <Typography>Friends: </Typography>
        {friends.map((friend) => (
          <div key={friend.id}>
            <Spacer size={10} />
            <Chip
              label={getUserName(friend)}
              variant="outlined"
              onClick={() => navigate(`/${friend.id}`)}
              onDelete={() => deleteFriendship(friend.id)}
            />
          </div>
        ))}
      </FriendsBlock>

      <Spacer size={20} vertical />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={() => navigate(Path.SEARCH)}>
          Friends Search
        </Button>
      </div>
    </>
  );
});
