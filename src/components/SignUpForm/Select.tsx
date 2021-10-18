import { useRef } from "react";
import { FormControl, Select, OutlinedInput, InputLabel } from "@mui/material";
import styled from "styled-components";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface MultiSelectProps {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: any;
  children: ReactJSXElement;
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

const FormControlWrapper = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
