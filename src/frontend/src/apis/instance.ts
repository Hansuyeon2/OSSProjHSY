import axios from "axios";

const instance = axios.create({
  baseURL: "추후백엔드주소로",
  timeout: 1000,
  withCredentials: false,
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access");
  config.headers["Authorization"] = `Bearer ${access_token}`;
  return config;
});
