// src/components/EmotionGraph.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { getDiaryNight } from "@apis/diary/getDiaryNightAnalysis";
import emotionToImg from "src/utils/emotionToImg";

const emotionOrder = [
  "행복",
  "화남",
  "놀람",
  "평온",
  "우울함",
  "두려움",
  "기타",
];

type EmotionPoint = {
  x: string;
  y: number;
  emotion: string;
};

const GraphWrapper = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const GraphContainer = styled.div`
  max-width: 14.625rem;
  height: 13.375rem;
  border-radius: 0.875rem;
  position: relative;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
`;

const Point = styled.div<{ top: number; left: number }>`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mainbrown03};

  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: translate(-50%, -50%);
`;

const Line = styled.svg``;

export default function EmotionGraph() {
  const [points, setPoints] = useState<EmotionPoint[]>([]);

  useEffect(() => {
    getDiaryNight().then((entries) => {
      const sorted = entries.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      const mapped = sorted.map((entry) => ({
        x: dayjs(entry.created_at).format("HH:mm"),
        y: emotionOrder.indexOf(entry.main_emotion),
        emotion: entry.main_emotion,
      }));

      setPoints(mapped);
    });
  }, []);

  const WIDTH_REM = 14.625;
  const HEIGHT_REM = 13.375;
  const REM_PX = 16;
  const WIDTH_PX = WIDTH_REM * REM_PX;
  const HEIGHT_PX = HEIGHT_REM * REM_PX;

  const margin = 40;
  const rowHeight = (HEIGHT_PX + 21 - 2 * margin) / (emotionOrder.length - 1);
  const colWidth = (WIDTH_PX - 2 * margin) / (points.length - 1 || 1);

  return (
    <GraphWrapper>
      <GraphContainer style={{ height: `${HEIGHT_REM}rem` }}>
        {/* 배경 감정 레이어 */}
        {emotionOrder.map((emo, idx) => (
          <div
            key={emo}
            style={{
              position: "absolute",
              top: margin + rowHeight * idx - rowHeight / 2 - 5,
              left: 0,
              right: 0,
              height: rowHeight,
              fontSize: 12,
              paddingLeft: 8,
            }}
          >
            <img
              src={emotionToImg[emo]}
              alt={emo}
              style={{
                width: 17,
                height: 21,
                objectFit: "contain",
              }}
            />
          </div>
        ))}

        {/* 선 그리기 */}
        <Line width={WIDTH_PX} height={HEIGHT_PX}>
          <defs>
            <linearGradient
              id="emotionGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="rgba(216, 177, 142, 0.8)" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
          </defs>

          {/* 영역 채우기 */}
          {points.length > 0 && (
            <polygon
              fill="url(#emotionGradient)"
              points={[
                ...points.map((p, i) => {
                  const x = margin + i * colWidth + 10;
                  const y = margin + p.y * rowHeight - 8;
                  return `${x},${y}`;
                }),
                `${margin + (points.length - 1) * colWidth + 10},${
                  HEIGHT_PX - 20
                }`,
                `${margin + 10},${HEIGHT_PX - 20}`,
              ].join(" ")}
            />
          )}
          <polyline
            fill="none"
            stroke="#d6bfab"
            strokeWidth="2"
            points={points
              .map((p, i) => {
                const x = margin + i * colWidth + 10;
                const y = margin + p.y * rowHeight - 8;
                return `${x},${y}`;
              })
              .join(" ")}
          />
        </Line>

        {/* 점 찍기 */}
        {points.map((p, i) => {
          const x = margin + i * colWidth + 10;
          const y = margin + p.y * rowHeight - 8;
          return (
            <Point key={i} left={x} top={y} title={`${p.emotion} (${p.x})`} />
          );
        })}
      </GraphContainer>
    </GraphWrapper>
  );
}
