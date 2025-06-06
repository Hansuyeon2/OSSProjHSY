import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const MainPageHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 30px;
`;

export const MainPageHeaderTop = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    ${fonts.cap_m_10}
    color: ${({ theme }) => theme.colors.mainbrown01};
    cursor: pointer;
  }
`;

export const MainPageHeaderIcon = styled.img`
  width: 47px;
`;

export const MainPageHeaderTitle = styled.h1`
  ${fonts.title_b_24}
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;

  p {
    ${fonts.title_b_30}
    color: ${({ theme }) => theme.colors.mainbrown01};
  }

  img {
    margin-right: 5px;
    cursor: pointer;
  }
`;

export const MonthPickerWrapper = styled.section``;
