import { ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";
import FlexCenterDiv from "@/components/FlexCenterDiv";
import { Person, Mail, Cake, Room } from "@mui/icons-material";
import Spreader from "@/components/Spreader";
import Input from "@/components/SignUpForm/Input";
import SaveIcon from "@mui/icons-material/Save";
import BuildIcon from "@mui/icons-material/Build";
import MobileDatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { InputWrapper } from "@/components/SignUpForm/InputWrapper";
import { ErrorMsg } from "@/components/SignUpForm/ErrorMsg";
import dayjs from "dayjs";
import { useForm } from "@/hooks/useForm";
import validations from "@/components/SignUpForm/Validations";
import Select from "@/components/SignUpForm/Select";
import { ufList } from "@/components/SignUpForm/ufList";

import AddressEditData from "@/components/interfaces/AddressEditData";
import GetViaCepData from "@/components/interfaces/GetViaCepData";

import { MenuItem, Typography } from "@mui/material";
import { toast } from "react-toastify";
import LoadingButton from "@/components/SignUpForm/LoadingButton";

import { useRouter } from "next/router";
import useApi from "@/hooks/useApi";
import PatchSignUpData from "@/components/interfaces/PatchSignUpData";
import SignUpGetData from "@/components/interfaces/SignUpGetData";

type Props = {
  slug: string | null;
};

export default function EditForm(props: Props) {
  const { slug } = props;
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const router = useRouter();
  const { signUp, cep } = useApi();

  const [isEditMode, setIsEditMode] = useState(true);

  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
    customHandleChange,
  } = useForm({
    validations: validations,

    onSubmit: (data: AddressEditData) => {
      setDynamicInputIsLoading(true);

      const newData = {
        name: data.name,
        email: data.email,
        slug: data.slug,
        birthday: data.birthday,
        address: {
          cep: data.cep,
          street: data.street,
          city: data.city,
          number: data.number,
          state: data.state,
          neighborhood: data.neighborhood,
          addressDetail: data.addressDetail,
        },
      } as PatchSignUpData;

      if (newData.slug === null) toast("Esse n??o ?? um cadastro v??lido");

      signUp
        .update(newData)
        .then(() => {
          setDynamicInputIsLoading(false);
          router.push("/addresses");
          toast("Atualizado com sucesso!");
        })
        .catch(() => {
          setDynamicInputIsLoading(false);
          toast("Tente novamente mais tarde :(");
        });
    },

    initialValues: {
      name: "",
      email: "",
      slug: "",
      birthday: null,
      cep: "",
      street: "",
      city: "",
      number: "",
      state: "",
      neighborhood: "",
      addressDetail: "",
    },
  });

  useEffect(() => {
    if (slug !== null) {
      signUp.getOneBySlug(slug).then((response) => {
        const serverData = response?.data as PatchSignUpData;
        const data = serverData as SignUpGetData;
        const { address } = data;

        const currentUserData = {
          name: serverData.name,
          email: serverData.email,
          slug: serverData.slug,
          birthday: serverData.birthday,

          cep: address.cep,
          street: address.street,
          city: address.city,
          number: address.number,
          state: address.state,
          neighborhood: address.neighborhood,
          addressDetail: address.addressDetail,
        };
        setData(currentUserData);
      });
    }
  }, [setData]);

  function isValidCep(cep: string) {
    return cep.length === 8;
  }

  function handleCepChanges(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    const valueWithoutMask = value.replace("-", "");

    if (isValidCep(valueWithoutMask)) {
      const newDataValues = {
        ...data,
        [name]: value,
      };

      setDynamicInputIsLoading(true);
      cep
        .getAddress(valueWithoutMask)
        .then((response) => {
          const data = response.data as GetViaCepData;
          setDynamicInputIsLoading(false);

          setData({
            ...newDataValues,
            street: data.logradouro,
            city: data.localidade,
            neighborhood: data.bairro,
            state: data.uf,
          });
        })
        .catch(() => {
          toast("n??o foi possivel obter o endere??o atrav??s do CEP");
        });
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {isEditMode ? "Editar Endere??o" : "Adicionar Endere??o"}
      </Typography>
      <Spreader height="22px" />
      <fieldset disabled={dynamicInputIsLoading}>
        <FlexCenterDiv>
          <Person />
          <Spreader />
          <InputWrapper>
            <Input
              label="Nome Completo"
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange("name")}
            />
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </InputWrapper>
        </FlexCenterDiv>
        <Spreader />
        <FlexCenterDiv>
          <Mail />
          <Spreader />
          <InputWrapper>
            <Input
              label="e-mail@email.com"
              name="email"
              type="text"
              value={data.email}
              onChange={handleChange("email")}
            />
            {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
          </InputWrapper>
        </FlexCenterDiv>
        <Spreader />
        <FlexCenterDiv>
          <Cake />
          <Spreader />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <InputWrapper>
              <MobileDatePicker
                views={["year", "month", "day"]}
                label="Data de Nascimento"
                clearable
                value={data.birthday}
                renderInput={(params) => <Input {...params} />}
                onChange={(date) => {
                  customHandleChange(
                    "birthday",
                    (d) => d && dayjs(d).format("DD-MM-YYYY")
                  )(date);
                }}
              />
              {errors.birthday && <ErrorMsg>{errors.birthday}</ErrorMsg>}
            </InputWrapper>
          </LocalizationProvider>
        </FlexCenterDiv>
        <Spreader />
        <FlexCenterDiv>
          <Room />
          <Spreader />
          <div>
            <FlexCenterDiv>
              <InputWrapper>
                <Input
                  label="CEP"
                  name="cep"
                  mask="99999-999"
                  value={data.cep || ""}
                  onChange={(e: any) => {
                    handleChange("cep")(e);
                    handleCepChanges(e);
                  }}
                />
                {errors.cep && <ErrorMsg>{errors.cep}</ErrorMsg>}
              </InputWrapper>
              <Spreader />
              <InputWrapper>
                <Select
                  label="Estado"
                  name="state"
                  id="state"
                  value={data.state || ""}
                  onChange={handleChange("state")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {ufList.map((uf) => (
                    <MenuItem value={uf.name} key={uf.id}>
                      <em>{uf.name}</em>
                    </MenuItem>
                  ))}
                </Select>
                {errors.state && <ErrorMsg>{errors.state}</ErrorMsg>}
              </InputWrapper>
            </FlexCenterDiv>
            <Spreader />
            <FlexCenterDiv>
              <InputWrapper>
                <Input
                  label="Rua"
                  name="street"
                  value={data.street || ""}
                  onChange={handleChange("street")}
                  disabled={dynamicInputIsLoading}
                />
                {errors.street && <ErrorMsg>{errors.street}</ErrorMsg>}
              </InputWrapper>
              <Spreader />
              <InputWrapper>
                <Input
                  label="N??mero"
                  name="number"
                  value={data.number || ""}
                  onChange={handleChange("number")}
                />
                {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
              </InputWrapper>
            </FlexCenterDiv>
            <Spreader />
            <InputWrapper>
              <Input
                label="Cidade"
                name="city"
                value={data.city || ""}
                onChange={handleChange("city")}
                disabled={dynamicInputIsLoading}
              />
              {errors.city && <ErrorMsg>{errors.city}</ErrorMsg>}
            </InputWrapper>
            <Spreader />
            <InputWrapper>
              <Input
                label="Bairro"
                name="neighborhood"
                value={data.neighborhood || ""}
                onChange={handleChange("neighborhood")}
                disabled={dynamicInputIsLoading}
              />
              {errors.neighborhood && (
                <ErrorMsg>{errors.neighborhood}</ErrorMsg>
              )}
            </InputWrapper>
            <Spreader />
            <InputWrapper>
              <Input
                label="Complemento"
                name="addressDetail"
                value={data.addressDetail || ""}
                onChange={handleChange("addressDetail")}
              />
            </InputWrapper>
          </div>
        </FlexCenterDiv>
      </fieldset>
      <LoadingButton
        type="submit"
        disabled={dynamicInputIsLoading}
        loading={dynamicInputIsLoading}
        loadingPosition="start"
        startIcon={isEditMode ? <BuildIcon /> : <SaveIcon />}
        variant="outlined"
      >
        Salvar
      </LoadingButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 0 16px 0 8px;
  }
`;
