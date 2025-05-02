import Separator from "@components/separator";
import * as S from "./TodayReportContetLayout_styled";

interface todayReportProps {
  title: string;
}

const TodayReportContent = ({ title }: todayReportProps) => {
  return (
    <S.TodayReportContentWrapper>
      <S.TodayReportContentHeader>
        <S.TodayReportContentIcon src="/images/icons/reportIcon.png" />
        <S.TodayReportContentTitle>{title}</S.TodayReportContentTitle>
        <Separator />
      </S.TodayReportContentHeader>
    </S.TodayReportContentWrapper>
  );
};
export default TodayReportContent;
