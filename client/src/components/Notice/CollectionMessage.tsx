import { Message, MessageProps } from "@components/Notice/Message";
import React, { FC } from "react";
import { styled } from "linaria/react";
import { useTheme } from "lego";

type CollectionMessageProps = Omit<MessageProps, "text"> & { text: string };

const StyledSpan = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

export const CollectionMessage: FC<CollectionMessageProps> = ({
  text,
  ...rest
}) => {
  let message: JSX.Element | string = text;

  const theme = useTheme();

  const execRes = /"([а-яa-z0-9_\- ])+"/gi.exec(text);
  if (execRes) {
    const collectionName = execRes[0];
    const startIndex = execRes.index;
    const endIndex = startIndex + collectionName.length;

    message = (
      <span>
        {text.substring(0, startIndex)}
        <StyledSpan color={theme.success.main}>{collectionName}</StyledSpan>
        {text.substring(endIndex)}
      </span>
    );
  }

  return <Message {...rest} text={message} />;
};
