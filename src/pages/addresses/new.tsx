import SignUpForm from "@/components/SignUpForm";
import styled from "styled-components";

export default function NewAddress() {
  return (
    <FormContainer>
      <SignUpForm />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
