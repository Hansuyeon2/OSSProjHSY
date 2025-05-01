import { Outlet } from "react-router-dom";
import Footer from "src/components/footer/Footer";

import styled from "styled-components";

const DefaultLayout = () => {
  return (
    <OutletWrapper>
      <Outlet />
      <Footer />
    </OutletWrapper>
  );
};

export default DefaultLayout;

const OutletWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  margin-bottom: 80px;
`;
