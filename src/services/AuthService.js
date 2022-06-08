import service from "@/utils/service";

export default {
  signup(data) {
    return service.post("users/signup", data).then((response) => response.data);
  },
  login(credentials) {
    return service
      .post("users/login", credentials)
      .then((response) => response.data);
  },
};
