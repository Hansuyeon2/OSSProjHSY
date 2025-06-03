import * as S from "./MonthListCard_styled";
import MonthListCard from "./MonthListCard";
import { useEffect, useState } from "react";
import { DiaryItem, getMonthListContent } from "@apis/monthReport/getMonthList";

const MonthListContent = ({ year, month }: { year: number; month: number }) => {
  const [diaryList, setDiaryList] = useState<DiaryItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getMonthListContent(year, month);
      if (!data || data.length === 0) {
        setDiaryList([]);
      } else {
        setDiaryList(data);
      }
    };

    loadData();
  }, [year, month]);

  return (
    <S.MonthListContentWrapper>
      {diaryList.length === 0 ? (
        <p>작성된 일기가 없습니다.</p>
      ) : (
        diaryList.map((item) => {
          const date = new Date(item.created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          return (
            <MonthListCard
              key={item.id}
              id={item.id}
              date={date}
              emotion={item.main_emotion}
              content={item.content}
            />
          );
        })
      )}
    </S.MonthListContentWrapper>
  );
};

export default MonthListContent;
