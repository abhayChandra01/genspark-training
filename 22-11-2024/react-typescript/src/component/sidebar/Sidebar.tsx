import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { navConfig, UserRole } from "../../config/navConfig";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth_user_token") || "null");
  const userRole: UserRole | null = user?.role || null;

  const navItems = userRole ? navConfig[userRole] : [];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="text-lg font-semibold h-16">Menu</div>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="hover:text-gray-300">
              {item.label}
            </Link>
          </li>
        ))}

        <li>
          <div
            onClick={() => {
              toast.success("Logged out successfully!");
              localStorage.removeItem("auth_user_token");

              navigate("/login");
            }}
            className="cursor-pointer hover:text-gray-300"
          >
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
