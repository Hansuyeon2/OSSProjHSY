import { Dispatch, SetStateAction, useState } from "react";
import * as S from "./Calendar_styled";
import CalendarModal from "./CalendarModal";
import emotionToImg from "src/utils/emotionToImg";

const MainCalendar = ({
  today,
  setToday,
  calendarData,
}: {
  today: Date;
  setToday: Dispatch<SetStateAction<Date>>;
  calendarData: Record<string, any>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.CalendarBox>
      <S.CalendarWrapper>
        <S.CustomHeader onClick={() => setIsModalOpen(true)}>
          {today.toLocaleString("en-US", { month: "long" }).toUpperCase()}
          <img src="/images/icons/dropdown.svg" alt="dropdown" />
        </S.CustomHeader>
        <S.StyleCalendar
          locale="ko-KR"
          value={today}
          onChange={(value) => setToday(value as Date)}
          calendarType="gregory"
          formatShortWeekday={(_, date) =>
            ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
          }
          formatDay={(_, date) => String(date.getDate())} // 날짜에서 '일' 제거
          formatMonthYear={
            (_, date) =>
              date.toLocaleString("en-US", { month: "long" }).toUpperCase() // 상단만 영어 (대문자로!)
          }
          tileContent={({ date, view }) => {
            if (view === "month") {
              const key = `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
              const emotion = calendarData?.[key]?.main_emotion;
              const iconSrc = emotionToImg[emotion];

              return (
                <S.MainCalendarContentContainer>
                  <S.CalendarImg
                    src={iconSrc || undefined}
                    style={{ opacity: iconSrc ? 1 : 0 }}
                    alt={emotion || ""}
                  />
                </S.MainCalendarContentContainer>
              );
            }
            return null;
          }}
        />
      </S.CalendarWrapper>
      {isModalOpen && (
        <CalendarModal
          today={today}
          setToday={setToday}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </S.CalendarBox>
  );
};

export default MainCalendar;
