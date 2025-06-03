import * as s from "./MonthReportPage_styled";
import MonthReportHeader from "./components/MonthReportHeader";
import MonthReportCardList from "./components/MonthReportCardList";

const MonthReportPage = () => {
  return (
    <s.MontReportWrapper>
      <MonthReportHeader />
      <MonthReportCardList />
    </s.MontReportWrapper>
  );
};

export default MonthReportPage;
