import React, { useEffect, useState } from "react";
import { Employee } from "../../models/EmployeeModel";
import {
  fetchEmployees,
  fetchTotalEmployees,
} from "../../services/EmployeeService";
import { Link } from "react-router-dom";

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const getTotalEmployees = async () => {
    try {
      const total = await fetchTotalEmployees();
      setTotalEmployees(total);
    } catch (error) {
      console.error("Error fetching total employees:", error);
    }
  };

  const getEmployees = async () => {
    try {
      const data = await fetchEmployees(currentPage, limit);
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const totalPages = Math.ceil(totalEmployees / limit);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getTotalEmployees();
  }, []);

  useEffect(() => {
    getEmployees();
  }, [currentPage, limit]);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Employees List</h2>

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
              Joining Date
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
                {new Date(employee.joiningDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-blue-600 underline">
                <Link to={`/employees/view/${employee.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end gap-10 items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {`<`}
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default Employees;
