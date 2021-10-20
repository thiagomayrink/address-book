import api from "@/services/api";
import SignUpData from "@/components/interfaces/SignUpData";

const config = {
  data: {
    email: "email",
  },
};
export default class SignUpApi {
  save(body: SignUpData) {
    return api.patch("/signup", body);
  }

  getOneByEmail(email: string) {
    return api.get(`/signup/?email=${email}`);
  }

  getAll() {
    return api.get("/signup");
  }

  deleteByEmail(email: string) {
    return api.delete("/signup", { data: email });
  }
}
