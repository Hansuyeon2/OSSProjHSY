import { fonts } from "@styles/fonts";
import React from "react";
import styled from "styled-components";

const LoginLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <LoginLayoutWrapper>
      <LoginLayoutContainer>
        <LoginHeadTitle>Quddy 쿼디</LoginHeadTitle>
        <LoginImg src="/images/Login/login_character.png" />
      </LoginLayoutContainer>
      {children}
    </LoginLayoutWrapper>
  );
};

export const LoginLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.31rem 1.53rem 2.19rem 1.53rem;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const LoginLayoutContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const LoginHeadTitle = styled.h1`
  ${fonts.title_b_30}
  color: ${({ theme }) => theme.colors.black};
`;

export const LoginImg = styled.img`
  width: 14.4375rem;
`;

export default LoginLayout;
