import EditForm from "@/components/EditForm";
import Spreader from "@/components/Spreader";

import PatchSignUpData from "@/components/interfaces/PatchSignUpData";
import SignUpGetData from "@/components/interfaces/SignUpGetData";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";

import { InferGetServerSidePropsType } from "next";
import CenterContainer from "@/components/CenterContainer";

export const getServerSideProps = async (context: any) => {
  const slug = context.query.slug as string;

  if (!slug) {
    return { props: { slug: null } };
  }
  return { props: { slug } };
};

function EditAddress({
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
  return (
    <CenterContainer>
      <EditForm slug={slug} />
      <Spreader height="24px" />
    </CenterContainer>
  );
}

export default EditAddress;
