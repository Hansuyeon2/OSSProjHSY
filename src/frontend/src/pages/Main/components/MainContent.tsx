import { fonts } from "@styles/fonts";
import styled from "styled-components";

const MainContent = () => {
  return (
    <MainContentWrapper>
      <MainContentDate>4.17</MainContentDate>
      <MainContents>
        아직 작성된 일기가 없어요. 오늘의 하루를 기록해 주세요!
      </MainContents>
    </MainContentWrapper>
  );
};

const MainContentWrapper = styled.div`
  display: flex;
  gap: 9px;
  margin-top: 17px;
  width: 100%;
  margin-bottom: 30px;
  align-items: center;
`;

const MainContentDate = styled.p`
  ${fonts.body_m_14}
  color: ${({ theme }) => theme.colors.mainbrown03};
`;

const MainContents = styled.p`
  ${fonts.cap_m_12};
  color: ${({ theme }) => theme.colors.mainbrown01};
`;

export default MainContent;
