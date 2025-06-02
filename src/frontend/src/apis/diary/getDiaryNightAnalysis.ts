// src/data/emotionAPI.ts
import { dummyDiaryAnalysisNight } from "@apis/dummy/dummyDiaryAnalysisNight";
import { getResponse } from "@apis/instance";

type Entry = {
  id: number;
  content: string;
  username: string;
  created_at: string;
  main_emotion: string;
  sub_emotion: string[];
};

export async function getDiaryNight(): Promise<Entry[]> {
  const res = await getResponse<{ entries: Entry[] }>(
    "/api/diary/?date=${date}"
  );
  if (res && res.entries) {
    return res.entries;
  } else {
    return dummyDiaryAnalysisNight.entries;
  }
}
