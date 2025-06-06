import { ReactNode } from "react";
import styled from "styled-components";

interface FlexLayoutProps {
  children: ReactNode;
}

const FlexLayout = ({ children }: FlexLayoutProps) => {
  return <FlexLayoutWrapper>{children}</FlexLayoutWrapper>;
};

const FlexLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 17px;
`;

export default FlexLayout;
