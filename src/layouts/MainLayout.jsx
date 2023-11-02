import React from "react";
import { Outlet } from "react-router-dom";
import { GNB } from "../components/atoms/GNB";
import StatusBar from "../components/atoms/StatusBar";

export const MainLayout = () => {
  return (
    <div className="relative h-screen">
      <StatusBar />
      <div className="px-4 ">
        <Outlet />
      </div>
      <GNB />
    </div>
  );
};
