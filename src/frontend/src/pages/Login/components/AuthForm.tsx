import * as S from "@pages/Login/Login_styled";

import LoginLayout from "./LoginLayout";
import LoginInput from "./LoginInput";
import Btn from "../../../components/Button";

interface AuthFormProps {
  fields: { name: string; title: string; type?: string }[];
  form: Record<string, string>;
  handleChange: (
    field: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isValid: boolean;
  btnLabel: string;
  footer?: React.ReactNode;
  warning?: string;
}

const AuthForm = ({
  fields,
  form,
  handleChange,
  onSubmit,
  isValid,
  btnLabel,
  footer,
  warning,
}: AuthFormProps) => {
  return (
    <LoginLayout>
      <S.LoginInputContainer>
        {fields.map(({ name, title, type }) => (
          <LoginInput
            key={name}
            title={title}
            placeholder={title}
            type={type}
            value={form[name]}
            onChange={handleChange(name)}
          />
        ))}
        <S.WarningText>{warning}</S.WarningText>
      </S.LoginInputContainer>
      {footer}
      <Btn title={btnLabel} disabled={!isValid} onClick={onSubmit} />
    </LoginLayout>
  );
};

export default AuthForm;
