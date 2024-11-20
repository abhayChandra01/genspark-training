import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideLayoutPaths: string[] = ["/login"];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

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
