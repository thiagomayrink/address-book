import api from "@/services/externalApi";

export default class CepApi {
  getAddress(cep: string) {
    return api.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
