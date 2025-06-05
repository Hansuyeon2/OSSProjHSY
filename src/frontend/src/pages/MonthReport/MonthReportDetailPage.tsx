// import FlexLayout from "@layouts/FlexLayout";

import MonthReportLayout from "@layouts/MonthReportLayout";
import MonthReportSection from "./components/MonthReportSection";

const MonthReportDetailPage = () => {
  return (
    <MonthReportLayout month={5} emotion="행복함">
      <MonthReportSection
        title="한 눈에 보는 감정 분포"
        sub="5월의 감정을 확인해 보세요."
      >
        hi
      </MonthReportSection>
    </MonthReportLayout>
  );
};

export default MonthReportDetailPage;
