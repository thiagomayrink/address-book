import api from "@/services/api";
import SignUpData from "@/components/interfaces/signUpData";

export default class SignUpApi {
  save(body: SignUpData) {
    return api.patch("/signup", body);
  }

  getAll() {
    return api.get("/signup");
  }
}
