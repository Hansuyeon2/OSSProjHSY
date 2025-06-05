import { TooltipProps } from "recharts";
import emotionToImg from "src/utils/emotionToImg";
import styled from "styled-components";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0) {
    const { name, value } = payload[0];
    const icon = name ? emotionToImg[name] : undefined;

    return (
      <TooltipBox>
        <EmotionContent>
          <EmotionIcon src={icon} alt={name} />
          <span>
            {name}: {value}일
          </span>
        </EmotionContent>
      </TooltipBox>
    );
  }
  return null;
};

export default CustomTooltip;

const TooltipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.mainbrown01};
  border: 1px solid ${({ theme }) => theme.colors.mainbrown04};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const EmotionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const EmotionIcon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;
