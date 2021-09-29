import axios from "axios";

export const key = "4c105cf684fccd3023ce1da30cede4b5";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
