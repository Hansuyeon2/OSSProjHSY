import FlexLayout from "@layouts/FlexLayout";
import MainCalendar from "./components/MainCalendar";
import MainHeader from "./components/MainHeader";
import Separator from "src/components/separator";
import Btn from "src/components/Button";
import MainContent from "./components/MainContent";
import { useMainCalendar } from "./hooks/useMainCalendar";

const Mainpage = () => {
  const { today, setToday, calendarData, latestDate, latestContent } =
    useMainCalendar();

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
