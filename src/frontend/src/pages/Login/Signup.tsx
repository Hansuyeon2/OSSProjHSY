// pages/Signup.tsx
import { useNavigate } from "react-router-dom";
import { useFormFields } from "./hooks/useFormFields";
import AuthForm from "./components/LoginComponent/AuthForm";

const Signup = () => {
  const navigate = useNavigate();
  const { form, handleChange, isValid } = useFormFields(
    ["nickname", "password", "confirmPassword"],
    {
      validate: (form) =>
        form.nickname.trim() !== "" &&
        form.password.trim() !== "" &&
        form.confirmPassword.trim() !== "" &&
        form.password === form.confirmPassword,
    }
  );

  const handleSignup = () => {
    console.log("회원가입 요청:", {
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
        { name: "confirmPassword", title: "비밀번호 재확인", type: "password" },
      ]}
      form={form}
      handleChange={handleChange}
      onSubmit={handleSignup}
      isValid={isValid}
      btnLabel="회원가입"
      warning={
        form.confirmPassword && form.password !== form.confirmPassword
          ? "* 비밀번호가 일치하지 않습니다."
          : ""
      }
    />
  );
};

export default Signup;
