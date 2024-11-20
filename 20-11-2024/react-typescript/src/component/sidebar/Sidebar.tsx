import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="text-lg font-semibold h-16">Menu</div>
      <ul className="space-y-4">
        <li>
          <Link to="/bank-app" className="hover:text-gray-300">
            Bank App
          </Link>
        </li>
        <li>
          <Link to="/json-server" className="hover:text-gray-300">
            JSON Server
          </Link>
        </li>
        <li>
          <Link to="/products-page" className="hover:text-gray-300">
            Products
          </Link>
        </li>
        <li>
          <div onClick={logout} className="hover:text-gray-300 cursor-pointer">
            Log-out
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
