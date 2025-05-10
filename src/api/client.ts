import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://us2earth.click",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
