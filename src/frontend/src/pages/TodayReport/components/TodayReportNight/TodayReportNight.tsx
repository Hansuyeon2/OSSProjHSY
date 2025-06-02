import TodayReportContent from "@layouts/TodayReportContetLayout";
import * as S from "./TodayReportNight_styled";
import Separator from "@components/separator";
import TodayReportTitle from "./TodayReportTitle";
import EmotionGraph from "./TodayReportGraph/TodayBio";
import TodayTip from "./TodayTip";

const TodayReportNight = () => {
  return (
    <TodayReportContent title={`민영님의 어제 감정을 분석해봤어요!`}>
      <Separator />
      <S.TodayReportNightWrapper>
        <S.TodayReportCardSection>
          <TodayReportTitle title="어제 하루의 바이오리듬" />
          <EmotionGraph />
          <TodayReportTitle title="민영 님을 위한 쿼디의 Tip!" />
          <TodayTip
            text="오늘 민영 님은 00이를 만났을 때 기분이 안 좋으셨군요... 00이랑 잘 안 맞으신가봐요..
이럴 때는 좋은 카페에 가서 맛있는 디저트 먹으면서 힐링하는 게 제일 좋지 않을까요?
쿼디가 추천해요!!!!!!!"
          />
        </S.TodayReportCardSection>
      </S.TodayReportNightWrapper>
    </TodayReportContent>
  );
};

export default TodayReportNight;
