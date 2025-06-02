import * as s from "./TodayReportNight_styled";

type TodayTipProps = {
  text: string;
};

const TodayTip = ({ text }: TodayTipProps) => {
  return (
    <s.TodayTipWrapper>
      <s.TodayTipContainer>{text}</s.TodayTipContainer>
    </s.TodayTipWrapper>
  );
};

export default TodayTip;
