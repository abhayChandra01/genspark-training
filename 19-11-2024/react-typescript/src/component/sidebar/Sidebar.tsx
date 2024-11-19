import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="text-lg font-semibold h-16">Menu</div>
      <ul className="space-y-4">
        <li>
          <Link to="/context-api" className="hover:text-gray-300">
            Context API
          </Link>
        </li>
        <li>
          <Link to="/hoc" className="hover:text-gray-300">
            Higher Order Component
          </Link>
        </li>
        <li>
          <Link to="/custom-hook" className="hover:text-gray-300">
            Custom Hook
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
