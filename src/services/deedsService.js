import axios from "axios";
import { Auth } from "@/services/userService";

let Service = axios.create({
  baseURL: "http://localhost:5000/deeds",
  timeout: 1000
});

let DeedsService = {
  async getNearbyDeeds() {
    let user = Auth.getUser();
    let response = await Service.get("/getNearbyDeeds", {
      headers: { "Authorization": `Bearer ${user.token}` }
    });
    return response.data;
  },
  async getAttendedDeeds(id) {
    let response = await Service.get(`/attended/${id}`);
    return response.data;
  },
  async getPostedDeeds(id) {
    let response = await Service.get(`/created/${id}`);
    return response.data;
  }
};

export { DeedsService };