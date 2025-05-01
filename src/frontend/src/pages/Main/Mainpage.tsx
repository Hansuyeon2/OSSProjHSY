import FlexLayout from "@layouts/FlexLayout";
import MainCalendar from "./components/MainCalendar";
import MainHeader from "./components/MainHeader";

const Mainpage = () => {
  return (
    <FlexLayout>
      <MainHeader />
      <MainCalendar />
    </FlexLayout>
  );
};

export default Mainpage;
