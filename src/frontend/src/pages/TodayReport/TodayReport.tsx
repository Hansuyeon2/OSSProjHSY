import { useEffect, useState } from "react";
import DiaryLayout from "@layouts/DiaryLayout";
import { DiaryEntry, getDiaryAnalysis } from "@apis/diary/getDiaryAnalysis";
import Loading from "@components/Loading";
import { useNavigate } from "react-router-dom";
import TodayReportCard from "./components/TodayReportCard";
import TodayReportContainer from "./components/TodayReportContainer";
import TodayReportNight from "./components/TodayReportNight/TodayReportNight";

const TodayReport = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("영화");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const today = new Date().toISOString().split("T")[0];
      const data = await getDiaryAnalysis(today);

      if (data) {
        setEntries(data);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (entries.length === 0) return;

    const currentEntry = entries[currentIndex];
    const currentSet = currentEntry.analysis.set_1;

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

  const currentEntry = entries[currentIndex];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <DiaryLayout headerType="close" onCloseClick={() => navigate("/main")}>
      <TodayReportCard
        entries={entries}
        onCardChange={(index) => setCurrentIndex(index)}
      />

      {/* 위 content card */}

      {/* 밑 분석 report */}
      {/* <TodayReportContainer
        entry={currentEntry}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      /> */}
      <TodayReportNight />
    </DiaryLayout>
  );
};

export default TodayReport;
