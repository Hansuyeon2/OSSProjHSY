import { useEffect, useRef, useState } from "react";
import * as s from "../../TodayReport/components/TodayReportNight/TodayReportGraph/TodayReportGraph_styled";
import emotionToImg from "src/utils/emotionToImg";

type MonthBioProps = {
  weekly_emotion: {
    [key: string]: string;
  };
};

const emotionOrder = ["행복", "화남", "놀람", "평온", "우울", "두려움", "기타"];

type EmotionPoint = {
  x: number;
  y: number;
  label: string;
  emotion: string;
};

export default function MonthBio({ weekly_emotion }: MonthBioProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (graphRef.current) {
      setContainerWidth(graphRef.current.offsetWidth);
    }
  }, [graphRef.current]);

  const weeks = ["week1", "week2", "week3", "week4", "week5"];
  const points: EmotionPoint[] = weeks
    .map((week, i) => {
      const emotion = weekly_emotion[week];
      if (!emotion) return null;
      return {
        x: i,
        y: emotionOrder.indexOf(emotion),
        emotion,
        label: `${i + 1}주차: ${emotion}`,
      };
    })
    .filter(Boolean) as EmotionPoint[];

  const HEIGHT_REM = 13.375;
  const REM_PX = 16;
  const HEIGHT_PX = HEIGHT_REM * REM_PX;

  const margin = 40;
  const rowHeight = (HEIGHT_PX + 21 - 2 * margin) / (emotionOrder.length - 1);
  const colWidth = (containerWidth - 2 * margin) / (weeks.length - 1 || 1);

  return (
    <s.GraphWrapper
      style={{
        display: "flex",
        height: `${HEIGHT_REM}rem`,
        maxWidth: 400,
        width: "100%",
      }}
      $isMonth
    >
      {/* 왼쪽 감정 이미지 */}
      <div
        style={{
          position: "relative",
          width: 25,
          height: `${HEIGHT_PX}px`,
          left: "10px",
          zIndex: 99,
        }}
      >
        {emotionOrder.map((emo, idx) => (
          <img
            key={emo}
            src={emotionToImg[emo]}
            alt={emo}
            style={{
              position: "absolute",
              top: margin + rowHeight * idx - 15,
              left: 0,
              width: 17,
              height: 21,
              objectFit: "contain",
            }}
          />
        ))}
      </div>

      {/* 오른쪽 그래프 */}
      <s.GraphContainer ref={graphRef} style={{ flex: 1 }} $isMonth>
        <s.Line width={containerWidth} height={HEIGHT_PX}>
          <defs>
            <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(216, 177, 142, 0.8)" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
          </defs>

          {/* 채워진 영역 */}
          {points.length > 0 && (
            <polygon
              fill="url(#weeklyGradient)"
              points={[
                ...points.map((p) => {
                  const x = margin + p.x * colWidth + 10;
                  const y = margin + p.y * rowHeight - 8;
                  return `${x},${y}`;
                }),
                `${margin + points[points.length - 1].x * colWidth + 10},${
                  HEIGHT_PX - 20
                }`,
                `${margin + points[0].x * colWidth + 10},${HEIGHT_PX - 20}`,
              ].join(" ")}
            />
          )}

          {/* 선 */}
          <polyline
            fill="none"
            stroke="#d6bfab"
            strokeWidth="2"
            points={points
              .map((p) => {
                const x = margin + p.x * colWidth + 10;
                const y = margin + p.y * rowHeight - 8;
                return `${x},${y}`;
              })
              .join(" ")}
          />

          {/* x축 레이블 */}
          {/* {weeks.map((_, i) => {
            const x = margin + i * colWidth + 10;
            const y = HEIGHT_PX + 5;
            return (
              <s.monthWeekText
                key={`label-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
              >
                {i + 1}주
              </s.monthWeekText>
            );
          })} */}
        </s.Line>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 25px",
            marginTop: "4px",
          }}
        >
          {weeks.map((_, i) => (
            <s.XAxisLabel key={i}>{i + 1}주</s.XAxisLabel>
          ))}
        </div>

        {/* 포인트 */}
        {points.map((p, i) => {
          const x = margin + p.x * colWidth + 10;
          const y = margin + p.y * rowHeight - 8;
          return (
            <s.Point
              key={i}
              left={x}
              top={y}
              onMouseEnter={() => setHoveredPoint({ x, y, label: p.label })}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}

        {/* 툴팁 */}
        {hoveredPoint && (
          <s.Tooltip top={hoveredPoint.y - 16} left={hoveredPoint.x}>
            {hoveredPoint.label}
          </s.Tooltip>
        )}
      </s.GraphContainer>
    </s.GraphWrapper>
  );
}
