// src/apis/diary/getDiaryNightAnalysis.ts
import { getResponse } from "@apis/instance";
import { dummyDiaryAnalysisNight } from "@apis/dummy/dummyDiaryAnalysisNight";

// ✅ 타입 정의 함께 포함
type Entry = {
  id: number;
  content: string;
  username: string;
  created_at: string;
  main_emotion: string;
  sub_emotion: string[];
};

type MediaItem = {
  title: string;
  sub: string;
  url: string;
};

type Emotion = {
  main_emotion: string;
  comment: string;
  sub_emotion: Record<string, number>;
};

export type DiaryNightResponse = {
  entries: Entry[];
  analysis: {
    set_1: {
      title: string;
      movies: MediaItem[];
      books: MediaItem[];
      music: MediaItem[];
      exhibitions: MediaItem[];
    };
    set_2?: {
      title: string;
      movies: MediaItem[];
      books: MediaItem[];
      music: MediaItem[];
      exhibitions: MediaItem[];
    };
  };
  emotion: Emotion;
};

export async function getDiaryNight(): Promise<DiaryNightResponse> {
  const res = await getResponse<DiaryNightResponse>("/api/diary/?date=${date}");
  return res ?? dummyDiaryAnalysisNight;
}
