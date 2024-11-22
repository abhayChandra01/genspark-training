import React, { useEffect, useState } from "react";
import { Department } from "../../models/DepartmentModel";
import { fetchDepartments } from "../../services/DepartmentService";

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  const loadDepartments = async () => {
    const data = await fetchDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 h-full">
      <h2 className="text-xl font-semibold mb-4">Departments List</h2>

      <table className="min-w-full table-auto text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Department Name
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Manager
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Employee Count
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr
              key={department.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {department.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {department.manager}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {department.employeeCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departments;
