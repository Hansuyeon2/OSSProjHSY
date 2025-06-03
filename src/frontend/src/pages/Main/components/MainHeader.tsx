// MainHeader.tsx
import { useAtom } from "jotai";
import * as S from "./MainHeader.styled";
import { userAtom } from "src/atoms/authAtoms";
import { useState } from "react";
import CalendarModal from "@pages/Main/components/CalendarModal";

const MainHeader = ({
  today,
  setToday,
  monthEmotion,
}: {
  today: Date;
  setToday: React.Dispatch<React.SetStateAction<Date>>;
  monthEmotion: string | null;
}) => {
  const month = today.getMonth() + 1;
  const [user] = useAtom(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.MainPageHeaderWrapper>
      <S.MainPageHeaderIcon src="/images/icons/MainHeaderIcon.svg" />
      <S.MainPageHeaderTitle>
        <p>{month}월</p> 은{" "}
        <img
          src="/images/icons/dropdown.svg"
          alt="dropdown"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
        />{" "}
        {monthEmotion
          ? `${monthEmotion}이 가득한 달이었네요!`
          : `${user?.username ?? "당신"} 님에게 어떤 달일까요?`}
      </S.MainPageHeaderTitle>

      {isModalOpen && (
        <CalendarModal
          today={today}
          setToday={setToday}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </S.MainPageHeaderWrapper>
  );
};

export default MainHeader;
