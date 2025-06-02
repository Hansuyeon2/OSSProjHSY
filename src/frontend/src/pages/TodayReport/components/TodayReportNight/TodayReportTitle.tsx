import { fonts } from "@styles/fonts";
import styled from "styled-components";

interface TodayReportTitleProps {
  title: string;
}
const TodayReportTitle = ({ title }: TodayReportTitleProps) => {
  return (
    <TodayReportTitleSection>
      <img src="/images/icons/tag.png" />
      <p>{title}</p>
    </TodayReportTitleSection>
  );
};

const TodayReportTitleSection = styled.section`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  ${fonts.body_b_14}

  img {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export default TodayReportTitle;
