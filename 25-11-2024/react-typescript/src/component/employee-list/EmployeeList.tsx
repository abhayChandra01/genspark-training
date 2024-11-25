import React from "react";
import { Employee } from "../../models/EmployeeModel";

interface EmpListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmpList: React.FC<EmpListProps> = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Name
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Role
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Department
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={employee.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {employee.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {employee.role}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {employee.department}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <button
                  onClick={() => onEdit(employee)}
                  className="px-2 py-1 text-white bg-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpList;
