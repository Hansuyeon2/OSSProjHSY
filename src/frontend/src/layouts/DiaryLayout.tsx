import styled from "styled-components";

// const DiaryLayout = ({ children }: { children?: React.ReactNode }) => {
const DiaryLayout = () => {
  return (
    <DiaryWrapper>
      <DiaryHeader>일기장</DiaryHeader>
      <DiarySpringLeft src="/images/diary/spring.svg" />
      <DiarySpringRight src="/images/diary/spring.svg" />
      <DiaryImgIcon src="/images/diary/diaryIcon.png" />
      <DiaryImgClover src="/images/diary/diaryclover.png" />
      <DiaryContent></DiaryContent>
    </DiaryWrapper>
  );
};

const DiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bgbeige01};
  background-image: repeating-linear-gradient(
      to bottom,
      #d8b18e80 0px,
      #d8b18e80 0.8px,
      transparent 0.8px,
      transparent 35px
    ),
    repeating-linear-gradient(
      to right,
      #d8b18e80 0px,
      #d8b18e80 0.8px,
      transparent 0.8px,
      transparent 32px
    );
  background-size: 32px 32px;
  overflow-y: hidden;
`;

const DiaryHeader = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.mainbrown02};
  height: 100px;
  color: ${({ theme }) => theme.colors.bgbeige02};
  display: flex;
  justify-content: center;
  align-items: center;

  //TODO: 디자인시스템 추가되면 변경
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: -0.5px;
`;

const DiaryContent = styled.section`
  flex: 1;
  padding: 24px;
`;

const DiarySpringLeft = styled.img`
  height: 24px;
  position: absolute;
  top: 90px;
  left: 40px;
`;

const DiarySpringRight = styled.img`
  height: 24px;
  position: absolute;
  top: 90px;
  right: 40px;
`;

const DiaryImgIcon = styled.img`
  width: 86.343px;
  height: 95.296px;
  position: absolute;
  top: 300px;
  left: -20px;
`;

const DiaryImgClover = styled.img`
  width: 36px;
  height: 38.441px;
  z-index: 1;
  position: absolute;
  top: 480px;
  right: 20px;
`;

export default DiaryLayout;
