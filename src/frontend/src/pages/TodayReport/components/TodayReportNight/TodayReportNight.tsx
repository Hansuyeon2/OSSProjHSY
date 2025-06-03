import TodayReportContent from "@layouts/TodayReportContetLayout";
import * as S from "./TodayReportNight_styled";
import Separator from "@components/separator";
import TodayReportTitle from "./TodayReportTitle";
import EmotionGraph from "./TodayReportGraph/TodayBio";
import TodayTip from "./TodayTip";
import { useEffect, useState } from "react";
import {
  DiaryNightResponse,
  getDiaryNight,
} from "@apis/diary/getDiaryNightAnalysis";
import TodayEmotion from "./TodayReportGraph/TodayEmotion";
import TodayContentRecommendation from "../TodayContentRecommendation";

const TodayReportNight = () => {
  const [entries, setEntries] = useState<
    { created_at: string; main_emotion: string }[]
  >([]);
  const [emotion, setEmotion] = useState<{
    main_emotion: string;
    comment: string;
    sub_emotion: Record<string, number>;
  }>();
  const [analysis, setAnalysis] = useState<DiaryNightResponse["analysis"]>();

  useEffect(() => {
    getDiaryNight().then((data) => {
      const sorted = data.entries.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      setEntries(sorted);
      setEmotion(data.emotion);
      setAnalysis(data.analysis);
    });
  }, []);

  return (
    <TodayReportContent title={`민영님의 어제 감정을 분석해봤어요!`}>
      <Separator />
      <S.TodayReportNightWrapper>
        <S.TodayReportCardSection>
          {/* 하루 바이오리듬 그래프 */}
          <S.TodayReportCardContainer>
            <TodayReportTitle title="어제 하루의 바이오리듬" />
            <EmotionGraph data={entries} />
          </S.TodayReportCardContainer>

          {/* 쿼디의 팁 */}
          <S.TodayReportCardContainer>
            <TodayReportTitle title="민영 님을 위한 쿼디의 Tip!" />
            <TodayTip
              text="오늘 민영 님은 00이를 만났을 때 기분이 안 좋으셨군요... 00이랑 잘 안 맞으신가봐요..
이럴 때는 좋은 카페에 가서 맛있는 디저트 먹으면서 힐링하는 게 제일 좋지 않을까요?
쿼디가 추천해요!!!!!!!"
            />
          </S.TodayReportCardContainer>

          {/* 도넛 차트 */}
          {emotion?.sub_emotion && (
            <S.TodayReportCardContainer>
              <TodayReportTitle title="어제 민영 님의 감정은..." />
              <TodayEmotion
                subEmotionData={emotion.sub_emotion}
                comment={emotion.comment}
              />
            </S.TodayReportCardContainer>
          )}

          {/* 콘텐츠 추천 */}
          {analysis && (
            <S.TodayReportCardContainer>
              <TodayReportTitle title="어제 감정에 어울리는 콘텐츠" />
              <TodayContentRecommendation
                analysisSets={[
                  {
                    set: analysis.set_1,
                    label: "set_1",
                  },
                  ...(analysis.set_2
                    ? [
                        {
                          set: analysis.set_2,
                          label: "set_2",
                        },
                      ]
                    : []),
                ]}
              />
            </S.TodayReportCardContainer>
          )}
        </S.TodayReportCardSection>
      </S.TodayReportNightWrapper>
    </TodayReportContent>
  );
};

export default TodayReportNight;
