import { postResponse } from "@apis/instance";

interface DiaryPostRequest {
  content: string;
}

interface DiaryPostResponse {
  id: number;
  content: string;
  username: string;
  created_at: string;
  emotion: string;
}

export const postDiary = (content: string) => {
  return postResponse<DiaryPostRequest, DiaryPostResponse>("/api/diary/", {
    content,
  });
};
