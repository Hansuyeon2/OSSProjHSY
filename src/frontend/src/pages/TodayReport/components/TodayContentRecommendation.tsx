import ContentCardCategoryList from "./ContentCardCategoryList";
import ContentCardList from "./ContentCardList";
import styled from "styled-components";
import { useState } from "react";

type AnalysisSet = {
  title: string;
  movies: { title: string; sub: string; url?: string }[];
  books: { title: string; sub: string; url?: string }[];
  music: { title: string; sub: string; url?: string }[];
  exhibitions: { title: string; sub: string; url?: string }[];
};

type Props = {
  analysisSets: { set: AnalysisSet; label: string }[];
};

export default function TodayContentRecommendation({ analysisSets }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("영화");

  return (
    <>
      <ContentCardCategoryList
        onSelect={setSelectedCategory}
        selected={selectedCategory}
      />
      <CardListWrapper>
        {analysisSets.map((setItem) => {
          const categoryData =
            selectedCategory === "영화"
              ? setItem.set.movies
              : selectedCategory === "책"
              ? setItem.set.books
              : selectedCategory === "음악"
              ? setItem.set.music
              : setItem.set.exhibitions;

          return categoryData.length > 0 ? (
            <ContentCardList
              key={`${setItem.label}-${selectedCategory}`}
              analysis={setItem.set}
              category={selectedCategory}
            />
          ) : null;
        })}
      </CardListWrapper>
    </>
  );
}

const CardListWrapper = styled.div`
  width: 100%;
`;
