// src/api/diary.ts

import { getResponse } from "@apis/instance";

export interface DiaryItem {
  id: number;
  content: string;
  created_at: string;
  main_emotion: string;
}

export const getMonthListContent = async (
  year: number,
  month: number
): Promise<DiaryItem[] | null> => {
  const url = `/api/diary/list/?year=${year}&month=${month
    .toString()
    .padStart(2, "0")}`;
  return await getResponse<DiaryItem[]>(url);
};
