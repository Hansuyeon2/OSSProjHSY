import * as s from "./MonthReportPage_styled";
import MonthReportHeader from "./components/MonthReportHeader";
import MonthReportCard from "./components/MonthReportCard";

const MonthReportPage = () => {
  return (
    <s.MontReportWrapper>
      <MonthReportHeader />
      <MonthReportCard />
    </s.MontReportWrapper>
  );
};

export default MonthReportPage;
