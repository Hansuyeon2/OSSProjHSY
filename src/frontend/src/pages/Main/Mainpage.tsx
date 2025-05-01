import FlexLayout from "@layouts/FlexLayout";
import MainCalendar from "./components/MainCalendar";
import MainHeader from "./components/MainHeader";
import Separator from "src/components/separator";
import Btn from "src/components/Button";
import MainContent from "./components/MainContent";
import { useEffect, useMemo, useState } from "react";
import { getCalendar } from "@apis/calendar/getCalendar";
import { CalendarDataType } from "@t/Calendar";

const Mainpage = () => {
  const [today, setToday] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarDataType>({
    month_main_emotion: "",
    data: {},
  });

  const CalendarData = async (year: number, month: number) => {
    const data = await getCalendar(year, month);
    setCalendarData(data);
  };

  useEffect(() => {
    CalendarData(today.getFullYear(), today.getMonth() + 1);
  }, [today]);

  // 최신 날짜와 내용
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

  return (
    <FlexLayout>
      <MainHeader
        today={today}
        monthEmotion={calendarData.month_main_emotion || null}
      />
      <MainCalendar
        today={today}
        setToday={setToday}
        calendarData={calendarData.data || {}}
      />
      <Separator />
      <MainContent date={latestDate} content={latestContent} />
      <Btn title="일기 쓰기" borderRadius="10px" />
    </FlexLayout>
  );
};

export default Mainpage;
