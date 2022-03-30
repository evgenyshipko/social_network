import { SpacerProps } from "./Spacer.types";
import styled from "@emotion/styled";

export const SpacerStyled = styled.div<SpacerProps>`
  display: ${({ vertical }) => (vertical ? "block" : "inline-block")};
  width: ${({ vertical, size }) => (vertical ? 0 : `${size}px`)};
  height: ${({ vertical, size }) => (vertical ? `${size}px` : 0)};
`;
