import { styled } from "styled-components";
import Calendar from "react-calendar";
import { fonts } from "@styles/fonts";

export const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

export const StyleCalendar = styled(Calendar)`
  padding: 1rem;
  background-color: #fffdf9;
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
  }

  //기본 내장 네비게이션 숨기기
  .react-calendar__navigation__label {
    visibility: hidden;
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
    top: 3%;
    left: 5.5%;
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

export const CalendarWrapper = styled.div`
  position: relative;

  /* @media (max-width: 320px) {
    scale: 0.9;
  } */
`;

//월 표시
export const CustomHeader = styled.div`
  position: absolute;
  top: 25px;
  left: 18px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 28.5px;
  gap: 6px;
  cursor: pointer;
  z-index: 10;
  ${fonts.title_b_30};
  font-size: 28.5px;
  img {
    width: 19px;
    height: 19px;
  }
`;

//모달 커스텀

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  max-width: 440px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

export const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  background: ${({ theme }) => theme.colors.bgbeige01};
  border-radius: 25px 25px 0px 0px;
  padding: 30px;
  z-index: 9999;
  max-width: 440px;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 35px;
`;

export const Arrow = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mainbrown01};
`;

export const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

export const MonthButton = styled.button<{ selected?: boolean }>`
  background: ${({ selected }) =>
    selected ? "rgba(216, 177, 142, 0.80)" : "rgba(216, 177, 142, 0.30)"};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.mainbrown01 : "rgba(172, 117, 68, 0.70)"};
  border: none;
  border-radius: 10px;
  padding: 0.75rem 0;
  font-size: 1rem;
  cursor: pointer;
`;

export const CloseButton = styled.button`
  margin-top: 28px;
  font-size: 0.9rem;
  cursor: pointer;
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;

  p {
    width: 98px;
    padding: 8px 24px;
    border-radius: 20px;
    background: rgba(216, 177, 142, 0.8);
    border: none;
    ${fonts.body_b_14}
    color: ${({ theme }) => theme.colors.mainbrown01};
  }
`;
