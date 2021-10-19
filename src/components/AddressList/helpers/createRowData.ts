import signupGetData from "@/components/interfaces/signupGetData";

export default function createData(data: signupGetData) {
  const { _id, name, email, address } = data;
  //prettier-ignore
  return {
    "Id": _id,
    "Nome": name,
    "E-mail": email,
    address: {
      "CEP": address?.cep,
      "Estado": address?.state,
      "Cidade": address?.city,
      "Bairro": address?.neighborhood,
      "Rua": address?.street,
      "Número": address?.number,
      "Complemento": address.addressDetail || "",
    },
  };
}
