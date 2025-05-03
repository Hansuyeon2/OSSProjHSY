import Separator from "@components/separator";
import * as S from "./TodayReportContetLayout_styled";

interface todayReportProps {
  title: string;
  des?: string;
}

const TodayReportContent = ({ title, des }: todayReportProps) => {
  return (
    <S.TodayReportContentWrapper>
      <S.TodayReportContentHeader>
        <S.TodayReportContentIcon src="/images/icons/reportIcon.png" />
        <S.TodayReportContentTitle>{title}</S.TodayReportContentTitle>
        <S.TodayReportContentDes>{des}</S.TodayReportContentDes>
        <Separator />
      </S.TodayReportContentHeader>
    </S.TodayReportContentWrapper>
  );
};
export default TodayReportContent;
