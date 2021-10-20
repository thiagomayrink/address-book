import SignUpForm from "@/components/SignUpForm";
import Spreader from "@/components/Spreader";

import SignUpData from "@/components/interfaces/SignUpData";
import SignUpGetData from "@/components/interfaces/SignUpGetData";
import useApi from "@/hooks/useApi";
import { useState } from "react";

import { InferGetServerSidePropsType } from "next";
import CenterContainer from "@/components/CenterContainer";

export const getServerSideProps = async (context: any) => {
  const { signUp } = useApi();
  const email = context.query.email as string;
  const { data } = await signUp.getOneByEmail(email);
  const serverData = data as SignUpGetData;

  const { address } = serverData;

  const currentUserData = {
    name: serverData.name,
    email: serverData.email,
    birthday: serverData.birthday,
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
  return { props: { currentUserData } };
};

function EditAddress({
  currentUserData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentData, setCurrentData]: [
    SignUpData | null,
    (currentData: SignUpData | null) => void
  ] = useState<SignUpData | null>(currentUserData || null);

  return (
    <CenterContainer>
      <SignUpForm currentUserData={currentData} />
      <Spreader height="24px" />
    </CenterContainer>
  );
}

export default EditAddress;
