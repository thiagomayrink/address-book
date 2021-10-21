export default interface SignUpData {
  name: string;
  email: string;
  slug: string;
  birthday: string;
  address: {
    cep: string;
    street: string;
    city: string;
    number: string;
    state: string;
    neighborhood: string;
    addressDetail?: string;
  };
}
