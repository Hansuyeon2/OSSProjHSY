import * as S from "./MonthListCard_styled";
import MonthListCard from "./MonthListCard";
import { useEffect, useState } from "react";
import { dummyMonthListData } from "@apis/dummy/dummyMonthListData";
import { DiaryItem, getMonthListContent } from "@apis/monthReport/getMonthList";

const MonthListContent = () => {
  const [diaryList, setDiaryList] = useState<DiaryItem[]>([]);
  const year = 2025;
  const month = 6;

  useEffect(() => {
    const loadData = async () => {
      const data = await getMonthListContent(year, month);
      if (!data || data.length === 0) {
        setDiaryList(dummyMonthListData);
      } else {
        setDiaryList(data);
      }
    };

    loadData();
  }, [year, month]);

  return (
    <S.MonthListContentWrapper>
      {diaryList.map((item) => {
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
      })}
    </S.MonthListContentWrapper>
  );
};

export default MonthListContent;
