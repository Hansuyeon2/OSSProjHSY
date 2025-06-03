import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MonthReportCard from "./MonthReportCard";
import { getMonthlyReports } from "@apis/monthReport/getMonthlyReports";
import { dummyMonthReports } from "@apis/dummy/dummyMonthReports";

interface Report {
  month: number;
  emotion: string;
}

const MonthReportCardList = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const latestCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getMonthlyReports(2025);
        if (res && res.reports && res.reports.length > 0) {
          setReports(res.reports);
        } else {
          setReports(dummyMonthReports.reports);
        }
      } catch (e) {
        setReports(dummyMonthReports.reports);
      }
    };

    loadData();
  }, []);

  // 가장 마지막 카드로 스크롤
  useEffect(() => {
    if (latestCardRef.current) {
      latestCardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [reports]);

  const maxMonth = Math.max(...reports.map((r) => r.month));

  return (
    <CardListWrapper>
      <CardListScroll>
        {reports.map(({ month, emotion }) => (
          <div key={month} ref={month === maxMonth ? latestCardRef : null}>
            <MonthReportCard month={month} emotion={emotion} />
          </div>
        ))}
      </CardListScroll>
    </CardListWrapper>
  );
};

const CardListWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem;
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray03};
    border-radius: 3px;
  }
`;

const CardListScroll = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 40px;
`;

export default MonthReportCardList;
