import { fonts } from "@styles/fonts";
import { ReactNode } from "react";
import styled from "styled-components";

interface MonthReportSectionProps {
  title: string;
  sub: string;
  children: ReactNode;
}

const MonthReportSection = ({
  title,
  sub,
  children,
}: MonthReportSectionProps) => {
  return (
    <MonthReportSectionWrapper>
      <MonthReportSectionTop>
        <MonthReportSectionTitle>{title}</MonthReportSectionTitle>
        <MonthReportSectionSub>{sub}</MonthReportSectionSub>
      </MonthReportSectionTop>
      <MonthReportSectionContent>{children}</MonthReportSectionContent>
    </MonthReportSectionWrapper>
  );
};

const MonthReportSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const MonthReportSectionTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const MonthReportSectionTitle = styled.h1`
  ${fonts.title_b_24}
`;

const MonthReportSectionSub = styled.p`
  ${fonts.cap_s_12}
  color: ${({ theme }) => theme.colors.exgray01}
`;

const MonthReportSectionContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default MonthReportSection;
