import * as S from "./MonthListCard_styled";
import MonthListCard from "./MonthListCard";

const MonthListContent = () => {
  return (
    <S.MonthListContentWrapper>
      <MonthListCard />
      <MonthListCard />
      <MonthListCard />
      <MonthListCard />
      <MonthListCard />
      <MonthListCard />
      <MonthListCard />
    </S.MonthListContentWrapper>
  );
};

export default MonthListContent;
