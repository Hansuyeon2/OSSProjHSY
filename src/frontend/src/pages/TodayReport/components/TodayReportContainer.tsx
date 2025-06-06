import styled from "styled-components";
import TodayReportContent from "@layouts/TodayReportContetLayout";
import Btn from "@components/Button";
import { fonts } from "@styles/fonts";
import { useNavigate } from "react-router-dom";
import { DiaryEntry } from "@apis/diary/getDiaryAnalysis";
// import TodayReportTitle from "./TodayReportNight/TodayReportTitle";
import TodayContentRecommendation from "./TodayContentRecommendation";

interface TodayReportContainerProps {
  entry: DiaryEntry;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const TodayReportContainer = ({ entry }: TodayReportContainerProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <TodayReportContent
        title={`${entry.main_emotion} 감정에 어울리는 콘텐츠에요!`}
        des="콘텐츠를 클릭해서 쿼디의 추천을 확인해보세요!"
      >
        {entry.analysis && (
          <>
            {/* <TodayReportTitle
              title={`${entry.main_emotion} 감정에 어울리는 콘텐츠`}
            /> */}
            <TodayContentRecommendation
              analysisSets={[
                {
                  set: entry.analysis.set_1,
                  label: "set_1",
                },
                ...(entry.analysis.set_2
                  ? [
                      {
                        set: entry.analysis.set_2,
                        label: "set_2",
                      },
                    ]
                  : []),
              ]}
            />
          </>
        )}
      </TodayReportContent>

      <BottomSection>
        <Text>
          <img src="/images/icons/lock.png" />
          <p>오늘의 감정 바이오리듬은 00:00시에 공개돼요!</p>
        </Text>
        <Btn
          title="일기 쓰기"
          borderRadius="10px"
          onClick={() => navigate("/diary")}
        />
      </BottomSection>
    </Container>
  );
};

export default TodayReportContainer;

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  ${fonts.cap_s_12}
  color: ${({ theme }) => theme.colors.mainbrown01};

  img {
    width: 20px;
    height: 20px;
  }
`;
