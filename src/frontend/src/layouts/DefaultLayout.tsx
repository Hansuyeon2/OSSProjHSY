import ScrollToTop from "@components/ScrollToTop";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "src/components/footer/Footer";
import styled from "styled-components";

const DefaultLayout = () => {
  const location = useLocation();

  const activeFooterPaths = ["/main", "/monthList", "/monthReport"];
  const hasFooter = activeFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <OutletWrapper $hasFooter={hasFooter}>
      <ScrollToTop />
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
