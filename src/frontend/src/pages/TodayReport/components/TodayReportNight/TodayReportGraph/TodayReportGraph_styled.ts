import { fonts } from "@styles/fonts";
import styled, { css } from "styled-components";

//todayBio.tsx
export const GraphWrapper = styled.div<{ $isMonth?: boolean }>`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: ${({ $isMonth }) => ($isMonth ? "0px 25px" : "")};
  background-color: ${({ theme, $isMonth }) =>
    $isMonth ? theme.colors.bgbeige02 : ""};
  border-radius: ${({ $isMonth }) => ($isMonth ? "14px" : "")};
  border: 1px solid
    ${({ $isMonth, theme }) => ($isMonth ? theme.colors.mainbrown04 : "none")};

  ${({ $isMonth }) =>
    $isMonth &&
    css`
      @media (max-width: 370px) {
        transform: scale(0.8);
        left: -30px;
      }
    `}
`;

export const GraphContainer = styled.div<{ $isMonth?: boolean }>`
  width: ${({ $isMonth }) => ($isMonth ? "" : "14.625rem")};
  /* max-width: 200px; */
  height: 13.375rem;
  border-radius: 0.875rem;
  position: relative;
  border: 1px solid
    ${({ $isMonth, theme }) => ($isMonth ? "none" : theme.colors.mainbrown04)};
  background-color: ${({ theme, $isMonth }) =>
    $isMonth ? "" : theme.colors.bgbeige02};
  /* left: -30px; */
  ${({ $isMonth }) =>
    $isMonth &&
    css`
      @media (max-width: 350px) {
        background-color: ${({ theme }) => theme.colors.bgbeige02};
      }
    `}
`;

export const XAxisLabel = styled.div`
  ${fonts.cap_s_10};
  color: ${({ theme }) => theme.colors.mainbrown01};
  text-align: center;
  flex: 1;
`;

export const Point = styled.div<{ top: number; left: number }>`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mainbrown03};
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const Tooltip = styled.div<{ top: number; left: number }>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.mainbrown01};
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
  color: white;
  padding: 4px;
  width: 55px;
  border-radius: 4px;
  justify-content: center;
  display: flex;
  font-size: 12px;
  transform: translate(-50%, -100%);
  z-index: 10;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

export const Line = styled.svg``;

//todayEmotion.tsx
export const TodayEmotionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
  background-color: ${({ theme }) => theme.colors.bgbeige02};
  border-radius: 14px;
  padding: 20px 13px 20px 19px;
  width: 234px;
`;

export const ChartContainer = styled.section`
  display: flex;
  gap: 10px;
`;

export const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 60%;
  justify-content: center;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${fonts.cap_m_10};
`;

export const ColorBox = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 15px;
  background-color: ${({ color }) => color};
`;

export const TodayEmotionComment = styled.p`
  ${fonts.cap_m_10};

  span {
    ${fonts.cap_b_10}
    font-weight: 800;
  }
`;

export const monthWeekText = styled.text`
  ${fonts.cap_s_10}
  fill: ${({ theme }) => theme.colors.mainbrown01};
`;
