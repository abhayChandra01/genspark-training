import React from "react";
import { Employee } from "../../models/Employee";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="py-2 px-4 border">Name</th>
          <th className="py-2 px-4 border">Email</th>
          <th className="py-2 px-4 border">Role</th>
          <th className="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} className="text-gray-700">
            <td className="py-2 px-4 border">{employee.name}</td>
            <td className="py-2 px-4 border">{employee.email}</td>
            <td className="py-2 px-4 border">{employee.role}</td>
            <td className="py-2 px-4 border text-center">
              <button
                onClick={() => onEdit(employee)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(employee.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
