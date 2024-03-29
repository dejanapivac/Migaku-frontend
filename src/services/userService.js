import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:5000/auth",
  timeout: 3000,
});

let Auth = {
  async login(email, password) {
    let response = await Service.post("/login", {
      email: email,
      password: password,
    });

    let user = response.data;

    localStorage.setItem("user", JSON.stringify(user));

    return true;
  },
  async register(formData) {
    let response = await Service.post("/register", formData);

    let user = response.data;

    localStorage.setItem("user", JSON.stringify(user));

    return true;
  },
  async getUserById(id) {
    let response = await Service.get(`/getById/${id}`);
    return response.data;
  },
  logout() {
    localStorage.removeItem("user");
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  async getCurrentUser() {
    let user = Auth.getUser();
    let response = await Service.get("/currentUser", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  },
  async updateInfo(formData) {
    let user = Auth.getUser();
    await Service.patch("updateInfo", formData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  },
  async updateProfilePicture(formData) {
    let user = Auth.getUser();
    await Service.patch("/updateProfilePicture", formData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  },
  async updatePassword(current_password, new_password) {
    let user = Auth.getUser();
    await Service.patch(
      "/updatePassword",
      {
        current_password: current_password,
        new_password: new_password,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
  },
  async getProfilePic() {
    let user = Auth.getUser();
    let response = await Service.get("/getProfilePic", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data.profile_picture;
  },
  async addWallet(metamask_wallet) {
    let user = Auth.getUser();
    await Service.patch(
      "/addWalletAddress",
      {
        metamask_wallet: metamask_wallet,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
  },
};

export { Auth };
