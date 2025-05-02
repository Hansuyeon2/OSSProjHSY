import { dummyDiaryData } from "@apis/dummy/dummyDiaryAnalysis";
import { getResponse } from "@apis/instance";

export type DiaryEntry = {
  id: number;
  content: string;
  username: string;
  created_at: string;
  emotion: string;
};

export type DiaryAnalysis = {
  movies: string[];
  books: string[];
  exhibitions: string[];
  music: string[];
};

export type DiaryAPIResponse = {
  entries: DiaryEntry[];
  analysis: DiaryAnalysis;
};

export const getDiaryAnalysis = async (date: string): Promise<DiaryEntry[]> => {
  const response = await getResponse<DiaryAPIResponse>(
    `/api/diary/?date=${date}`
  );

  if (response && typeof response === "object") {
    return response.entries;
  } else {
    console.log("더미", dummyDiaryData.entries);
    console.warn("API 응답이 HTML이거나 유효하지 않음. 더미 데이터 사용.");
    return dummyDiaryData.entries;
  }
};

// if (!response) {
//   console.log("더미", dummyDiaryData.entries);
//   console.warn("API 연결 실패, 더미 데이터 사용");
//   return dummyDiaryData.entries;
// }

// return response.entries;
// };
