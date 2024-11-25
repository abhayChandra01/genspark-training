import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <Toaster position="bottom-center" />

      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main
          className={`bg-gray-100 h-[calc(100vh-64px)] overflow-y-auto p-4`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
