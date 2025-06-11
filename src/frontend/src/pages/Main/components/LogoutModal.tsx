import { useEffect } from "react";
import * as s from "./LogoutModal_styled";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({
  setIsLogoutModalOpen,
}: {
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
    <s.LogoutModalOverlay onClick={() => setIsLogoutModalOpen(false)}>
      <s.LogoutModalWrapper onClick={(e) => e.stopPropagation()}>
        <p>로그아웃 하시겠어요?</p>
        <s.LogoutModalBtnContainer>
          <s.LogoutModalBtn cancel onClick={() => setIsLogoutModalOpen(false)}>
            취소
          </s.LogoutModalBtn>
          <s.Divider />
          <s.LogoutModalBtn onClick={handleLogout}>로그아웃</s.LogoutModalBtn>
        </s.LogoutModalBtnContainer>
      </s.LogoutModalWrapper>
    </s.LogoutModalOverlay>
  );
};

export default LogoutModal;
