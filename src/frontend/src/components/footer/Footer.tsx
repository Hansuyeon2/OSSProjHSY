import { fonts } from "@styles/fonts";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const activeFooterPaths = [
    "/analysis",
    "/main",
    "/monthList",
    "/monthReport",
  ];
  if (!activeFooterPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <FooterWrapper>
      <FooterIconContainer
        onClick={() => navigate("/monthList")}
        $active={isActive("/monthList")}
      >
        <FooterIconImg
          src={
            isActive("/monthList")
              ? "images/footer/icon1_active.svg"
              : "/images/footer/icon1.svg"
          }
        />
        <p>감정분석</p>
      </FooterIconContainer>
      <FooterIconContainer
        onClick={() => navigate("/main")}
        $active={isActive("/main")}
      >
        <FooterIconImg
          src={
            isActive("/main")
              ? "images/footer/icon2_active.svg"
              : "/images/footer/icon2.svg"
          }
        />
        <p>홈</p>
      </FooterIconContainer>
      <FooterIconContainer
        onClick={() => navigate("/monthReport")}
        $active={isActive("/monthReport")}
      >
        <FooterIconImg
          src={
            isActive("/monthReport")
              ? "images/footer/icon3_active.svg"
              : "/images/footer/icon3.svg"
          }
        />
        <p>월간리포트</p>
      </FooterIconContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 18px 37px;
  background-color: #fffdf7;
  ${fonts.footer}

  justify-content: space-between;
  position: fixed;
  bottom: 0;
  max-width: 440px;
`;

const FooterIconContainer = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  cursor: pointer;

  p {
    color: ${({ $active, theme }) =>
      $active ? theme.colors.mainbrown01 : "rgba(216, 177, 142, 0.70)"};
  }
`;

const FooterIconImg = styled.img`
  width: 26px;
  height: 26px;
`;

export default Footer;
