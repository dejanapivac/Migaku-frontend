import axios from "axios";
import { Auth } from "@/services/userService";

let Service = axios.create({
  baseURL: "http://localhost:5000/deed/comments",
  timeout: 1000
});

let CommentsService = {
  async getComments(id) {
    let response = await Service.get(`/get/${id}`);
    return response.data;
  },
  async addComment(id, comment) {
    let user = Auth.getUser();
    let response = await Service.post(`/add/${id}`, {
      comment: comment
    }, {
      headers: { "Authorization": `Bearer ${user.token}` }
    });
    return response.data;
  }
};

export { CommentsService };
