import { dummyDiaryData } from "@apis/dummy/dummyDiaryAnalysis";
import { getResponse } from "@apis/instance";

// 각 감정 세트에 대한 콘텐츠 추천 타입
export type ContentSet = {
  title: string;
  movies: { title: string; sub: string }[];
  books: { title: string; sub: string }[];
  exhibitions: { title: string; sub: string }[];
  music: { title: string; sub: string }[];
};

// 각 일기에 대한 감정 분석 결과 포함 타입
export type DiaryEntry = {
  id: number;
  content: string;
  username: string;
  created_at: string;
  emotion: string;
  analysis: {
    set_1: ContentSet;
    set_2?: ContentSet;
  };
};

export type DiaryAPIResponse = {
  entries: DiaryEntry[];
};

export const getDiaryAnalysis = async (date: string): Promise<DiaryEntry[]> => {
  try {
    const response = await getResponse<DiaryAPIResponse>(
      `/api/diary/?date=${date}`
    );

    // 응답이 유효한 경우
    if (response && response.entries && Array.isArray(response.entries)) {
      return response.entries;
    } else {
      console.warn("API 응답이 예상과 다릅니다. 더미 데이터 사용.");
      return dummyDiaryData.entries;
    }
  } catch (error) {
    console.error("API 호출 오류:", error);
    console.warn("API 호출에 실패했습니다. 더미 데이터 사용.");
    return dummyDiaryData.entries;
  }
};
