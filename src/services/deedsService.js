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
  },
  async getAttendands(id) {
    let response = await Service.get(`/getAttendees/${id}`);
    return response.data;
  },
  async attendEvent(id) {
    let user = Auth.getUser();
    let response = await Service.post(`/attendEvent/${id}`, {}, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    if (response.data.success === "Added event attendant") {
      return true;
    } else if (response.data.success === "Not attending event") {
      return false;
    }
  },
  async isGoing(id) {
    let user = Auth.getUser();
    let response = await Service.get(`/isAttending/${id}`, {
      headers: { "Authorization": `Bearer ${user.token}` }
    });
    if (response.data.going === "true") {
      return true;
    } else {
      return false;
    }
  }
};

export { DeedsService };