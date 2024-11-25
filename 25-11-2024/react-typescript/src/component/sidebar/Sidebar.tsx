import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navItems = [
    {
      id: 1,
      path: "/employees",
      label: "Employees",
    },
    {
      id: 2,
      path: "/vehicles",
      label: "Vehicles",
    },
  ];

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
      </ul>
    </div>
  );
};

export default Sidebar;
