// import { styled } from "styled-components";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { fonts } from "@styles/fonts";

// export const CalendarBox = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

// export const StyleCalendar = styled(Calendar)`
//   max-width: 100%;
//   border: none;
//   margin-bottom: 15px;
//   padding: 1.375rem 1rem;
//   border-radius: 0.59rem;
//   background-color: ${({ theme }) => theme.colors.bgbeige02};
//   backdrop-filter: blur(7.125px);

//   .react-calendar__navigation {
//     display: flex;
//     height: 24px;
//     margin-bottom: 1em;
//   }

//   .react-calendar__navigation button {
//     min-width: 24px;
//     background-color: none;
//   }

//   .react-calendar__navigation button:disabled {
//     background-color: #e8e8e8;
//   }

//   .react-calendar__navigation button:enabled:hover,
//   .react-calendar__navigation button:enabled:focus {
//     background-color: #e8e8e8;
//   }

//   //월~일
//   .react-calendar__month-view__weekdays {
//     text-align: center;
//     ${fonts.title_l_24}
//     font-size: 1em;
//     border: none;
//     background: none;
//   }

//   .react-calendar__year-view .react-calendar__tile,
//   .react-calendar__decade-view .react-calendar__tile,
//   .react-calendar__century-view .react-calendar__tile {
//     padding: 1.2em 0.5em;
//   }

//   .react-calendar__tile--hasActive {
//     color: #ffffff;
//     background-color: #797979;
//     border-radius: 5px;
//   }

//   .react-calendar__tile--hasActive:enabled:hover,
//   .react-calendar__tile--hasActive:enabled:focus {
//     background-color: #797979;
//   }

//   .react-calendar__tile--active {
//     color: #ffffff;
//     background-color: #6a6a6a;
//     border-radius: 7px;
//   }

//   abbr[title] {
//     text-decoration: none;
//   }

//   .react-calendar__tile--active:enabled:hover,
//   .react-calendar__tile--active:enabled:focus {
//     background-color: #6a6a6a;
//   }
// `;

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
    justify-content: center;
    margin-bottom: 1rem;

    &__label {
      ${fonts.title_b_30}font-size: 24px;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    ${fonts.title_l_24}
    font-size:15px
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
  .react-calendar__navigation__next2-button {
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
