import { capitalize, Typography } from "@mui/material";
import React from "react";
import { User } from "@src/types";
import { FriendData } from "@services/FriendsService";

export const getUserName = (user: User | FriendData) =>
  capitalize(user?.firstName) + " " + capitalize(user?.lastName);

export const UserName = ({
  user,
  isHeader,
}: {
  user: User | FriendData;
  isHeader?: boolean;
}) => (
  <Typography variant={isHeader ? "h5" : "body1"}>
    {user ? getUserName(user) : ""}
  </Typography>
);
