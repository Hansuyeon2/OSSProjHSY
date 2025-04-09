import * as S from "./Login_styled";
import { useNavigate, Link } from "react-router-dom";
import { useFormFields } from "./hooks/useFormFields";
import AuthForm from "./components/AuthForm";
import { PostLogin } from "@apis/auth/postLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const { form, handleChange, isValid } = useFormFields([
    "username",
    "password",
  ]);

  const handleLogin = async () => {
    const response = await PostLogin({
      username: form.username,
      password: form.password,
    });
    if (response) {
      console.log("로그인 성공:", response);
      navigate("/main");
    } else {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AuthForm
      fields={[
        { name: "username", title: "닉네임" },
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
