import React from "react";
import { Customer } from "../../models/CustomerModel";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Customer ID
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Name
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              City
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Contact Number
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Year
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Photo
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Total Purchases
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {customer.customerId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {customer.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {customer.city}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {customer.contactNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {customer.year}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <img
                  src={customer.photo}
                  alt={customer.name}
                  className="w-16 h-16 rounded"
                />
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                ${customer.totalPurchasesPerYear}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <button
                  onClick={() => onEdit(customer)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(customer.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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

export default CustomerTable;
