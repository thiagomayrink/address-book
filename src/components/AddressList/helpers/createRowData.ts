import SignUpGetData from "@/components/interfaces/SignUpGetData";

export default function createData(data: SignUpGetData) {
  const { _id, name, email, birthday, address } = data;
  //prettier-ignore
  return {
    "Id": _id,
    "Nome": name,
    "E-mail": email,
    "Nascimento": birthday,
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
