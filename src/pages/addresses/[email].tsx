import SignUpForm from "@/components/SignUpForm";
import Spreader from "@/components/Spreader";
import styled from "styled-components";

import { useRouter } from "next/router";
import SignUpData from "@/components/interfaces/SignUpData"
import SignUpGetData from "@/components/interfaces/SignUpGetData";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";

export default function EditAddress() {
  const [currentData, setCurrentData]: [
    SignUpData | null,
    (currentData: SignUpData | null) => void
  ] = useState<SignUpData | null>(null);

  const { signUp } = useApi();
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      const email = router.query.email as string;
      signUp.getOneByEmail(email).then((response) => {
        const data = response.data as SignUpGetData;
        const { address } = data;
        const currentUserData = {
          name: data.name,
          email: data.email,
          birthday: data.birthday,
          address: {
            cep: address.cep,
            street: address.street,
            city: address.city,
            number: address.number,
            state: address.state,
            neighborhood: address.neighborhood,
            addressDetail: address.addressDetail,
          },
        };
        setCurrentData(currentUserData);
      });
    }
  }, [setCurrentData]);

  return (
    <FormContainer>
      <SignUpForm currentUserData={currentData} />
      <Spreader height="24px" />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
