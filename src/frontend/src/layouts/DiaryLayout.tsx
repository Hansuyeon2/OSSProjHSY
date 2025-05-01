import { ReactNode } from "react";
import * as S from "./DiaryLayout_styled";

interface DiaryLayoutProps {
  children?: ReactNode;
  headerType?: "back" | "close";
  onBackClick?: () => void;
  onCloseClick?: () => void;
}

const DiaryLayout = ({
  children,
  headerType,
  onBackClick,
  onCloseClick,
}: DiaryLayoutProps) => {
  return (
    <S.DiaryWrapper>
      <S.DiaryHeader>
        {headerType === "back" && (
          <>
            <S.BackButton
              onClick={onBackClick}
              src="/images/icons/left_arrow.png"
            />
            <p>일기장</p>
          </>
        )}
        {headerType === "close" && (
          <>
            <S.CloseButton onClick={onCloseClick} src="/images/icons/x.png" />
          </>
        )}
      </S.DiaryHeader>
      <S.DiarySpringLeft src="/images/diary/spring.svg" />
      <S.DiarySpringRight src="/images/diary/spring.svg" />
      <S.DiaryImgIcon src="/images/diary/diaryIcon.png" />
      <S.DiaryImgClover src="/images/diary/diaryclover.png" />
      <S.DiaryContent>{children}</S.DiaryContent>
    </S.DiaryWrapper>
  );
};

export default DiaryLayout;
