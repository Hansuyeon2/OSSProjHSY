import emotionToImg from "src/utils/emotionToImg";
import * as S from "./MonthListCard_styled";

interface MonthListProps {
  date: string;
  emotion: string;
  content: string;
}

const MonthListCard = ({ date, emotion, content }: MonthListProps) => {
  const emotionImgSrc = emotionToImg[emotion] || "/images/icons/happy.svg";

  return (
    <S.MonthListCardWrapper>
      <S.MonthListHeaderSection>
        <S.MonthListHeaderImg src={emotionImgSrc} />
        <S.MonthListHeaderText>
          <p className="date">{date}</p>
          <p className="emotion">#{emotion}</p>
        </S.MonthListHeaderText>
      </S.MonthListHeaderSection>
      <S.MonthListText>{content}</S.MonthListText>
    </S.MonthListCardWrapper>
  );
};

export default MonthListCard;
