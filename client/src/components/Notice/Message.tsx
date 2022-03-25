/* eslint-disable react/jsx-handler-names */
import React from "react";
import { NoticeStore } from "@store/notice";
import { observer } from "mobx-react-lite";
import { MessageBar } from "./Message.styled";
import { Alert, AlertColor } from "@mui/material";

export type MessageProps = {
  text: string | JSX.Element;
  type: AlertColor;
  uuid: string;
  noticeStore: NoticeStore;
};

export const Message = observer(
  ({ text, type, uuid, noticeStore }: MessageProps): JSX.Element => {
    const onDrop = () => noticeStore.drop(uuid);

    return (
      <div data-cy="всплывающее уведомление">
        <MessageBar
          open
          data-uuid={uuid}
          autoHideDuration={5000}
          onClose={onDrop}
        >
          <Alert onClose={onDrop} severity={type} sx={{ width: "100%" }}>
            {text}
          </Alert>
        </MessageBar>
      </div>
    );
  }
);
