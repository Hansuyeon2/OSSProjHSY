// Calendar_styled.ts
import { styled } from "styled-components";
import Calendar from "react-calendar";
import { fonts } from "@styles/fonts";

export const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyleCalendar = styled(Calendar)`
  max-width: 360px;
  padding: 1rem;
  background-color: #fffdf9;
  border: 2px solid #333;
  border-radius: 10px;

  .react-calendar__navigation {
    display: flex;
    pointer-events: none;
    justify-content: center;
    margin-bottom: 0.4rem;
    padding: 0.7rem;
    border-bottom: 1px solid black;

    &__label {
      ${fonts.title_b_30};
      font-size: 28.5px;
      display: flex;
      justify-content: flex-start;
    }

    &__label::after {
      content: "";
      width: 19px;
      height: 19px;
      margin-left: 6px;
      background-image: url("/images/icons/dropdown.svg");
      background-size: cover;
      cursor: pointer;
      pointer-events: auto;
    }
  }

  .react-calendar__navigation__label {
    display: flex;
    align-items: center;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    ${fonts.title_l_24}
    font-size: 8.55px;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }
  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-top: 1px solid #333;
    border-left: 1px solid #333;
  }

  .react-calendar__tile {
    border-right: 1px solid #333;
    border-bottom: 1px solid #333;
    text-align: left;
    vertical-align: top;
    position: relative;
    color: #000;
    background: transparent;
    box-sizing: border-box;
    ${fonts.title_l_24}
    font-weight: 300;
    font-size: 10px;
    padding: 0.07rem;
  }

  /* 이웃 달 날짜 셀 */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #bdbdbd !important;
  }

  /* 선택된 날짜 */
  .react-calendar__tile--active {
    background: none;
    color: #000;
    position: relative;
  }

  .react-calendar__tile--now::before {
    content: "";
    position: absolute;
    top: 5%;
    left: 12.5%;
    transform: translate(-50%);
    width: 0.5625rem;
    height: 0.58006rem;
    background-color: #c49b6c;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.mainbrown03};
    opacity: calc(0.7);

    z-index: 0;
  }

  .react-calendar__tile abbr {
    position: relative;
    z-index: 1;
  }

  /* 일요일: 빨간색 */
  .react-calendar__month-view__days__day--weekend:nth-child(7n + 1) {
    color: red;
  }

  /* 토요일: 파란색 */
  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: blue;
  }

  .react-calendar__month-view__days__day--weekend:nth-child abbr[title] {
    text-decoration: none;
    pointer-events: none;
  }

  /* <<, >> 버튼 숨김 */
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    display: none;
  }
`;

export const MainCalendarContentContainer = styled.section`
  display: flex;
  width: 100%;
  padding-bottom: 0.07rem;
  align-items: center;
  justify-content: center;
`;

export const CalendarImg = styled.img`
  width: 1.79188rem;
  height: 1.89688rem;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  z-index: 9999; /* 다른 요소들 위에 오도록 설정 */
  width: 300px;
  text-align: center;
`;

// 달 옆에 있는 이미지 스타일
export const MonthImage = styled.img`
  width: 20px;
  height: 20px;
`;
