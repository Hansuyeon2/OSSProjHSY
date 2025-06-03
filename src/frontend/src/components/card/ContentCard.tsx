import { fonts } from "@styles/fonts";
import styled from "styled-components";

interface ContentCardProps {
  onClick?: () => void;
  src: string;
  title: string;
  des?: string;
  category?: string;
  isSelected?: boolean;
}

const ContentCard = ({
  onClick,
  src,
  title,
  des,
  category,
  isSelected,
}: ContentCardProps) => {
  return (
    <ContentCardWrapper onClick={onClick} isSelected={isSelected}>
      <ContentCardIcon src={src} />
      <ContentCardTitle>{title}</ContentCardTitle>
      <ContenCardMore>{des || "자세히 보기"}</ContenCardMore>
      <ContentCardCategory>{category}</ContentCardCategory>
    </ContentCardWrapper>
  );
};

const ContentCardWrapper = styled.div<{ isSelected?: boolean }>`
  width: 105px;
  height: 105px;
  display: flex;
  flex-direction: column;
  padding: 10px 7px 5.742px 10px;
  border-radius: 4.234px;
  border: 0.847px solid ${({ theme }) => theme.colors.mainbrown03};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.bgbeige05 : theme.colors.bgbeige02};
  gap: 3px;
  cursor: pointer;
`;

const ContentCardIcon = styled.img`
  width: 22px;
  margin-bottom: 12px;
`;

const ContentCardTitle = styled.h1`
  ${fonts.cap_b_12}
  max-width: 7em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContenCardMore = styled.p`
  ${fonts.cap_m_10}
  color: ${({ theme }) => theme.colors.mainbrown02};
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentCardCategory = styled.p`
  ${fonts.cap_m_10}
  color: ${({ theme }) => theme.colors.mainbrown03};
  display: flex;
  justify-content: end;
`;

export default ContentCard;
