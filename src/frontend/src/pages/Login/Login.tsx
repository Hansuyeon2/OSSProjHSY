import * as S from "./Login_styled";
import { useNavigate, Link } from "react-router-dom";
import { useFormFields } from "./hooks/useFormFields";
import AuthForm from "./components/LoginComponent/AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { form, handleChange, isValid } = useFormFields([
    "nickname",
    "password",
  ]);

  const handleLogin = () => {
    console.log("로그인 요청:", {
      id: form.nickname,
      password: form.password,
    });
    navigate("/main");
  };

  return (
    <AuthForm
      fields={[
        { name: "nickname", title: "닉네임" },
        { name: "password", title: "비밀번호", type: "password" },
      ]}
      form={form}
      handleChange={handleChange}
      onSubmit={handleLogin}
      isValid={isValid}
      btnLabel="로그인"
      footer={
        <S.LoginInfo>
          <p className="normal">아직 회원이 아니신가요?</p>
          <Link to="/signup">
            <p className="brown">회원가입하기</p>
          </Link>
        </S.LoginInfo>
      }
    />
  );
};

export default LoginPage;
