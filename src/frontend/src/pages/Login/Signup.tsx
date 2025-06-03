import { useNavigate } from "react-router-dom";
import { useFormFields } from "./hooks/useFormFields";
import AuthForm from "./components/AuthForm";
import { postSignup } from "@apis/auth/postSignup";

const Signup = () => {
  const navigate = useNavigate();
  const { form, handleChange, isValid } = useFormFields(
    ["username", "password", "confirmPassword"],
    {
      validate: (form) =>
        form.username.trim() !== "" &&
        form.password.trim() !== "" &&
        form.confirmPassword.trim() !== "" &&
        form.password === form.confirmPassword,
    }
  );

  const handleSignup = async () => {
    const response = await postSignup({
      username: form.username,
      password: form.password,
    });

    if (response) {
      console.log("회원가입 성공:", response);
      navigate("/", { replace: true });
    } else {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AuthForm
      fields={[
        { name: "username", title: "닉네임" },
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
