import { useEffect, useMemo, useState } from "react";
import { getCalendar } from "@apis/calendar/getCalendar";
import { CalendarDataType } from "@t/Calendar";

export const useMainCalendar = () => {
  const [today, setToday] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarDataType>({
    month_main_emotion: "",
    data: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalendar(today.getFullYear(), today.getMonth() + 1);
      setCalendarData(data);
    };
    fetchData();
  }, [today]);

  const { latestDate, latestContent } = useMemo(() => {
    const keys = Object.keys(calendarData.data || {});
    if (keys.length === 0) return { latestDate: null, latestContent: null };

    const latestKey = keys.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )[0];
    const date = new Date(latestKey);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}`;
    const content = calendarData.data?.[latestKey]?.content || null;

    return { latestDate: formattedDate, latestContent: content };
  }, [calendarData.data]);

  return {
    today,
    setToday,
    calendarData,
    latestDate,
    latestContent,
  };
};
