// import FlexLayout from "@layouts/FlexLayout";

import MonthReportLayout from "@layouts/MonthReportLayout";
import MonthReportSection from "./components/MonthReportSection";
import MonthlyMainEmotionChart from "./components/MonthlyMainEmotionChart";
import { useEffect, useState } from "react";
import {
  getMonthlyReport,
  MonthlyReportResponse,
} from "@apis/monthReport/getMonthReportDetail";
import { useLocation } from "react-router-dom";

const MonthReportDetailPage = () => {
  const [data, setData] = useState<MonthlyReportResponse | null>(null);
  const location = useLocation();
  const { year, month } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMonthlyReport(year, month);
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) return null;

  // 가장 많이 나온 감정 찾기
  const mainEmotion = Object.entries(data.main_emotion).reduce(
    (acc, [emotion, count]) => {
      return count > data.main_emotion[acc] ? emotion : acc;
    },
    Object.keys(data.main_emotion)[0]
  );

  return (
    <MonthReportLayout month={month} emotion={mainEmotion}>
      <MonthReportSection
        title="한 눈에 보는 감정 분포"
        sub={`${month}월의 감정을 확인해 보세요.`}
      >
        <MonthlyMainEmotionChart data={data.main_emotion} />
      </MonthReportSection>
    </MonthReportLayout>
  );
};

export default MonthReportDetailPage;
