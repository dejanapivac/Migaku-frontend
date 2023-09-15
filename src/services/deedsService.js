import axios from "axios";
import { Auth } from "@/services/userService";

let Service = axios.create({
  baseURL: "http://localhost:5000/deeds",
  timeout: 5000,
});

let DeedsService = {
  async getNearbyDeeds() {
    let user = Auth.getUser();
    let response = await Service.get("/getNearbyDeeds", {
      headers: { Authorization: `Bearer ${user.token}` },
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
  async getAttendees(id) {
    let response = await Service.get(`/getAttendees/${id}`);
    return response.data;
  },
  async getReviewers(id) {
    let user = Auth.getUser();
    let response = await Service.get(`/getReviewers/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  },
  async attendEvent(id) {
    let user = Auth.getUser();
    let response = await Service.post(
      `/attendEvent/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if (response.data.success === "Added event attendant") {
      return true;
    } else if (response.data.success === "Not attending event") {
      return false;
    }
  },
  async isGoing(id) {
    let user = Auth.getUser();
    let response = await Service.get(`/isAttending/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (response.data.going === "true") {
      return true;
    } else {
      return false;
    }
  },
  async searchedCity(searched_city, country) {
    let response = await Service.get("/searchedCity", {
      params: {
        searched_city: searched_city,
        country: country,
      },
    });
    return response.data;
  },
  async addEvent(formData) {
    let user = Auth.getUser();

    let response = await Service.post("/add", formData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  },
  async completeEvent(id) {
    let user = Auth.getUser();
    let response = await Service.patch(
      `/complete/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if (response.data.success === "Deed completed.") {
      return true;
    } else {
      return false;
    }
  },
  async isCompleted(id) {
    let response = await Service.get(`/isCompleted/${id}`);
    if (response.data.completed === "true") {
      return true;
    } else {
      return false;
    }
  },
};

export { DeedsService };
