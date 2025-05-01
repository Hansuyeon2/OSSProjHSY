import FlexLayout from "@layouts/FlexLayout";
import MainCalendar from "./components/MainCalendar";
import MainHeader from "./components/MainHeader";
import Separator from "src/components/separator";

const Mainpage = () => {
  return (
    <FlexLayout>
      <MainHeader />
      <MainCalendar />
      <Separator />
    </FlexLayout>
  );
};

export default Mainpage;
