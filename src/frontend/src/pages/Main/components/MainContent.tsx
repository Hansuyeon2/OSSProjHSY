import { fonts } from "@styles/fonts";
import styled from "styled-components";

const MainContent = ({
  date,
  content,
}: {
  date: string | null;
  content: string | null;
}) => {
  const today = new Date();
  const defaultDate = `${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(today.getDate()).padStart(2, "0")}`;

  return (
    <MainContentWrapper>
      <MainContentDate>{date || defaultDate}</MainContentDate>
      <MainContents>
        {content || "아직 작성된 일기가 없어요. 오늘의 하루를 기록해 주세요!"}
      </MainContents>
    </MainContentWrapper>
  );
};

const MainContentWrapper = styled.div`
  display: flex;
  gap: 9px;
  margin-top: 17px;
  width: 100%;
  margin-bottom: 9vh;
  align-items: center;
`;

const MainContentDate = styled.p`
  ${fonts.title_l_17}
  color: ${({ theme }) => theme.colors.mainbrown03};
`;

const MainContents = styled.p`
  ${fonts.cap_m_12};
  color: ${({ theme }) => theme.colors.mainbrown01};
`;

export default MainContent;
