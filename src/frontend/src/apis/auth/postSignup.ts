import { postResponse } from "@apis/instance";
import { AuthRequest, SignupResponse } from "./_interface";

export const postSignup = async (
  data: AuthRequest
): Promise<SignupResponse | null> => {
  return await postResponse<AuthRequest, SignupResponse>(
    "/api/auth/signup/",
    data
  );
};
