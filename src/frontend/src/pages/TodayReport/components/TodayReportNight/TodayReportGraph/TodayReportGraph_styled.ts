import { fonts } from "@styles/fonts";
import styled from "styled-components";

//todayBio.tsx
export const GraphWrapper = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const GraphContainer = styled.div`
  max-width: 14.625rem;
  height: 13.375rem;
  border-radius: 0.875rem;
  position: relative;
  background: ${({ theme }) => theme.colors.bgbeige02};
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
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
  border-radius: 4px;
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
  width: 50%;
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
`;
