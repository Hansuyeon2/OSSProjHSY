import { fonts } from "@styles/fonts";
import styled from "styled-components";

interface BtnProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  borderRadius?: string;
  marginTop?: string;
}

const Btn = ({
  title,
  disabled,
  onClick,
  borderRadius,
  marginTop,
}: BtnProps) => {
  return (
    <LoginBtnWrapper $marginTop={marginTop}>
      <LoginButton
        disabled={disabled}
        onClick={onClick}
        $borderRadius={borderRadius}
      >
        {title}
      </LoginButton>
    </LoginBtnWrapper>
  );
};

const LoginBtnWrapper = styled.div<{ $marginTop?: string }>`
  display: flex;
  width: 100%;
  margin-top: ${({ $marginTop }) => $marginTop || ""};
`;

const LoginButton = styled.button<{ $borderRadius?: string }>`
  display: flex;
  width: 100%;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: ${({ $borderRadius }) => $borderRadius || "3.125rem"};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.mainbrown03 : theme.colors.mainbrown01};
  ${fonts.sub_bold_16}
  opacity: ${({ disabled }) => (disabled ? "0.7" : "none")};
  color: ${({ theme }) => theme.colors.white};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default Btn;
