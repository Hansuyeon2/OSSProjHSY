import styled from "styled-components";
import Separator from "../separator";
import { fonts } from "@styles/fonts";
import { ChangeEvent } from "react";

interface DiaryCardProps {
  date: string;
  content: string;
  editable?: boolean;
  onChangeContent?: (value: string) => void;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const DiaryCard = ({
  date,
  content,
  placeholder,
  editable = false,
  onChange,
}: DiaryCardProps) => {
  return (
    <DiaryCardWrapper>
      <DiaryCardDate>{date}</DiaryCardDate>
      <Separator />
      {editable ? (
        <DiaryTextarea
          placeholder={placeholder}
          defaultValue={content}
          onChange={onChange}
        />
      ) : (
        <DiaryCardContent>{content}</DiaryCardContent>
      )}
    </DiaryCardWrapper>
  );
};

export default DiaryCard;

const DiaryCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 392px;
  padding: 40px 17px;
  border-radius: 9.5px;
  background-color: ${({ theme }) => theme.colors.bgbeige02};
  margin-top: 2rem;
`;

const DiaryCardDate = styled.h1`
  ${fonts.title_b_24}
`;

const DiaryCardContent = styled.p`
  margin-top: 30px;
  white-space: pre-wrap;
  height: 90%;
  overflow: scroll;
  ${fonts.cap_s_12};
  color: ${({ theme }) => theme.colors.exgray01};
`;

const DiaryTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  white-space: pre-wrap;
  ${fonts.cap_s_12};
  color: ${({ theme }) => theme.colors.exgray01};
  line-height: 20px;
  margin-top: 30px;

  &::placeholder {
    color: rgba(142, 142, 147, 0.5);
  }
`;
