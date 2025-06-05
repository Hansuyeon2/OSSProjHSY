import { PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";

type EmotionData = {
  [emotion: string]: number;
};

interface MonthlyMainEmotionChartProps {
  data: EmotionData;
}

const EMOTION_ORDER = [
  "행복",
  "화남",
  "놀람",
  "평온",
  "우울함",
  "두려움",
  "기타",
];
const EMOTION_COLORS = [
  "#D8B18E",
  "#E47377",
  "#FFF697",
  "#BAD67F",
  "#94ABCA",
  "#B4A8CE",
  "#FFFAE7",
];

const MonthlyMainEmotionChart = ({ data }: MonthlyMainEmotionChartProps) => {
  const chartData = EMOTION_ORDER.map((emotion) => ({
    name: emotion,
    value: data[emotion] ?? 0,
  }));

  return (
    <Wrapper>
      <PieWrapper>
        <PieChart width={163} height={163}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={30}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={EMOTION_COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </PieWrapper>
      <LegendWrapper>
        {chartData.map((entry, index) => (
          <LegendItem key={entry.name}>
            <ColorDot color={EMOTION_COLORS[index]} />
            <span>{entry.name}</span>
            <span>{entry.value}일</span>
          </LegendItem>
        ))}
      </LegendWrapper>
    </Wrapper>
  );
};

export default MonthlyMainEmotionChart;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5vw;
`;

const PieWrapper = styled.div`
  @media (max-width: 345px) {
    transform: scale(0.8);
    transform-origin: top left;
    width: 55%;
  }
`;

const LegendWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 50%;
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const ColorDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
