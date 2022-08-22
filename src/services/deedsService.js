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
  },
  async searchedCity(searched_city, country) {
    let response = await Service.get("/searchedCity", {
      params: {
        searched_city: searched_city,
        country: country
      }
    });
    console.log(response.data);
    return (response.data);
  },
  async addEvent(image, name, category, street, zipCode, city, country, start_time, description) {
    let user = Auth.getUser();
    const eventPicture = " ";

    let response = await Service.post("/add", {
        image: eventPicture,
        name: name,
        category: category,
        street: street,
        zipCode: zipCode,
        city: city,
        country: country,
        start_time: start_time,
        description: description
      },
      {
        headers: { "Authorization": `Bearer ${user.token}` }
      });
    return response.data;
  },
  async completeEvent(id) {
    let user = Auth.getUser();
    let response = await Service.patch(`/complete/${id}`, {}, {
      headers: { "Authorization": `Bearer ${user.token}` }
    });
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
  }
};

export { DeedsService };