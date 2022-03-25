import React from "react";

import { observer } from "mobx-react-lite";
import { useStores } from "@store";
import { Message } from "./Message";
import { NoticeContainer } from "./Notice.styled";

export const Notice = observer((): JSX.Element => {
  const { NoticeStore } = useStores();

  return (
    <>
      <NoticeContainer>
        {NoticeStore.items.map(({ text, type, uuid }) => (
          <Message
            key={uuid}
            text={text}
            type={type}
            uuid={uuid}
            noticeStore={NoticeStore}
          />
        ))}
      </NoticeContainer>
    </>
  );
});
