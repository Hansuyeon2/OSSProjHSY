import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const MonthListContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1.79338rem 1.375rem 2.08163rem 1.75rem;
  background-color: ${({ theme }) => theme.colors.bgbeige02};
  border-radius: 0.59rem;
  gap: 1.13rem;
`;

//monthListcard
export const MonthListCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
  border-bottom: 1px solid rgba(216, 177, 142, 0.5);
`;

export const MonthListHeaderSection = styled.section`
  display: flex;
  width: 100%;
  gap: 1.0625rem;
  align-items: center;
`;

export const MonthListHeaderImg = styled.img`
  width: 2.96856rem;
  height: 3.64631rem;
  flex-shrink: 0;
`;

export const MonthListHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;

  .date {
    ${fonts.title_b_18}
  }

  .emotion {
    ${fonts.cap_s_12}
    color: ${({ theme }) => theme.colors.mainbrown01};
  }
`;

export const MonthListText = styled.p`
  display: flex;
  color: ${({ theme }) => theme.colors.exgray01};
  ${fonts.cap_s_12}
  white-space: pre-line;
  padding-bottom: 1.06rem;
`;
