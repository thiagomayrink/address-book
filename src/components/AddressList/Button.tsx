import { Button } from "@mui/material";
import styled from "styled-components";

export default function IconButton({ ...props }) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

const StyledButton = styled(Button)`
  svg {
    font-size: 20px;
  }
`;
