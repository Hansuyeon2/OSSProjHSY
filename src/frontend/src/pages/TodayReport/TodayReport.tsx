import { useEffect, useState } from "react";
import DiaryLayout from "@layouts/DiaryLayout";
import { DiaryEntry, getDiaryAnalysis } from "@apis/diary/getDiaryAnalysis";
import Loading from "@components/Loading";
import { useNavigate } from "react-router-dom";
import TodayReportCard from "./components/TodayReportCard";
import TodayReportContent from "@layouts/TodayReportContetLayout";
import ContentCardCategoryList from "./components/ContentCardCategoryList";
import ContentCardList from "./components/ContentCardList";
import styled from "styled-components";

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

      console.log(data);
      if (data) {
        setEntries(data);
        setSelectedCategory("영화");
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <Loading />;

  const currentEntry = entries[currentIndex];

  const analysisSets = [
    {
      set: currentEntry.analysis.set_1,
      label: "set_1",
      mainEmotion: currentEntry.emotion,
    },
    ...(currentEntry.analysis.set_2
      ? [
          {
            set: currentEntry.analysis.set_2,
            label: "set_2",
            mainEmotion: currentEntry.emotion,
          },
        ]
      : []),
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <DiaryLayout headerType="close" onCloseClick={() => navigate("/main")}>
      <TodayReportCard
        entries={entries}
        onCardChange={(index) => setCurrentIndex(index)}
      />

      <TodayReportContent
        title={`${currentEntry.emotion}한 감정에 어울리는 콘텐츠에요!`}
        des="콘텐츠를 클릭해서 쿼디의 추천을 확인해보세요!"
      >
        <ContentCardCategoryList
          onSelect={handleCategoryChange}
          selected={selectedCategory}
        />
        <TodayReportCardContainer>
          {analysisSets.map((setItem, _) => {
            const categoryData =
              selectedCategory === "영화"
                ? setItem.set.movies
                : selectedCategory === "책"
                ? setItem.set.books
                : selectedCategory === "음악"
                ? setItem.set.music
                : setItem.set.exhibitions;

            return categoryData.length > 0 ? (
              <ContentCardList
                key={`${setItem.label}-${selectedCategory}`}
                analysis={setItem.set}
                category={selectedCategory}
              />
            ) : null;
          })}
        </TodayReportCardContainer>
      </TodayReportContent>
    </DiaryLayout>
  );
};

const TodayReportCardContainer = styled.section`
  width: 100%;
`;

export default TodayReport;
