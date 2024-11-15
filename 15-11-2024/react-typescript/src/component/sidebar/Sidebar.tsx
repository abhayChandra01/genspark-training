import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="text-lg font-semibold h-16">Menu</div>
      <ul className="space-y-4">
        <li>
          <Link to="/user-details" className="hover:text-gray-300">
            User Details
          </Link>
        </li>
        <li>
          <Link to="/employee-data" className="hover:text-gray-300">
            Employee Data
          </Link>
        </li>
        <li>
          <Link to="/todo-list" className="hover:text-gray-300">
            To-Do List
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
