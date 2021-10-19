import AddressList from "@/components/AddressList";
import styled from "styled-components";

export default function Adresses() {
  return (
    <FormContainer>
      <AddressList />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
