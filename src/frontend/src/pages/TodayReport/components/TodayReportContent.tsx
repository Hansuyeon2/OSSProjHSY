import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./TodayReportContent_styled.css";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { DiaryEntry } from "@apis/diary/getDiaryAnalysis";
import DiaryCard from "@components/card/DiaryCard";
import { useRef } from "react";
import { getFormatToday } from "src/utils/date";

interface DiaryReportViewProps {
  entries: DiaryEntry[];
}

const TodayReportContent = ({ entries }: DiaryReportViewProps) => {
  const swiperRef = useRef<any>(null);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const index = swiperRef.current.realIndex;
      console.log("현재 카드 ID:", entries[index]?.id);
    }
  };

  if (entries.length > 1) {
    return (
      <Swiper
        modules={[Pagination, Mousewheel, Keyboard]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          console.log("현재 카드 ID:", entries[swiper.realIndex]?.id);
        }}
        style={{
          width: "100%",
          paddingBottom: "30px",
        }}
      >
        {entries.map((entry) => (
          <SwiperSlide
            key={entry.id}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DiaryCard
              date={getFormatToday(entry.created_at, "short")}
              content={entry.content}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <DiaryCard
      date={getFormatToday(entries[0].created_at, "short")}
      content={entries[0].content}
    />
  );
};

export default TodayReportContent;
