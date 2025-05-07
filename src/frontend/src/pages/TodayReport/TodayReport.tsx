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
import Btn from "@components/Button";
import { fonts } from "@styles/fonts";

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
          {analysisSets.map((setItem) => {
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
      <TodayReportBottom>
        <TodayReportText>
          <img src="/images/icons/lock.png" />
          <p>오늘의 감정 바이오리듬은 00:00시에 공개돼요!</p>
        </TodayReportText>
        <Btn
          title="일기 쓰기"
          borderRadius="10px"
          onClick={() => navigate("/diary")}
        />
      </TodayReportBottom>
    </DiaryLayout>
  );
};

const TodayReportCardContainer = styled.section`
  width: 100%;
`;

const TodayReportText = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  ${fonts.cap_s_12}
  color: ${({ theme }) => theme.colors.mainbrown01};

  img {
    width: 20px;
    height: 20px;
  }
`;

const TodayReportBottom = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

export default TodayReport;
