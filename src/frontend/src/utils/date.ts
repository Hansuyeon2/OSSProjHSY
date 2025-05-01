export const getFormatToday = (): string => {
  const today = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  const day = days[today.getDay()];

  return `${year}년 ${month}월 ${date}일 ${day}요일`;
};
