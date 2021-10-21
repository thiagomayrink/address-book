export default interface TranslatedRows {
  Id: string;
  Nome: string;
  slug: string;
  "E-mail": string;
  Nascimento: string;
  address: {
    CEP: string;
    Estado: string;
    Cidade: string;
    Bairro: string;
    Rua: string;
    Número: string;
    Complemento: string;
  };
}
