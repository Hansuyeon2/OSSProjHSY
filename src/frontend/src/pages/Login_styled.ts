import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const LoginInputContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin-bottom: 5vh;
`;

export const LoginBtnContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const LoginInfo = styled.div`
  display: flex;
  gap: 0.44rem;
  align-items: center;
  margin-bottom: 0.62rem;

  .normal {
    ${fonts.cap_s_12};
  }

  .brown {
    ${fonts.cap_extra_12};
    color: ${({ theme }) => theme.colors.mainbrown01};
    cursor: pointer;
  }
`;
