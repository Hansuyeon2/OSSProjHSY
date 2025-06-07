import { useState } from "react";
import * as s from "./TodayReportGraph_styled";
import dayjs from "dayjs";
import emotionToImg from "src/utils/emotionToImg";

type EmotionGraphProps = {
  data: {
    created_at: string;
    main_emotion: string;
  }[];
};

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

export default function EmotionGraph({ data }: EmotionGraphProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);

  const sorted = data.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const points: EmotionPoint[] = sorted.map((entry) => ({
    x: dayjs(entry.created_at).format("HH:mm"),
    y: emotionOrder.indexOf(entry.main_emotion),
    emotion: entry.main_emotion,
  }));

  const WIDTH_REM = 14.625;
  const HEIGHT_REM = 13.375;
  const REM_PX = 16;
  const WIDTH_PX = WIDTH_REM * REM_PX;
  const HEIGHT_PX = HEIGHT_REM * REM_PX;

  const margin = 40;
  const rowHeight = (HEIGHT_PX + 21 - 2 * margin) / (emotionOrder.length - 1);
  const colWidth = (WIDTH_PX - 2 * margin) / (points.length - 1 || 1);

  return (
    <s.GraphWrapper>
      <s.GraphContainer style={{ height: `${HEIGHT_REM}rem` }}>
        {/* 배경 감정 아이콘 */}
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

        {/* 선 및 영역 그리기 */}
        <s.Line width={WIDTH_PX} height={HEIGHT_PX}>
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
        </s.Line>

        {/* 포인트 찍기 + 툴팁 */}
        {points.map((p, i) => {
          const x = margin + i * colWidth + 10;
          const y = margin + p.y * rowHeight - 8;
          return (
            <s.Point
              key={i}
              left={x}
              top={y}
              onMouseEnter={() =>
                setHoveredPoint({ x, y, label: `${p.emotion} (${p.x})` })
              }
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}

        {/* 커스텀 툴팁 */}
        {hoveredPoint && (
          <s.Tooltip top={hoveredPoint.y - 16} left={hoveredPoint.x}>
            {hoveredPoint.label}
          </s.Tooltip>
        )}
      </s.GraphContainer>
    </s.GraphWrapper>
  );
}
