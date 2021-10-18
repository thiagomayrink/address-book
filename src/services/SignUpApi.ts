import api from "@/services/api";
import SignUpData from "@/components/interfaces/signUpData";

export default class SignUpApi {
  save(body: SignUpData) {
    return api.post("/addresses", body, {});
  }

  getPersonalInformations() {
    return api.get("/addresses", {});
  }
}
