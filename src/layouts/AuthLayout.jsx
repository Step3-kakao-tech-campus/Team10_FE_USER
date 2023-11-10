import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserInfoThunk } from "../store/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const AuthLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserInfoThunk())
      .then(unwrapResult)
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return <Outlet />;
};

export default AuthLayout;
