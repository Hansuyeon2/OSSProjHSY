import dummyMainData from "@apis/dummy/dummyMainData";
import { getResponse } from "@apis/instance";
import { CalendarDataType } from "@t/Calendar";

export const getCalendar = async (
  year: number,
  month: number
): Promise<CalendarDataType> => {
  const paddedMonth = String(month).padStart(2, "0");

  const data = await getResponse<CalendarDataType>(
    `/api/diary/cal/?year=${year}&month=${paddedMonth}`
  );

  // if (data) {
  //   console.log(data);
  //   return data;
  // } else {
  //   console.warn("API 연결 실패: 더미 데이터 대체 ㄱㅂㅈㄱ");
  //   console.log(dummyMainData);
  //   return dummyMainData;
  // }

  if (data && typeof data === "object") {
    return data;
  } else {
    console.warn("API 응답이 HTML이거나 유효하지 않음. 더미 데이터 사용.");
    return dummyMainData;
  }
};
