import styled from "styled-components";
import ContentCard from "@components/card/ContentCard";
import { fonts } from "@styles/fonts";

interface ContentCardListProps {
  analysis: {
    title: string;
    movies: { title: string; sub: string }[];
    books: { title: string; sub: string }[];
    music: { title: string; sub: string }[];
    exhibitions: { title: string; sub: string }[];
  };
  category: string;
}

const iconSrcMap: Record<string, string> = {
  영화: "/images/icons/movie.png",
  책: "/images/icons/book.png",
  음악: "/images/icons/music.png",
  공연: "/images/icons/exhibition.png",
};

const ContentCardList = ({
  analysis,
  category = "영화",
}: ContentCardListProps) => {
  console.log("Analysis Data: ", analysis);
  console.log("Category: ", category);
  const contentList =
    category === "영화"
      ? analysis.movies
      : category === "책"
      ? analysis.books
      : category === "음악"
      ? analysis.music
      : analysis.exhibitions;

  return (
    <ContentCardListWrapper>
      <ContetnCardHeader>
        <ContetCardListIcon src="/images/icons/tag.svg" />
        <ContentCardListTitle>
          {analysis.title} {category}
        </ContentCardListTitle>
      </ContetnCardHeader>
      <ContentCardListSwiperContainer>
        <ContentCardRow>
          {contentList.map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="card-wrapper">
              <ContentCard
                title={item.title}
                src={iconSrcMap[category]}
                des={item.sub}
                category={category}
              />
            </div>
          ))}
        </ContentCardRow>
      </ContentCardListSwiperContainer>
    </ContentCardListWrapper>
  );
};

const ContentCardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin-top: 20px;
`;

const ContetnCardHeader = styled.section`
  display: flex;
  gap: 10px;
`;

const ContetCardListIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ContentCardListTitle = styled.h1`
  ${fonts.body_b_14}
`;

const ContentCardListSwiperContainer = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const ContentCardRow = styled.div`
  display: flex;
  gap: 11px;
  padding-bottom: 10px;
  padding-right: 10px;
`;

export default ContentCardList;
