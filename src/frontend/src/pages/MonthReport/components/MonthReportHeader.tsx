import * as s from "./styled";
import { userAtom } from "src/atoms/authAtoms";
import { useAtom } from "jotai";

const MonthReportHeader = () => {
  const [user] = useAtom(userAtom);

  return (
    <s.MonthReportHeaderWrapper>
      <p>{user.username}</p> 님의 감정리포트
    </s.MonthReportHeaderWrapper>
  );
};

export default MonthReportHeader;
