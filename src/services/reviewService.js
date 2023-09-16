import axios from "axios";
import { Auth } from "@/services/userService";

let Service = axios.create({
  baseURL: "http://localhost:5000/reviews",
  timeout: 5000,
});

let ReviewsService = {
  async getReviews(id) {
    let response = await Service.get(`/get/${id}`);
    return response.data;
  },
  async getNotifications() {
    let user = Auth.getUser();
    let response = await Service.get("/notifications", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  },
  async addReview(grade, review, id, deed_id) {
    let user = Auth.getUser();
    let response = await Service.post(
      `/add/${id}`,
      {
        grade: grade,
        review: review,
        deed_id: deed_id,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    return response.data;
  },
};

export { ReviewsService };
