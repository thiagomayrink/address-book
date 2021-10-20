import CenterContainer from "@/components/CenterContainer";
import { Typography } from "@mui/material";
import Spreader from "@/components/Spreader";
import styled from "styled-components";
import Image from "next/image";

export default function Home() {
  return (
    <CenterContainer>
      <Typography
        variant="h6"
        align="center"
        component="h1"
        sx={{ flexGrow: 1 }}
      >
        Bem vindo à lista de Endereços!
      </Typography>
      <Spreader height="48px" />
      <ImgContainer>
        <Image
          src="/address-book.png"
          alt="Picture of the author"
          width="100%"
          height="100%"
        />
      </ImgContainer>
      <TextBox>
        <Typography
          variant="subtitle2"
          align="center"
          component="h3"
          sx={{ flexGrow: 1 }}
        >
          Aqui você pode compartilhar seu endereço e de amigos, remover e editar
          qualquer endereço a qualquer momento!
        </Typography>
      </TextBox>
    </CenterContainer>
  );
}

const TextBox = styled.div`
  max-width: 400px;
`;

const ImgContainer = styled.div`
  width: 80%;
  height: calc(100vh - 20%);
  text-align: center;
`;
