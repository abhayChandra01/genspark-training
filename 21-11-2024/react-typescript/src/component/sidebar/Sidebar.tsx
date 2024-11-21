import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="text-lg font-semibold h-16">Menu</div>
      <ul className="space-y-4">
        <li>
          <Link to="/customer-details" className="hover:text-gray-300">
            Customer Details
          </Link>
        </li>
        <li>
          <Link to="/top-customers" className="hover:text-gray-300">
            Top Customers
          </Link>
        </li>
        <li>
          <div
            onClick={() => {
              toast.success("Logged out successfully!");
              localStorage.removeItem("auth_user_token");

              navigate("/login");
            }}
            className="hover:text-gray-300"
          >
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
