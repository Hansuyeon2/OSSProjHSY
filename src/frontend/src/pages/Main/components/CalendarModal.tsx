import { useState } from "react";
import * as S from "./Calendar_styled";

interface CalendarModalProps {
  today: Date;
  setToday: React.Dispatch<React.SetStateAction<Date>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarModal = ({
  today,
  setToday,
  setIsModalOpen,
}: CalendarModalProps) => {
  const [modalYear, setModalYear] = useState(today.getFullYear());

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(modalYear, month, 1);
    setToday(newDate);
    setIsModalOpen(false);
  };
  return (
    <>
      <S.ModalOverlay onClick={() => setIsModalOpen(false)} />
      <S.BottomSheet>
        <S.ModalHeader>
          <S.Arrow onClick={() => setModalYear(modalYear - 1)}>{"<"}</S.Arrow>
          <span>{modalYear}년</span>
          <S.Arrow onClick={() => setModalYear(modalYear + 1)}>{">"}</S.Arrow>
        </S.ModalHeader>

        <S.MonthGrid>
          {Array.from({ length: 12 }).map((_, i) => (
            <S.MonthButton
              key={i}
              selected={i === today.getMonth()}
              onClick={() => handleMonthSelect(i)}
            >
              {i + 1}월
            </S.MonthButton>
          ))}
        </S.MonthGrid>

        <S.CloseButton onClick={() => setIsModalOpen(false)}>
          <p>✕ 닫기</p>
        </S.CloseButton>
      </S.BottomSheet>
    </>
  );
};

export default CalendarModal;
