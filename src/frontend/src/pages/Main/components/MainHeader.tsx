import * as S from "./MainHeader.styled";

const MainHeader = () => {
  return (
    <S.MainPageHeaderWrapper>
      <S.MainPageHeaderIcon src="/images/icons/MainHeaderIcon.svg" />
      <S.MainPageHeaderTitle>
        <p>4월</p>은 민영 님에게 어떤 달일까요?
      </S.MainPageHeaderTitle>
    </S.MainPageHeaderWrapper>
  );
};

export default MainHeader;
