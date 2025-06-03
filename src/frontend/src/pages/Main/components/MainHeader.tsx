import { useAtom } from "jotai";
import * as S from "./MainHeader.styled";
import { userAtom } from "src/atoms/authAtoms";

const MainHeader = ({
  today,
  monthEmotion,
}: {
  today: Date;
  monthEmotion: string | null;
}) => {
  const month = today.getMonth() + 1;
  const [user] = useAtom(userAtom);

  return (
    <S.MainPageHeaderWrapper>
      <S.MainPageHeaderIcon src="/images/icons/MainHeaderIcon.svg" />
      <S.MainPageHeaderTitle>
        <p>{month}월</p> 은{" "}
        <img src="/images/icons/dropdown.svg" alt="dropdown" />{" "}
        {monthEmotion
          ? `${monthEmotion}이 가득한 달이었네요!`
          : `${user?.username ?? "당신"} 님에게 어떤 달일까요?`}
      </S.MainPageHeaderTitle>
    </S.MainPageHeaderWrapper>
  );
};

export default MainHeader;
