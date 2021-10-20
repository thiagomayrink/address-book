import api from "@/services/api";
import SignUpData from "@/components/interfaces/SignUpData";
export default class SignUpApi {
  save(body: SignUpData) {
    return api.patch("api/signup", body);
  }

  getOneByEmail(email: string) {
    return api.get(`api/signup/?email=${email}`);
  }

  getAll() {
    return api.get("api/signup");
  }

  deleteByEmail(email: string) {
    return api.delete("api/signup", { data: email });
  }
}
