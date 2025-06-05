import { ReactNode } from "react";
import * as s from "./DiaryLayout_styled";
import FlexLayout from "./FlexLayout";
import { useNavigate } from "react-router-dom";

interface DiaryLayoutProps {
  children?: ReactNode;
}

const MonthReportLayout = ({ children }: DiaryLayoutProps) => {
  const navigate = useNavigate();
  return (
    <s.MonthReportWrapper>
      <s.MonthReportHeader>
        <s.MonthReportCloseButton
          onClick={() => navigate("/monthReport")}
          src="/images/icons/x_brown.png"
        />
        <p>
          {" "}
          민영님의 <span>5월</span>은 <br />
          "행복함이 가득했던 달"
        </p>

        <s.MonthReportHeaderImg src="/images/report/grass.png" />
      </s.MonthReportHeader>
      <FlexLayout>{children}</FlexLayout>
    </s.MonthReportWrapper>
  );
};

export default MonthReportLayout;
