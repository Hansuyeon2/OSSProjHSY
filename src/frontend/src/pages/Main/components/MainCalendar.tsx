import { useState } from "react";
import * as S from "./Calendar_styled";
import CalendarModal from "./CalendarModal";

const MainCalendar = () => {
  const [today, setToday] = useState(new Date());
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
          tileContent={({ view }) => {
            if (view === "month") {
              // 월뷰일 때만 표시
              return (
                <S.MainCalendarContentContainer>
                  <S.CalendarImg src="/images/icons/happy.svg" />
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
