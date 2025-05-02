import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const TodayReportContentWrapper = styled.div`
  padding: 30px 18px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.mainbrown05};
  border-radius: 9.5px;
  margin-top: 20px;
  width: 85%;
`;

export const TodayReportContentHeader = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 17px;
`;

export const TodayReportContentIcon = styled.img`
  width: 62.21px;
  height: 83.648px;
`;

export const TodayReportContentTitle = styled.h1`
  margin-bottom: 5px;
  ${fonts.title_b_18}
`;
