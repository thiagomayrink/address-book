export default interface signupGetData {
  _id: string;
  email: string;
  address: {
    cep: string;
    street: string;
    city: string;
    number: string;
    state: string;
    neighborhood: string;
    addressDetail: string;
  };
  name: string;
  updatedAt: string;
}
