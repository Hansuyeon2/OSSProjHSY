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

// POST 요청
export const postResponse = async <TRequest, TResponse>(
  url: string,
  body: TRequest
): Promise<TResponse | null> => {
  try {
    const response = await instance.post<TResponse>(url, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// GET 요청
export const getResponse = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    console.error("API 요청 실패", error);
    console.log(error);
    return null;
  }
};
