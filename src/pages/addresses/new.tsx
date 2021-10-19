import SignUpForm from "@/components/SignUpForm";
import Spreader from "@/components/Spreader";
import styled from "styled-components";

export default function NewAddress() {
  return (
    <FormContainer>
      <SignUpForm />
      <Spreader height="24px" />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
