import React from "react";
import { SpacerProps } from "./Spacer.types";
import { SpacerStyled } from "./Spacer.styled";

const Spacer: React.FC<SpacerProps> = ({
  className,
  dataCy = "спейсер",
  ...other
}) => <SpacerStyled className={className} data-cy={dataCy} {...other} />;

export default Spacer;
