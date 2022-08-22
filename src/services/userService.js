import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:5000/auth",
  timeout: 1000
});

let Auth = {
  async login(email, password) {
    let response = await Service.post("/login", {
      email: email,
      password: password
    });

    let user = response.data;

    localStorage.setItem("user", JSON.stringify(user));

    return true;
  },
  async register(name, profile_picture, email, password, location) {
    const locationSplit = location.split(",");
    const city = locationSplit[0];
    const country = locationSplit[1].trim();

    const prof = " ";
    let response = await Service.post("/register", {
      name: name,
      profile_picture: prof,
      email: email,
      password: password,
      city: city,
      country: country
    });

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
      headers: { "Authorization": `Bearer ${user.token}` }
    });
    return response.data;
  }
};

export { Auth };
