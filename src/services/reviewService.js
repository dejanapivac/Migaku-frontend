import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:5000/reviews",
  timeout: 1000
});

let ReviewsService = {
  async getReviews(id) {
    let response = await Service.get(`/get/${id}`);
    return response.data;
  }
};

export { ReviewsService };