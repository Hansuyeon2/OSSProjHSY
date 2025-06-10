import * as s from "./styled";

interface MonthReportCardProps {
  month: number;
  emotion: string;
  onClick?: () => void;
}

const MonthReportCard = ({ month, emotion, onClick }: MonthReportCardProps) => {
  return (
    <s.MonthReportCardWrapper onClick={onClick}>
      <s.MonthReportCardImg src={`/images/report/reportBg.png`} />
      <s.MonthReportCardFooter>
        <s.MonthReportCardBookMark src="/images/report/bookmark.png" />
        <s.MonthReportCardFooterTitle>
          {month}월 감정리포트
        </s.MonthReportCardFooterTitle>
        <s.MonthReportCardFooterDes>
          {emotion}이 가득했던 {month}월의 일기
        </s.MonthReportCardFooterDes>
      </s.MonthReportCardFooter>
    </s.MonthReportCardWrapper>
  );
};

export default MonthReportCard;
