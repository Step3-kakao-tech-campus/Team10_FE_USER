import React, { useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BackImg from "/GNB/Back.svg";
import { useDispatch } from "react-redux";
import { resetStore } from "../../store/action";
import CustomModal from "./CustomModal";

const StatusBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogOutConfirm = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(resetStore());
    window.location.reload();
  }, [dispatch]);

  const handleLogOut = useCallback(
    (e) => {
      e.preventDefault();
      if (token) {
        setIsModalOpen(true);
      }
    },
    [token]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const isMainPage = location.pathname === "/";

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b-2 border-gray-300 h-14">
      <div className="flex items-center p-4">
        {!isMainPage && (
          <img src={BackImg} alt="Back" onClick={() => navigate(-1)} />
        )}
        <div className="flex items-center ml-auto space-x-4">
          {token ? (
            <>
              <button className="pl-4 border-l text-300" onClick={handleLogOut}>
                로그아웃
              </button>
              <CustomModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onConfirm={handleLogOutConfirm}
                title="로그아웃"
                content="로그아웃하시겠습니까?"
                confirmText="로그아웃"
                cancelText="취소"
              />
            </>
          ) : (
            <Link to="/login" className="text-300">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default StatusBar;
