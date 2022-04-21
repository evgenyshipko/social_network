import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Spacer from "@src/components/Spacer/Spacer";
import { useStores } from "@store";
import { UserName } from "@src/components/UserName";
import { User } from "@src/types";
import { flowResult } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Path } from "@src/routesList";

type FriendSelectMenuItemProps = {
  user: User;
  isFriend: boolean;
  onCreateFriendship: (id) => Promise<void>;
};

const FriendItem = ({
  user,
  isFriend,
  onCreateFriendship,
}: FriendSelectMenuItemProps) => {
  const handleCreateFriendship = () => onCreateFriendship(user.id);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <UserName user={user} />
      <Button
        variant="contained"
        disabled={isFriend}
        onClick={handleCreateFriendship}
      >
        {isFriend ? "Already friends" : "Add to friends"}
      </Button>
    </div>
  );
};

export const SearchPage = observer(() => {
  const {
    ProfileStore: {
      fetchUsers,
      users,
      friends,
      fetchFriends,
      createFriendship,
    },
    NoticeStore: { initError },
  } = useStores();

  const navigate = useNavigate();

  const initialUsersQuery = () => {
    const currentUrlParams = new URLSearchParams(window.location.search);

    const firstName = currentUrlParams.get("firstName");
    const lastName = currentUrlParams.get("lastName");

    if (firstName && lastName) {
      setLastName(lastName);
      setFirstName(firstName);
      fetchUsers(firstName, lastName);
    }
  };

  useEffect(() => {
    initialUsersQuery();
    fetchFriends();
  }, []);

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const handleClickSearch = () => {
    if (!lastName || !firstName) {
      initError("Please fill all search fields!");
      return;
    }
    fetchUsers(firstName, lastName);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography>Поиск друзей</Typography>
      <Spacer vertical size={10} />
      <TextField
        label="Input firstname"
        size="small"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <Spacer vertical size={10} />
      <TextField
        label="Input lastname"
        size="small"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <Spacer vertical size={10} />

      <Button onClick={handleClickSearch} variant="contained">
        Искать друзей!
      </Button>

      <Spacer vertical size={10} />

      <Button onClick={() => navigate(Path.MAIN)}>Назад</Button>

      <Spacer vertical size={10} />

      {users.map((user) => (
        <FriendItem
          key={user.id}
          user={user}
          isFriend={Boolean(friends.find((item) => item.id === user.id))}
          onCreateFriendship={flowResult(createFriendship)}
        />
      ))}
    </div>
  );
});
