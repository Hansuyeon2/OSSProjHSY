import { useEffect } from "react";
import * as s from "./LogoutModal_styled";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/", { replace: true });
  };

  return (
    <s.LogoutModalOverlay>
      <s.LogoutModalWrapper>
        <p>로그아웃 하시겠어요?</p>
        <s.LogoutModalBtnContainer>
          <s.LogoutModalBtn cancel>취소</s.LogoutModalBtn>
          <s.Divider />
          <s.LogoutModalBtn onClick={handleLogout}>로그아웃</s.LogoutModalBtn>
        </s.LogoutModalBtnContainer>
      </s.LogoutModalWrapper>
    </s.LogoutModalOverlay>
  );
};

export default LogoutModal;
