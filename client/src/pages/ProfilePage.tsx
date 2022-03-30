import React, { useEffect } from "react";
import { Content, FriendsBlock, MainContainer } from "@pages/pages.styled";
import { useStores } from "@store";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { User } from "@src/types";
import { flowResult } from "mobx";
import Spacer from "@src/components/Spacer/Spacer";
import { getUserName, UserName } from "@src/components/UserName";
import { UserInfo } from "@src/components/UserInfo";
import { useHistory } from "react-router-dom";

type FriendSelectMenuItemProps = {
  user: User;
  isFriend: boolean;
  onCreateFriendship: (id) => Promise<void>;
};

const FriendSelectMenuItem = ({
  user,
  isFriend,
  onCreateFriendship,
}: FriendSelectMenuItemProps) => {
  const handleCreateFriendship = () => onCreateFriendship(user.id);
  return (
    <MenuItem
      value={user.id}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <UserName user={user} />
      <Button
        variant="contained"
        disabled={isFriend}
        onClick={handleCreateFriendship}
      >
        {isFriend ? "Already friends" : "Add to friends"}
      </Button>
    </MenuItem>
  );
};

export const ProfilePage = observer(() => {
  const {
    AuthStore: { user, logOut },
    ProfileStore: {
      fetchFriends,
      fetchUsers,
      friends,
      users,
      createFriendship,
      deleteFriendship,
    },
  } = useStores();

  useEffect(() => {
    fetchFriends();
    fetchUsers();
  }, [fetchFriends, fetchUsers]);

  const history = useHistory();

  return (
    user && (
      <MainContainer>
        <Content>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <UserInfo user={user} />

            <Button
              style={{ height: "40px" }}
              variant="contained"
              onClick={logOut}
            >
              Log out
            </Button>
          </div>

          <Spacer size={10} vertical />

          <FriendsBlock>
            <Typography>Friends: </Typography>
            {friends.map((friend) => (
              <>
                <Spacer size={10} />
                <Chip
                  key={friend.id}
                  label={getUserName(friend)}
                  variant="outlined"
                  onClick={() => history.push(`/${friend.id}`)}
                  onDelete={() => deleteFriendship(friend.id)}
                />
              </>
            ))}
          </FriendsBlock>

          <Spacer size={20} vertical />

          <FormControl style={{ width: "400px" }}>
            <InputLabel id="friends-label">Friends</InputLabel>
            <Select label="Friends" labelId="friends-label">
              {users?.map((user) => (
                <FriendSelectMenuItem
                  key={user.id}
                  user={user}
                  isFriend={Boolean(
                    friends.find((item) => item.id === user.id)
                  )}
                  onCreateFriendship={flowResult(createFriendship)}
                />
              ))}
            </Select>
          </FormControl>
        </Content>
      </MainContainer>
    )
  );
});
