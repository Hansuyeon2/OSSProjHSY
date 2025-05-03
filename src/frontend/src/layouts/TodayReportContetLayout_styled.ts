import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const TodayReportContentWrapper = styled.div`
  padding: 30px 18px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bgbeige01};
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
  border-radius: 9.5px;
  margin-top: 10px;
  width: 85%;
`;

export const TodayReportContentHeader = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const TodayReportContentIcon = styled.img`
  width: 87.8px;
  height: 85.315px;
`;

export const TodayReportContentTitle = styled.h1`
  margin-bottom: 5px;
  ${fonts.title_b_18}
`;

export const TodayReportContentDes = styled.p`
  ${fonts.cap_s_12}
  color: ${({ theme }) => theme.colors.mainbrown02}
`;
