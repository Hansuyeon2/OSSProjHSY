import { Outlet, useLocation } from "react-router-dom";
import Footer from "src/components/footer/Footer";
import styled from "styled-components";

const DefaultLayout = () => {
  const location = useLocation();

  const activeFooterPaths = ["/analysis", "/main", "/monthReport"];
  const hasFooter = activeFooterPaths.includes(location.pathname);

  return (
    <OutletWrapper $hasFooter={hasFooter}>
      <Outlet />
      <Footer />
    </OutletWrapper>
  );
};

export default DefaultLayout;

const OutletWrapper = styled.section<{ $hasFooter: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: ${({ $hasFooter }) => ($hasFooter ? "80px" : "0")};
`;
