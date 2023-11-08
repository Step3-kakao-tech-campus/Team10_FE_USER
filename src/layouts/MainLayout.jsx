import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, matchPath } from "react-router-dom";
import { GNB } from "../components/atoms/GNB";
import StatusBar from "../components/atoms/StatusBar";
import CustomModal from "../components/atoms/CustomModal";

export const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const noGNBPaths = [
    "/reviewpost",
    "/schedule",
    "/carwashdetail",
    "/payment",
    "/paymentresult",
  ];
  const authRequiredPaths = [
    "/history",
    "/bayselection/:carwashId",
    "/schedule/:carwashId/:bayId",
    "/payment",
    "/reviewpost",
    "/paymentresult/:reservationId",
  ];

  const handleConfirmLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleCancelLogin = () => {
    setShowLoginModal(false);
    navigate("/");
  };

  useEffect(() => {
    const currentPathIsAuthRequired = authRequiredPaths.some((authPath) =>
      matchPath({ path: authPath, end: false }, location.pathname)
    );

    if (
      currentPathIsAuthRequired &&
      !localStorage.getItem("token") &&
      !showLoginModal
    ) {
      setShowLoginModal(true);
    }
  }, [location, authRequiredPaths, showLoginModal]);

  const showGNB = noGNBPaths.every((path) => !location.pathname.includes(path));

  return (
    <div className="relative h-screen">
      <StatusBar />
      {showGNB && <GNB />}
      <div className="px-4 pt-14">{!showLoginModal && <Outlet />}</div>
      <CustomModal
        isOpen={showLoginModal}
        onRequestClose={handleCancelLogin}
        onConfirm={handleConfirmLogin}
        title="로그인 필요"
        content="로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        confirmText="로그인하러 가기"
        cancelText="홈으로"
      />
    </div>
  );
};
