import { DiaryAPIResponse } from "@apis/diary/getDiaryAnalysis";

export const dummyDiaryData: DiaryAPIResponse = {
  entries: [
    {
      id: 1,
      content: "오늘은 기분이 좋아서 산책을 다녀왔다.",
      username: "username",
      created_at: "2025-04-02T12:00:00Z",
      emotion: "기쁨",
    },
    {
      id: 2,
      content: "오랜만에 친구와 만나서 즐거운 시간을 보냈다.",
      username: "username",
      created_at: "2025-04-02T19:00:00Z",
      emotion: "신남",
    },
    {
      id: 2,
      content: "오랜만에 친구와 만나서 즐거운 시간을 보냈다.",
      username: "username",
      created_at: "2025-04-02T19:00:00Z",
      emotion: "신남",
    },
  ],
  analysis: {
    movies: ["미키17", "파묘"],
    books: ["작별하지 않는다"],
    exhibitions: ["모네 특별전"],
    music: ["검정치마 - Love Shine", "백예린 - Square"],
  },
};
