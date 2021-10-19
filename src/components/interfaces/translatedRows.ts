export default interface translatedRows {
  Id: string;
  Nome: string;
  "E-mail": string;
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
