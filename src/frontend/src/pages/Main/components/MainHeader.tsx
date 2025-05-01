import * as S from "./MainHeader.styled";

const MainHeader = ({
  today,
  monthEmotion,
}: {
  today: Date;
  monthEmotion: string | null;
}) => {
  const month = today.getMonth() + 1;

  return (
    <S.MainPageHeaderWrapper>
      <S.MainPageHeaderIcon src="/images/icons/MainHeaderIcon.svg" />
      <S.MainPageHeaderTitle>
        <p>{month}월</p> 은{" "}
        {monthEmotion
          ? `${monthEmotion}이 가득한 달이었네요!`
          : "민영 님에게 어떤 달일까요?"}
      </S.MainPageHeaderTitle>
    </S.MainPageHeaderWrapper>
  );
};

export default MainHeader;
