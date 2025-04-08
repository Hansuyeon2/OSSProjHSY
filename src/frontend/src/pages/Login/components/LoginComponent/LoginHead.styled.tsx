import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const LoginHeadWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginHeadTitle = styled.h1`
  ${fonts.title_b_30}
  color: ${({ theme }) => theme.colors.black};
`;
