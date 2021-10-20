import MuiLoadingButton from "@mui/lab/LoadingButton";

import styled from "styled-components";

export default function LoadingButton({
  children,
  ...props
}: any) {
  return (
    <StyledMuiButton {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiLoadingButton)`
  margin-top: 16px !important;
`;
