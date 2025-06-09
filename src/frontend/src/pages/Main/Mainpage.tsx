import FlexLayout from "@layouts/FlexLayout";
import MainCalendar from "./components/MainCalendar";
import MainHeader from "./components/MainHeader";
import Separator from "src/components/separator";
import Btn from "src/components/Button";
import MainContent from "./components/MainContent";
import { useMainCalendar } from "./hooks/useMainCalendar";
import { useNavigate } from "react-router-dom";

const Mainpage = () => {
  const navigate = useNavigate();
  const { today, setToday, calendarData, todayEntry } = useMainCalendar();
  console.log("1", today);
  console.log("2", setToday);
  console.log("3", calendarData);
  console.log("4", todayEntry);

  return (
    <FlexLayout>
      <MainHeader
        today={today}
        setToday={setToday}
        monthEmotion={calendarData.month_main_emotion || null}
      />
      <MainCalendar
        today={today}
        setToday={setToday}
        calendarData={calendarData}
      />
      <Separator />
      <MainContent
        date={todayEntry?.date || ""}
        content={todayEntry?.content}
        id={todayEntry?.id || ""}
        created_at={todayEntry?.created_at}
      />
      <Btn
        title="일기 쓰기"
        borderRadius="10px"
        onClick={() => navigate("/diary")}
      />
    </FlexLayout>
  );
};

export default Mainpage;
