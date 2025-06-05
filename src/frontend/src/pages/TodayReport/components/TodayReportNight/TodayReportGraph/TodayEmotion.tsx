import * as s from "./TodayReportGraph_styled";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#D8B18E", "#EDCCAF", "#FFEAD7", "#DCDCDC"];

type DonutChartProps = {
  username: string;
  subEmotionData: Record<string, number>;
  emotion1: string;
  emotion2: string;
  emotion3: string;
};

export default function TodayEmotion({
  username,
  subEmotionData,
  emotion1,
  emotion2,
  emotion3,
}: DonutChartProps) {
  // 감정 빈도 상위 4개 정렬
  const sorted = Object.entries(subEmotionData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const total = sorted.reduce((sum, [, count]) => sum + count, 0);

  const chartData = sorted.map(([emotion, count], idx) => ({
    name: emotion,
    value: count,
    percent: Math.round((count / total) * 100),
    color: COLORS[idx],
  }));

  const mostFrequentEmotion = chartData[0]?.name || "";

  return (
    <s.TodayEmotionWrapper>
      <s.ChartWrapper>
        <s.ChartContainer>
          <PieChart width={120} height={120}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              stroke="none"
              innerRadius={40}
              outerRadius={52}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {/* 가운데 텍스트 추가 */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={14}
              fill="#AC7544"
            >
              {mostFrequentEmotion}
            </text>
          </PieChart>
          <s.LegendWrapper>
            {chartData.map((item, i) => (
              <s.LegendItem key={i}>
                <s.ColorBox color={item.color} />
                <span>{item.name}</span>
                <span>{item.percent}%</span>
              </s.LegendItem>
            ))}
          </s.LegendWrapper>
        </s.ChartContainer>
        <s.TodayEmotionComment>
          어제 {username}님이 가장 많이 느낀 감정은 <span>{emotion1}</span>
          이에요.
          <br />
          {emotion3 ? (
            <>
              세부 감정으로는 <span>'{emotion2}'</span> 감정을 가장 많이 느꼈고,
              다음으로 <span>'{emotion3}'</span> 감정을 많이 느낀 것으로
              나타났어요.
            </>
          ) : (
            <>
              {" "}
              세부 감정으로는 <span>'{emotion2}'</span> 감정을 가장 많이
              느꼈어요.
            </>
          )}
        </s.TodayEmotionComment>
      </s.ChartWrapper>
    </s.TodayEmotionWrapper>
  );
}
