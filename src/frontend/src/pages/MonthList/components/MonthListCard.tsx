import emotionToImg from "src/utils/emotionToImg";
import * as S from "./MonthListCard_styled";
import { useNavigate } from "react-router-dom";

interface MonthListProps {
  id: number;
  date: string;
  emotion: string;
  content: string;
}

const MonthListCard = ({ id, date, emotion, content }: MonthListProps) => {
  const emotionImgSrc = emotionToImg[emotion] || "/images/icons/happy.svg";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/todayReport/${id}`);
  };

  return (
    <S.MonthListCardWrapper onClick={handleClick}>
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
