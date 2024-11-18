import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Toaster position="bottom-center" />

      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="h-[calc(100vh-64px)] overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
