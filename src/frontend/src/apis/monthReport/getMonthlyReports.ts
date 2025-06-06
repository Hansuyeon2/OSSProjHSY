import { getResponse } from "@apis/instance";

export interface Report {
  month: number;
  emotion: string;
}

export interface DiaryItem {
  year: number;
  reports: Report[];
}

export const getMonthlyReports = async (
  year: number
): Promise<DiaryItem | null> => {
  const url = `/api/report/?year=${year}`;
  return await getResponse<DiaryItem>(url);
};
