import React, { useState, useEffect } from "react";
import { getCustomers } from "../../services/CustomerService";
import { Customer } from "../../models/CustomerModel";

const TopCustomers: React.FC = () => {
  const [topCustomers, setTopCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchTopCustomers();
  }, []);

  const fetchTopCustomers = async () => {
    try {
      const customers = await getCustomers();
      const topFive = customers
        .sort((a, b) => b.totalPurchasesPerYear - a.totalPurchasesPerYear)
        .slice(0, 5);
      setTopCustomers(topFive);
    } catch (error) {
      console.error("Error fetching top customers:", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Top 5 Customers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              src={customer.photo}
              alt={customer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {customer.name}
              </h3>
              <p className="text-sm text-gray-600">{customer.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomers;
