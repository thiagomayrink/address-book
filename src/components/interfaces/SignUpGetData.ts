export default interface SignUpGetData {
  _id: string;
  email: string;
  birthday: string;
  name: string;
  updatedAt: string;
  address: {
    cep: string;
    street: string;
    city: string;
    number: string;
    state: string;
    neighborhood: string;
    addressDetail: string;
  };
}
