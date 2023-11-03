import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { GNB } from "../components/atoms/GNB";
import StatusBar from "../components/atoms/StatusBar";
import CustomModal from "../components/atoms/CustomModal";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 상태를 업데이트하여 fallback UI를 표시합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅
    console.error("Uncaught error:", error, errorInfo);
    // 상태에 errorInfo를 저장하고, 일정 시간 후 페이지를 새로고침합니다.
    this.setState({ errorInfo: errorInfo }, () => {
      window.location.reload();
    });
  }

  render() {
    if (this.state.hasError) {
      // 에러 발생 시 사용자에게 보여질 UI를 렌더링할 수 있습니다.
      // 아래의 경우, 에러 발생과 동시에 페이지가 새로고침되므로 실질적으로 아래 UI는 보여지지 않을 것입니다.
      return (
        <div>
          <h2>죄송합니다. 문제가 발생했습니다. 페이지를 새로고침합니다...</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    "history",
    "bayselection/:carwashId",
    "schedule/:carwashId/:bayId",
    "payment",
    "reviewpost",
    "paymentresult/:reservationId",
  ];

  const handleConfirmLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleCancelLogin = () => {
    setShowLoginModal(false);
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    const pathRequiresAuth = authRequiredPaths.some((path) =>
      location.pathname.includes(path)
    );

    // 인증이 필요한 경로로 가려고 하고 토큰이 없으면 모달을 표시
    const token = localStorage.getItem("token");
    if (pathRequiresAuth && !token) {
      setShowLoginModal(true);
    }
  }, [location, authRequiredPaths]);

  const showGNB = noGNBPaths.every((path) => !location.pathname.includes(path));

  return (
    <div className="relative h-screen">
      <StatusBar />
      {showGNB && <GNB />}
      <div className="px-4 pt-14">
        <ErrorBoundary>{!showLoginModal && <Outlet />}</ErrorBoundary>
      </div>
      <CustomModal
        isOpen={showLoginModal}
        onRequestClose={handleCancelLogin}
        onConfirm={handleConfirmLogin}
        title="로그인 필요"
        content="로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        confirmText="로그인하러 가기"
        cancelText="취소"
      />
    </div>
  );
};
