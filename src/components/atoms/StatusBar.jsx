import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackImg from "/GNB/Back.svg";

const StatusBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    if (token) {
      alert("로그아웃 성공");
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const isMainPage = location.pathname === "/";

  return (
    <header className="w-full border-b-2 border-gray-300">
      <Link to="/" className="flex items-center px-4 py-3">
        {!isMainPage && (
          <img
            src={BackImg}
            alt="뒤로가기"
            className="h-10 w-30"
            onClick={() => navigate(-1)}
          />
        )}
        <div className="flex items-center ml-auto space-x-4">
          {token ? (
            <Link
              to="/"
              className="pl-4 border-l text-300"
              onClick={handleLogOut}
            >
              로그아웃
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-300">
                로그인
              </Link>
            </>
          )}
        </div>
      </Link>
    </header>
  );
};

export default StatusBar;
