import { fonts } from "@styles/fonts";
import { PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";

const COLORS = ["#D8B18E", "#EDCCAF", "#FFEAD7", "#DCDCDC"];

const TodayEmotionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
  background-color: ${({ theme }) => theme.colors.bgbeige02};
  border-radius: 14px;
  padding: 20px 13px 20px 19px;
  width: 234px;
  gap: 26px;
`;

const ChartContainer = styled.section`
  display: flex;
  gap: 10px;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 50%;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${fonts.cap_m_10};
`;

const ColorBox = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 15px;
  background-color: ${({ color }) => color};
`;
const TodayEmotionComment = styled.p`
  ${fonts.cap_m_10};
`;

type DonutChartProps = {
  subEmotionData: Record<string, number>;
  comment: string;
};

export default function TodayEmotion({
  subEmotionData,
  comment,
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
    <TodayEmotionWrapper>
      <ChartWrapper>
        <ChartContainer>
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
          <LegendWrapper>
            {chartData.map((item, i) => (
              <LegendItem key={i}>
                <ColorBox color={item.color} />
                <span>{item.name}</span>
                <span>{item.percent}%</span>
              </LegendItem>
            ))}
          </LegendWrapper>
        </ChartContainer>
        <TodayEmotionComment>{comment}</TodayEmotionComment>
      </ChartWrapper>
    </TodayEmotionWrapper>
  );
}
