import TodayReportContent from "@layouts/TodayReportContetLayout";
import * as S from "./TodayReportNight_styled";
import Separator from "@components/separator";
import TodayReportTitle from "./TodayReportTitle";
import EmotionGraph from "./TodayReportGraph/TodayBio";

const TodayReportNight = () => {
  return (
    <TodayReportContent title={`민영님의 어제 감정을 분석해봤어요!`}>
      <Separator />
      <S.TodayReportNightWrapper>
        <S.TodayReportCardSection>
          <TodayReportTitle title="어제 하루의 바이오리듬" />
          <EmotionGraph />
        </S.TodayReportCardSection>
      </S.TodayReportNightWrapper>
    </TodayReportContent>
  );
};

export default TodayReportNight;
