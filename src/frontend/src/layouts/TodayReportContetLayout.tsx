import * as S from "./TodayReportContetLayout_styled";

interface todayReportProps {
  title: string;
  des?: string;
  children?: React.ReactNode;
}

const TodayReportContent = ({ title, des, children }: todayReportProps) => {
  return (
    <S.TodayReportContentWrapper>
      <S.TodayReportContentHeader>
        <S.TodayReportContentIcon src="/images/icons/reportIcon.png" />
        <S.TodayReportContentTitle>{title}</S.TodayReportContentTitle>
        <S.TodayReportContentDes>{des}</S.TodayReportContentDes>
        {children}
      </S.TodayReportContentHeader>
    </S.TodayReportContentWrapper>
  );
};
export default TodayReportContent;
