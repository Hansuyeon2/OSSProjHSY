import { useEffect, useState } from "react";
import DiaryLayout from "@layouts/DiaryLayout";
import { DiaryEntry, getDiaryAnalysis } from "@apis/diary/getDiaryAnalysis";
import Loading from "@components/Loading";
import { useNavigate } from "react-router-dom";
import TodayReportCard from "./components/TodayReportCard";
import TodayReportContent from "@layouts/TodayReportContetLayout";

const TodayReport = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const today = new Date().toISOString().split("T")[0];
      const data = await getDiaryAnalysis(today);
      if (data) setEntries(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Loading />;

  return (
    <DiaryLayout headerType="close" onCloseClick={() => navigate("/main")}>
      <TodayReportCard entries={entries} />
      <TodayReportContent
        title="우울한 감정에 어울리는 콘텐츠에요!"
        des="콘텐츠를 클릭해서 쿼디의 추천을 확인해보세요!"
      />
    </DiaryLayout>
  );
};

export default TodayReport;
