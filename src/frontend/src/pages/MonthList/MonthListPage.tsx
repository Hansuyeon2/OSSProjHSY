import MainHeader from "@pages/Main/components/MainHeader";
import * as S from "./MonthListPage_styled";
import { useMainCalendar } from "@pages/Main/hooks/useMainCalendar";
import FlexLayout from "@layouts/FlexLayout";
import MonthListContent from "./components/MonthListContent";

const MonthListPage = () => {
  const { today, calendarData } = useMainCalendar();

  return (
    <FlexLayout>
      <S.AnalysisListWrapper>
        <MainHeader
          today={today}
          monthEmotion={calendarData.month_main_emotion || null}
        />
        <MonthListContent />
      </S.AnalysisListWrapper>
    </FlexLayout>
  );
};

export default MonthListPage;
