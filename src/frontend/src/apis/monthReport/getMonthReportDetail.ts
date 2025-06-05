import { dummyMonthReportDetail } from "@apis/dummy/dummyMonthReportDetail";
import { getResponse } from "@apis/instance";

export interface MonthlyReportResponse {
  year: number;
  month: number;
  main_emotion: Record<string, number>;
  sub_emotion: Record<string, number>;
  weekly_emotion: Record<string, string>;
}

export async function getMonthlyReport(
  year: number,
  month: number
): Promise<MonthlyReportResponse> {
  try {
    const res = await getResponse<MonthlyReportResponse>(
      `/api/report/${year}/${month}`
    );

    if (res) {
      return res;
    } else {
      return dummyMonthReportDetail;
    }
  } catch (error) {
    console.error("월간 리포트 데이터 get 에러", error);

    return dummyMonthReportDetail;
  }
}
