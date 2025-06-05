import Separator from "@components/separator";
import { fonts } from "@styles/fonts";
import styled from "styled-components";

interface MonthReportWordCloudProps {
  month: number;
  user: string;
  emotion: { [emotion: string]: number };
}

const MonthReportWordCloud = ({
  month,
  user,
  emotion,
}: MonthReportWordCloudProps) => {
  // 가장 많은 순서대로 정렬된 감정 키워드 6개
  const sortedEmotions = Object.entries(emotion)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([emotion]) => emotion);

  return (
    <MonthReportWordCloudWrapper>
      <MonthReportWordCloudTop>
        {sortedEmotions.map((word, index) => (
          <p key={word} className={`num${index + 1}`}>
            {word}
          </p>
        ))}
      </MonthReportWordCloudTop>
      <Separator />
      <MonthReportWordCloudText>
        {month}월, {user} 님이 일기를 작성하며 가장 많이 사용한 단어들을
        키워드로 모았어요. <span>"{sortedEmotions[0]}"</span>,{" "}
        <span>"{sortedEmotions[1]}"</span> 등의 단어를 많이 사용하는 것으로
        나타났어요
      </MonthReportWordCloudText>
      <MonthReportWordCloudImg src="/images/report/monthReportWordCloudImg.png" />
    </MonthReportWordCloudWrapper>
  );
};

const MonthReportWordCloudWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: relative;
  margin-bottom: 112px;
`;

const MonthReportWordCloudTop = styled.section`
  position: relative;
  width: 260px;
  height: 129px;
  margin-bottom: 33px;

  p {
    position: absolute;
    ${fonts.title_b_24}
    color: ${({ theme }) => theme.colors.mainbrown01}
  }

  .num1 {
    left: 50px;
  }

  .num2 {
    top: 50px;
  }

  .num3 {
    right: 10px;
    top: 70px;
  }

  .num4 {
    left: 80px;
    bottom: 0px;
    ${fonts.title_l_20}
    color: ${({ theme }) => theme.colors.mainbrown03}
  }

  .num5 {
    left: 120px;
    top: 40px;
    ${fonts.title_l_20}
    color: ${({ theme }) => theme.colors.mainbrown03}
  }

  .num6 {
    right: 0px;
    top: 20px;
    ${fonts.title_l_20}
    color: ${({ theme }) => theme.colors.mainbrown03}
  }
`;

const MonthReportWordCloudText = styled.p`
  margin-top: 22px;
  ${fonts.body_s_14}

  span {
    ${fonts.body_extra_14_}
  }
`;

const MonthReportWordCloudImg = styled.img`
  width: 400px;
  height: 125px;
  position: absolute;
  top: 265px;
`;

export default MonthReportWordCloud;
