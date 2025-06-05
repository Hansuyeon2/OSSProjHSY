import { fonts } from "@styles/fonts";
import styled from "styled-components";

interface LoginInputProps {
  title: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput = (props: LoginInputProps) => {
  const { title, placeholder, type, value, onChange } = props;
  return (
    <LoginInputWrapper>
      <LoginInputTitle>{title}</LoginInputTitle>
      <LoginInputContent
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </LoginInputWrapper>
  );
};

const LoginInputWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
`;

const LoginInputTitle = styled.p`
  ${fonts.body_s_14}
  color: ${({ theme }) => theme.colors.mainbrown01}
`;

const LoginInputContent = styled.input`
  display: flex;
  height: 3.1875rem;
  padding: 0rem 1.06rem;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid #e7e8eb;
  background: #fff;
  width: 100%;
  ${fonts.body_m_14}

  ::placeholder {
    ${fonts.body_m_14}
    color: ${({ theme }) => theme.colors.exgray02}
  }
`;

export default LoginInput;
