import { useEffect, useState } from "react";
import DiaryLayout from "@layouts/DiaryLayout";
import { DiaryEntry, getDiaryAnalysis } from "@apis/diary/getDiaryAnalysis";
import Loading from "@components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import TodayReportCard from "./components/TodayReportCard";
import TodayReportContainer from "./components/TodayReportContainer";
import TodayReportNight from "./components/TodayReportNight/TodayReportNight";
import {
  DiaryNightResponse,
  getDiaryNight,
} from "@apis/diary/getDiaryNightAnalysis";

const TodayReport = () => {
  const { state } = useLocation();
  const { formattedDate } = state || {};
  const today = new Date().toLocaleDateString("sv-SE");

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("영화");
  const navigate = useNavigate();
  const [nightData, setNightData] = useState<DiaryNightResponse | null>(null);
  console.log("night", nightData);

  useEffect(() => {
    const loadData = async () => {
      if (!formattedDate) return;

      setLoading(true);

      if (formattedDate === today) {
        const allEntries = await getDiaryAnalysis(formattedDate);
        const filtered = allEntries.filter((entry) =>
          entry.created_at.startsWith(formattedDate)
        );
        setEntries(filtered);
      } else {
        const nightRes = await getDiaryNight(formattedDate);
        setNightData(nightRes);
      }

      setLoading(false);
    };

    loadData();
  }, [formattedDate]);

  useEffect(() => {
    if (entries.length === 0) return;

    const currentEntry = entries[currentIndex];
    const currentSet = currentEntry.analysis?.set_1;

    if (!currentSet) return; // ← set_1 없으면 스킵

    const categoryPriority = ["영화", "책", "음악", "공연"];
    const categoryMap: Record<string, any[]> = {
      영화: currentSet.movies,
      책: currentSet.books,
      음악: currentSet.music,
      공연: currentSet.exhibitions,
    };

    const firstAvailable = categoryPriority.find(
      (cat) => categoryMap[cat] && categoryMap[cat].length > 0
    );

    if (firstAvailable) {
      setSelectedCategory(firstAvailable);
    }
  }, [currentIndex, entries]);

  if (loading) return <Loading />;
  if (formattedDate === today && entries.length === 0)
    return <div>해당 날짜에 일기가 없습니다.</div>;

  const currentEntry = entries[currentIndex];
  console.log("ddd", currentEntry);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <DiaryLayout headerType="close" onCloseClick={() => navigate(-1)}>
      {formattedDate === today ? (
        <>
          <TodayReportCard
            entries={entries}
            onCardChange={(index) => setCurrentIndex(index)}
          />
          <TodayReportContainer
            entry={entries[currentIndex]}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </>
      ) : nightData ? (
        <>
          <TodayReportCard entries={nightData.entries} />
          <TodayReportNight
            entries={nightData.entries}
            emotion={nightData.emotion}
            analysis={nightData.analysis}
          />
        </>
      ) : (
        <div>분석 데이터를 불러올 수 없습니다.</div>
      )}
    </DiaryLayout>
  );
};
export default TodayReport;
