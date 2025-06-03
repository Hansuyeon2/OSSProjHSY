import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const MonthReportHeaderWrapper = styled.div`
  ${fonts.title_b_30}
  display: flex;

  p {
    color: ${({ theme }) => theme.colors.mainbrown01};
  }
`;

//monthReportCard

export const MonthReportCardWrapper = styled.div`
  width: 212px;
  height: 277px;
  flex-shrink: 0;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
  border-radius: 0.3125rem 1.875rem 1.875rem 0.3125rem;
  box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const MonthReportCardImg = styled.img`
  height: calc(100% - 90px);
  width: 100%;
  object-fit: cover;
  border-radius: 0.3125rem 1.875rem 0 0;
`;

export const MonthReportCardFooter = styled.div`
  height: calc(17.3125rem - 90px);
  width: 100%;
  border-radius: 0 0 1.875rem 0.3125rem;
  position: relative;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;

export const MonthReportCardBookMark = styled.img`
  position: absolute;
  width: 24px;
  height: 32px;
  right: 22px;
  top: 0;
`;

export const MonthReportCardFooterTitle = styled.h1`
  ${fonts.title_b_18}
`;

export const MonthReportCardFooterDes = styled.p`
  ${fonts.cap_s_10};
  color: #8e8e93;
`;
