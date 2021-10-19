import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import FlexCenterDiv from "../FlexCenterDiv";
import { Person, Mail, Cake, Room } from "@mui/icons-material";
import Spreader from "../Spreader";
import Input from "./Input";
import Button from "./Button";
import MobileDatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { InputWrapper } from "./InputWrapper";
import { ErrorMsg } from "./ErrorMsg";
import dayjs from "dayjs";
import { useForm } from "@/hooks/useForm";
import validations from "./Validations";
import Select from "@/components/SignUpForm/Select";
import { ufList } from "./ufList";
import useApi from "@/hooks/useApi";
import AddressSubmitData from "../interfaces/addressSubmitData";
import { TextField, MenuItem } from "@mui/material";

export default function SignUpForm() {
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const { signUp, cep } = useApi();
  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
    customHandleChange,
  } = useForm({
    validations: validations,

    onSubmit: (data: AddressSubmitData) => {
      const newData = {
        name: data.name,
        email: data.email,
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
      };

      // axios Post aqui!
      console.log(newData);
    },
    initialValues: {
      name: "",
      email: "",
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
      cep.getAddress(valueWithoutMask).then(({ data }: any) => {
        setDynamicInputIsLoading(false);

        setData({
          ...newDataValues,
          street: data.logradouro,
          city: data.localidade,
          neighborhood: data.bairro,
          state: data.uf,
        });
      });
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
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
              name="birthday"
              // "disabled" e "readOnly" props desabilitam o campo.
              views={["year", "month", "day"]}
              label="Data de Nascimento"
              inputVariant="outlined"
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
                label="Número"
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
            {errors.neighborhood && <ErrorMsg>{errors.neighborhood}</ErrorMsg>}
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
      <Button type="submit" disabled={dynamicInputIsLoading}>
        Salvar
      </Button>
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

// const StyledInput = styled(Input)`
//   width: 100%;
// `;
