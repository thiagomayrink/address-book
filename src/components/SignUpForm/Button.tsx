import MuiButton from "@material-ui/core/Button";
import styled from "styled-components";

export default function Button({
  variant = "contained",
  children,
  ...props
}: any) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 16px !important;
`;
