import { useEffect, useMemo, useState } from "react";
import { getCalendar } from "@apis/calendar/getCalendar";

export const useMainCalendar = () => {
  const [today, setToday] = useState(new Date());
  const [calendarData, setCalendarData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCalendar(
        today.getFullYear(),
        today.getMonth() + 1
      );
      console.log("API 응답", response);
      setCalendarData(response.data || response);
    };
    fetchData();
  }, [today]);

  const todayEntry = useMemo(() => {
    const todayKey = today.toISOString().split("T")[0];
    const entry = calendarData[todayKey];

    const formattedDate = `${today.getMonth() + 1}.${today.getDate()}`;
    return {
      date: formattedDate,
      content: entry?.content || "오늘 작성된 일기가 없어요.",
    };
  }, [calendarData, today]);

  return {
    today,
    setToday,
    calendarData,
    todayEntry,
  };
};
