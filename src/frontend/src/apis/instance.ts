import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 1000,
  withCredentials: false,
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access");

  // 인증이 필요 없는 URL이면 Authorization 헤더 제거
  const publicPaths = ["/auth/signup/", "/auth/login/"];
  const isPublicPath = publicPaths.some((path) => config.url?.includes(path));

  if (!isPublicPath && access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

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
