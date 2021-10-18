import CepApi from "@/services/CepApi";
import SignUpApi from "@/services/SignUpApi";

export default function useApi() {
  return {
    cep: new CepApi(),
    signUp: new SignUpApi(),
  };
}
