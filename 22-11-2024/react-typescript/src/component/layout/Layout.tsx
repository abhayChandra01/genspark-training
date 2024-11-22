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
  const hideLayoutPaths: string[] = ["/login", "/register"];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("auth_user_token");
    if (!token && !hideLayoutPaths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex h-screen">
      <Toaster position="bottom-center" />

      {!shouldHideLayout ? <Sidebar /> : <></>}
      <div className="flex flex-col flex-1">
        {!shouldHideLayout ? <Header /> : <></>}
        <main
          className={`bg-gray-100 ${
            shouldHideLayout ? `` : `h-[calc(100vh-64px)] overflow-y-auto p-4`
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
