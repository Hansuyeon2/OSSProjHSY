import { fonts } from "@styles/fonts";
import styled from "styled-components";

interface ContentCardProps {
  onClick: () => void;
  src: string;
  title: string;
}

const ContentCard = ({ onClick, src, title }: ContentCardProps) => {
  return (
    <ContentCardWrapper onClick={onClick}>
      <ContentCardIcon src={src} />
      <ContentCardTitle>{title}</ContentCardTitle>
      <ContenCardMore>자세히 보기</ContenCardMore>
    </ContentCardWrapper>
  );
};

const ContentCardWrapper = styled.div`
  width: 105px;
  height: 105px;
  display: flex;
  flex-direction: column;
  padding: 10px 7px 5.742px 10px;
  border-radius: 4.234px;
  border: 0cap.847px solid ${({ theme }) => theme.colors.mainbrown03};
  background-color: ${({ theme }) => theme.colors.mainbrown05};
  gap: 5px;
`;

const ContentCardIcon = styled.img`
  width: 22px;
  margin-bottom: 12px;
`;

const ContentCardTitle = styled.h1`
  ${fonts.cap_b_12}
`;

const ContenCardMore = styled.p`
  ${fonts.cap_m_10}
  color: ${({ theme }) => theme.colors.mainbrown02};
`;

export default ContentCard;
