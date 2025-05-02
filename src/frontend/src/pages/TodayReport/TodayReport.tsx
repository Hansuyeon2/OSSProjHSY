import { useEffect, useState } from "react";
import DiaryLayout from "@layouts/DiaryLayout";
import { DiaryEntry, getDiaryAnalysis } from "@apis/diary/getDiaryAnalysis";
import Loading from "@components/Loading";
import TodayReportContent from "./components/TodayReportContent";

const TodayReport = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

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
    <DiaryLayout headerType="close">
      <TodayReportContent entries={entries} />
    </DiaryLayout>
  );
};

export default TodayReport;
