import { fonts } from "@styles/fonts";
import styled from "styled-components";

const LoginBtn = ({
  title,
  disabled,
  onClick,
}: {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <LoginBtnWrapper>
      <LoginButton disabled={disabled} onClick={onClick}>
        {title}
      </LoginButton>
    </LoginBtnWrapper>
  );
};

const LoginBtnWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const LoginButton = styled.button`
  display: flex;
  width: 100%;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 3.125rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.mainbrown03 : theme.colors.mainbrown01};
  ${fonts.sub_bold_16}
  opacity: ${({ disabled }) => (disabled ? "0.7" : "none")};
  color: ${({ theme }) => theme.colors.white};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default LoginBtn;
