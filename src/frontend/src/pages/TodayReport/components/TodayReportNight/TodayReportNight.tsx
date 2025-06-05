import TodayReportContent from "@layouts/TodayReportContetLayout";
import * as S from "./TodayReportNight_styled";
import Separator from "@components/separator";
import TodayReportTitle from "./TodayReportTitle";
import EmotionGraph from "./TodayReportGraph/TodayBio";
import TodayTip from "./TodayTip";
import TodayEmotion from "./TodayReportGraph/TodayEmotion";
import TodayContentRecommendation from "../TodayContentRecommendation";
import { useAtom } from "jotai";
import { userAtom } from "src/atoms/authAtoms";
import { DiaryNightResponse } from "@apis/diary/getDiaryNightAnalysis";

interface TodayReportNightProps {
  entries: DiaryNightResponse["entries"];
  emotion: DiaryNightResponse["emotion"];
  analysis: DiaryNightResponse["analysis"];
}

const TodayReportNight = ({
  entries,
  emotion,
  analysis,
}: TodayReportNightProps) => {
  const sortedEntries = [...entries].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const [user] = useAtom(userAtom);

  return (
    <TodayReportContent
      title={`${user?.username}님의 어제 감정을 분석해봤어요!`}
    >
      <Separator />
      <S.TodayReportNightWrapper>
        <S.TodayReportCardSection>
          {/* 하루 바이오리듬 그래프 */}
          <S.TodayReportCardContainer>
            <TodayReportTitle title="어제 하루의 바이오리듬" />
            <EmotionGraph data={sortedEntries} />
          </S.TodayReportCardContainer>

          {/* 쿼디의 팁 */}
          <S.TodayReportCardContainer>
            <TodayReportTitle
              title={`${user?.username} 님을 위한 쿼디의 Tip!`}
            />
            <TodayTip text={emotion.comment} />
          </S.TodayReportCardContainer>

          {/* 도넛 차트 */}
          {emotion?.sub_emotion && (
            <S.TodayReportCardContainer>
              <TodayReportTitle
                title={`어제 ${user?.username} 님의 감정은...`}
              />
              <TodayEmotion
                username={user?.username}
                subEmotionData={emotion.sub_emotion}
                emotion1={emotion.main_emotion}
                emotion2={
                  Object.entries(emotion.sub_emotion).sort(
                    (a, b) => b[1] - a[1]
                  )[0]?.[0] || ""
                }
                emotion3={
                  Object.entries(emotion.sub_emotion).sort(
                    (a, b) => b[1] - a[1]
                  )[1]?.[0] || ""
                }
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
