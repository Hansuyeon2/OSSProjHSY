import { ReactNode } from "react";
import * as s from "./DiaryLayout_styled";
import FlexLayout from "./FlexLayout";
import { useNavigate } from "react-router-dom";
import { userAtom } from "src/atoms/authAtoms";
import { useAtom } from "jotai";

interface DiaryLayoutProps {
  children?: ReactNode;
  month: number;
  emotion: string;
}

const MonthReportLayout = ({ children, month, emotion }: DiaryLayoutProps) => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  return (
    <s.MonthReportWrapper>
      <s.MonthReportHeader>
        <s.MonthReportCloseButton
          onClick={() => navigate("/monthReport")}
          src="/images/icons/x_brown.png"
        />
        <p>
          {" "}
          {user.username}님의 <span>{month}월</span>은 <br />"{emotion}"이
          가득했던 달"
        </p>

        <s.MonthReportHeaderImg src="/images/report/grass.png" />
      </s.MonthReportHeader>
      <FlexLayout>{children}</FlexLayout>
    </s.MonthReportWrapper>
  );
};

export default MonthReportLayout;
