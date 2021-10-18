import { useRef } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import styled from "styled-components";

const FormControlWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

interface MultiSelectProps {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: any;
  children: any;
}

export default function MultiSelect({
  label,
  name,
  id,
  value,
  onChange,
  children,
}: MultiSelectProps) {
  const inputLabelRef = useRef(null);

  return (
    <FormControlWrapper>
      <FormControl variant="outlined">
        <InputLabel ref={inputLabelRef} htmlFor={id}>
          {label}
        </InputLabel>
        <Select
          autoWidth
          value={value}
          onChange={onChange}
          input={<OutlinedInput fullWidth name={name} id={id} />}
        >
          {children}
        </Select>
      </FormControl>
    </FormControlWrapper>
  );
}
