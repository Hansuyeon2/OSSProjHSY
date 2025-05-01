import FlexLayout from "@layouts/FlexLayout";
import MainCalendar from "./components/MainCalendar";
import MainHeader from "./components/MainHeader";
import Separator from "src/components/separator";
import Btn from "src/components/Button";
import MainContent from "./components/MainContent";

const Mainpage = () => {
  return (
    <FlexLayout>
      <MainHeader />
      <MainCalendar />
      <Separator />
      <MainContent />
      <Btn title="일기 쓰기" borderRadius="10px" />
    </FlexLayout>
  );
};

export default Mainpage;
