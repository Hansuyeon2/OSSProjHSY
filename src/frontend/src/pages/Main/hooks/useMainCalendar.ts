import { useEffect, useMemo, useState } from "react";
import { getCalendar } from "@apis/calendar/getCalendar";

export const useMainCalendar = () => {
  const [today, setToday] = useState(new Date());
  const [calendarData, setCalendarData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  //월이 바뀔 때만 calendarData 가져오도록
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getCalendar(
          today.getFullYear(),
          today.getMonth() + 1
        );
        const data = response?.data || response || {};
        setCalendarData(data);
      } catch (error) {
        console.error("캘린더 데이터 로딩 실패:", error);
        setCalendarData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [today.getFullYear(), today.getMonth()]);

  const todayEntry = useMemo(() => {
    if (isLoading) return null;

    const todayKey = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    console.log("tdt", todayKey);
    const entry = calendarData?.[todayKey];

    const formattedDate = `${today.getMonth() + 1}.${today.getDate()}`;
    return {
      date: formattedDate,
      content: entry?.content,
      id: entry?.id,
      created_at: entry?.created_at,
    };
  }, [calendarData, today, isLoading]);

  return {
    today,
    setToday,
    calendarData,
    todayEntry,
    isLoading,
  };
};
