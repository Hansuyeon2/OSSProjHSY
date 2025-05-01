import Btn from "@components/Button";
import DiaryCard from "@components/card/DiaryCard";
import DiaryLayout from "@layouts/DiaryLayout";
import { useState } from "react";
import { getFormatToday } from "src/utils/date";

const placeholderText = `오늘 하루, 잘 버텨낸 당신에게

오늘 있었던 일들, 마음에 남는 순간, 기록하고 싶은 이야기가 있다면 솔직하게 적어보세요.

하루의 감정을 담아 ‘저장하기'를 클릭하면, 
쿼디가 당신의 마음을 읽고 지금 기분에 꼭 맞는 콘텐츠를 
추천해드릴게요!`;

const Diary = () => {
  const [content, setContent] = useState("");
  const isValid = content.trim().length > 0;

  return (
    <>
      <DiaryLayout>
        <DiaryCard
          date={getFormatToday()}
          content=""
          editable
          placeholder={placeholderText}
          onChange={(e) => setContent(e.target.value)}
        />
        <Btn title="저장하기" borderRadius="10px" disabled={!isValid} />
      </DiaryLayout>
    </>
  );
};

export default Diary;
