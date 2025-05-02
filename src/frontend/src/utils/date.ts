export const getFormatToday = (
  dateStr?: string,
  format: "full" | "short" = "full"
): string => {
  const date = dateStr ? new Date(dateStr) : new Date();

  // 한국 시간(UTC+9)으로 변환
  const koreaOffset = 9 * 60;
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + koreaOffset);

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const dayNum = String(date.getDate()).padStart(2, "0");
  const day = days[date.getDay()];

  if (format === "short") {
    return `${month}월 ${dayNum}일 ${day}요일`;
  }

  return `${year}년 ${month}월 ${dayNum}일 ${day}요일`;
};
