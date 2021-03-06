import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import styled from "styled-components";

function Input({
  mask = "",
  maskChar = "",
  formatChars,
  variant = "outlined",
  value = "",
  onChange = () => 0,
  ...props
}: any) {
  return mask || maskChar ? (
    <InputMask
      mask={mask}
      maskChar={maskChar}
      value={value}
      onChange={onChange}
      {...(formatChars && { formatChars })}
    >
      {() => <TextField {...props} variant={variant} />}
    </InputMask>
  ) : (
    <TextField {...props} value={value} onChange={onChange} variant={variant} />
  );
}

const StyledInput = styled(Input)`
  width: 100%;
  z-index: 0;
`;

export default StyledInput;
