import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const MonthReportHeaderWrapper = styled.div`
  ${fonts.title_b_30}
  display: flex;

  p {
    color: ${({ theme }) => theme.colors.mainbrown01};
  }
`;
