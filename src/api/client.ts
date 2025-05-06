import axios from "axios";

const baseURL =
  import.meta.env.VITE_APP_NODE === "development"
    ? "https://test"
    : "https://us2earth.click/";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
