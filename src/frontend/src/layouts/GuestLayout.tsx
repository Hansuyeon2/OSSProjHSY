import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  //TODO: 로그인 여부 판단 확인 훅 추가 필요
  return <Outlet />;
};

export default GuestLayout;
