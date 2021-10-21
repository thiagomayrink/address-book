export default interface AddressSubmitData {
  name: string;
  slug: string;
  email: string;
  birthday: string;
  cep: string;
  street: string;
  city: string;
  number: string;
  state: string;
  neighborhood: string;
  addressDetail?: string;
}
