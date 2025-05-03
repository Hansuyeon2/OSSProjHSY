import ContentCard from "@components/card/ContentCard";
import styled from "styled-components";

interface ContentCardListProps {
  onSelect: (category: string) => void;
  selected: string;
}

const categories = [
  { title: "영화", src: "/images/icons/movie.png" },
  { title: "책", src: "/images/icons/book.png" },
  { title: "음악", src: "/images/icons/music.png" },
  { title: "공연", src: "/images/icons/exhibition.png" },
];

const ContentCardCategoryList = ({
  onSelect,
  selected,
}: ContentCardListProps) => {
  return (
    <ContentCardCategoryListWrapper>
      <ScrollContainer>
        {categories.map((item) => (
          <CardWrapper key={item.title}>
            <ContentCard
              title={item.title}
              src={item.src}
              onClick={() => onSelect(item.title)}
              isSelected={item.title === selected}
            />
          </CardWrapper>
        ))}
      </ScrollContainer>
    </ContentCardCategoryListWrapper>
  );
};

const ContentCardCategoryListWrapper = styled.section`
  width: 100%;
  overflow-x: auto;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;
  padding-bottom: 10px;
  width: fit-content;
`;

const CardWrapper = styled.div`
  flex: 0 0 auto;
`;

export default ContentCardCategoryList;
