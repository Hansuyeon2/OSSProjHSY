// components/MonthPickerHeader.tsx
import { Dispatch, SetStateAction, useState } from "react";
import CalendarModal from "@pages/Main/components/CalendarModal";
import styled from "styled-components";
import { fonts } from "@styles/fonts";

interface MonthPickerHeaderProps {
  today: Date;
  setToday: Dispatch<SetStateAction<Date>>;
}

const MonthPickHeader = ({ today, setToday }: MonthPickerHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CustomHeader onClick={() => setIsModalOpen(true)}>
        {today.toLocaleString("ko-KR", { month: "long" }).toUpperCase()}
        <img src="/images/icons/dropdown.svg" alt="dropdown" />
      </CustomHeader>
      {isModalOpen && (
        <CalendarModal
          today={today}
          setToday={setToday}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

const CustomHeader = styled.div`
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

export default MonthPickHeader;
