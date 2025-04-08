import LoginBtn from "@pages/components/LoginComponent/LoginBtn";
import * as S from "./Login_styled";

//component
import LoginInput from "@pages/components/LoginComponent/LoginInput";
import LoginLayout from "@pages/components/LoginComponent/LoginLayout";
import { useFormFields } from "./hooks/useFormFields";

const LoginPage = () => {
  const { form, handleChange, isValid } = useFormFields([
    "nickname",
    "password",
  ]);

  return (
    <LoginLayout>
      <S.LoginInputContainer>
        <LoginInput
          title="닉네임"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange("nickname")}
        />
        <LoginInput
          title="비밀번호"
          placeholder="비밀번호"
          type="password"
          value={form.password}
          onChange={handleChange("password")}
        />
      </S.LoginInputContainer>
      <S.LoginInfo>
        <p className="normal">아직 회원이 아니신가요?</p>
        <p className="brown">회원가입하기</p>
      </S.LoginInfo>
      <LoginBtn title="로그인" disabled={!isValid} />
    </LoginLayout>
  );
};

export default LoginPage;
