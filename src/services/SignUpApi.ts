import api from "@/services/api";
import SignUpData from "@/components/interfaces/SignUpData";
import PatchSignUpData from "@/components/interfaces/PatchSignUpData";

export default class SignUpApi {
  save(body: SignUpData) {
    return api.post("/api/signup", body);
  }

  update(body: PatchSignUpData) {
    return api.patch("/api/signup", body);
  }

  getOneBySlug(slug: string) {
    return api.get(`/api/signup/?slug=${slug}`);
  }

  getAll() {
    return api.get("/api/signup");
  }

  deleteBySlug(slug: string) {
    return api.delete("/api/signup", { data: slug });
  }
}
