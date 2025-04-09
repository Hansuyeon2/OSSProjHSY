import { AuthRequest, LoginResponse } from "./_interface";
import { postResponse } from "@apis/instance";

export const PostLogin = async (
  data: AuthRequest
): Promise<LoginResponse | null> => {
  return await postResponse<AuthRequest, LoginResponse>("/auth/login", data);
};
