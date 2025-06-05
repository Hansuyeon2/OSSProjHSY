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
import { userAtom } from "src/atoms/authAtoms";
import { useAtom } from "jotai";
import MonthReportWordCloud from "./components/MonthReportWordcloud";
import MonthBio from "./components/MonthBio";

const MonthReportDetailPage = () => {
  const [data, setData] = useState<MonthlyReportResponse | null>(null);
  const location = useLocation();
  const { year, month } = location.state;
  const [user] = useAtom(userAtom);

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
      <MonthReportSection
        title={`${user.username} 님의 ${month}월 키워드`}
        sub="한 달동안 느낀 다양한 감정을 돌아보세요."
        noPadding
      >
        <MonthReportWordCloud
          user={user.username}
          month={month}
          emotion={data.sub_emotion}
        />
      </MonthReportSection>
      <MonthReportSection
        title={`${month}의 감정 그래프`}
        sub="평균 감정의 변화를 살펴보세요."
        noPadding
        isWeek
      >
        <MonthBio weekly_emotion={data.weekly_emotion} />
      </MonthReportSection>
    </MonthReportLayout>
  );
};

export default MonthReportDetailPage;
