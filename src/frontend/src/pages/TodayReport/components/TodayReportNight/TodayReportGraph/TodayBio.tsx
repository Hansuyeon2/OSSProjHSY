// src/components/EmotionGraph.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { getDiaryNight } from "@apis/diary/getDiaryNightAnalysis";

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
  width: 14.625rem;
  height: 13.375rem;
  border-radius: 0.875rem;
  position: relative;
  background: white;
`;

const Point = styled.div<{ top: number; left: number }>`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mainbrown03};
  color: ${({ theme }) => theme.colors.mainbrown04};
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: translate(-50%, -50%);
`;

const Line = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
`;

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
  const rowHeight = (HEIGHT_PX - 2 * margin) / (emotionOrder.length - 1);
  const colWidth = (WIDTH_PX - 2 * margin) / (points.length - 1 || 1);

  return (
    <GraphWrapper
      style={{ width: `${WIDTH_REM}rem`, height: `${HEIGHT_REM}rem` }}
    >
      {/* 배경 감정 레이어 */}
      {emotionOrder.map((emo, idx) => (
        <div
          key={emo}
          style={{
            position: "absolute",
            top: margin + rowHeight * idx - rowHeight / 2,
            left: 0,
            right: 0,
            height: rowHeight,
            fontSize: 12,
            paddingLeft: 8,
          }}
        >
          {emo}
        </div>
      ))}

      {/* 선 그리기 */}
      <Line width={WIDTH_PX} height={HEIGHT_PX}>
        <polyline
          fill="none"
          stroke="#d6bfab"
          strokeWidth="2"
          points={points
            .map((p, i) => {
              const x = margin + i * colWidth;
              const y = margin + p.y * rowHeight;
              return `${x},${y}`;
            })
            .join(" ")}
        />
      </Line>

      {/* 점 찍기 */}
      {points.map((p, i) => {
        const x = margin + i * colWidth;
        const y = margin + p.y * rowHeight;
        return (
          <Point key={i} left={x} top={y} title={`${p.emotion} (${p.x})`} />
        );
      })}
    </GraphWrapper>
  );
}
