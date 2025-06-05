import { fonts } from "@styles/fonts";
import { ReactNode } from "react";
import styled from "styled-components";

interface MonthReportSectionProps {
  title: string;
  sub: string;
  children: ReactNode;
  noPadding?: boolean;
}

const MonthReportSection = ({
  title,
  sub,
  children,
  noPadding = false,
}: MonthReportSectionProps) => {
  return (
    <MonthReportSectionWrapper>
      <MonthReportSectionTop>
        <MonthReportSectionTitle>{title}</MonthReportSectionTitle>
        <MonthReportSectionSub>{sub}</MonthReportSectionSub>
      </MonthReportSectionTop>
      <MonthReportSectionContent $noPadding={noPadding}>
        {children}
      </MonthReportSectionContent>
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

const MonthReportSectionContent = styled.div<{ $noPadding?: boolean }>`
  width: 100%;
  display: flex;
  padding: ${({ $noPadding }) => ($noPadding ? "0" : "30px 25px")};
  justify-content: center;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
  background-color: ${({ theme }) => theme.colors.bgbeige02};
`;

export default MonthReportSection;
