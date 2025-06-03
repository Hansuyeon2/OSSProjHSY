import FlexLayout from "@layouts/FlexLayout";
import * as s from "./MonthReportPage_styled";
import MonthReportHeader from "./components/MonthReportHeader";

const MonthReportPage = () => {
  return (
    <FlexLayout>
      <s.MontReportWrapper>
        <MonthReportHeader />
      </s.MontReportWrapper>
    </FlexLayout>
  );
};

export default MonthReportPage;
