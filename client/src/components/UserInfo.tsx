import { Typography } from "@mui/material";
import Spacer from "@src/components/Spacer/Spacer";
import React from "react";
import { UserName } from "@src/components/UserName";
import { User } from "@src/types";
import { formatDate } from "@src/utils";

export const UserInfo = ({ user }: { user: User }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <UserName user={user} isHeader />

    <Spacer size={20} vertical />

    <Typography>Birthday: {formatDate(new Date(user.birthday))}</Typography>
    <Typography>City: {user.city}</Typography>
    <Typography>About: {user.about ? user.about : "-"}</Typography>
  </div>
);
