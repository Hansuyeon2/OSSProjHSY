import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const TodayReportNightWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.56rem;
`;

export const TodayReportNightHeader = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
`;

export const TodayReportCardContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.88rem;
`;

export const TodayReportCardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.56rem;
`;

export const TodayReportCardImg = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TodayReportCardImg1 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//todaytip

export const TodayTipWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const TodayTipContainer = styled.section`
  width: 234px;
  border-radius: 14px;
  padding: 18px 15px 47px 15px;
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
  background-color: ${({ theme }) => theme.colors.bgbeige02};
  position: relative;
  overflow: hidden;
  ${fonts.cap_m_12}

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 21px;
    width: 100%;
    background-color: #e2c6ad;
  }
`;
