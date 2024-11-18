import React from "react";
import { Customer } from "../../models/Customer";

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              City
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Country
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={index}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {customer.Name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {customer.City}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {customer.Country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
