import * as S from "./MonthListCard_styled";

const MonthListCard = () => {
  return (
    <S.MonthListCardWrapper>
      <S.MonthListHeaderSection>
        <S.MonthListHeaderImg src="/images/character/happy.png" />
        <S.MonthListHeaderText>
          <p className="date">17일</p>
          <p className="emotion">#행복함</p>
        </S.MonthListHeaderText>
      </S.MonthListHeaderSection>
      <S.MonthListText>
        오늘은 수업이 일찍 끝나서 너무 행복한 날이당 ㅎㅎ 그래서 하루가 유난히
        여유롭게 느껴졌다. 햇살도 포근하고 바람도 살랑살랑 불어서 그냥 집에 가기
        아쉬운 날씨였다. 그래서 무작정...
      </S.MonthListText>
    </S.MonthListCardWrapper>
  );
};

export default MonthListCard;
