import { Navigate, Outlet } from "react-router-dom";

const LoginLayout = () => {
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    // 이미 로그인 상태면 메인으로 보내주기
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};

export default LoginLayout;
