import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const LogoutModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  max-width: 440px;
  height: 100vh;
  background: rgba(26, 30, 39, 0.4);
  z-index: 9999;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

export const LogoutModalWrapper = styled.div`
  width: 270px;
  height: 105.158px;
  background-color: ${({ theme }) => theme.colors.bgbeige02};
  z-index: 999;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border-radius: 9.947px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    ${fonts.body_b_14}
    height: 60%;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 5px;
  }
`;

export const LogoutModalBtnContainer = styled.section`
  display: flex;
  width: 100%;
  border-top: 1px solid rgba(142, 142, 147, 0.5);
  height: 40%;
`;

export const Divider = styled.div`
  width: 1px;
  background-color: rgba(142, 142, 147, 0.5);
`;

export const LogoutModalBtn = styled.button<{ cancel?: boolean }>`
  width: 50%;
  height: 40px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.mainbrown01};
  ${({ cancel }) => (cancel ? fonts.cap_m_12 : fonts.cap_b_12)};
`;
