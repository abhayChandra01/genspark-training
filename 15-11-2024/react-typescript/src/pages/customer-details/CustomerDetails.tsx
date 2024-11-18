import React, { useEffect, useState, useMemo, useCallback } from "react";
import FadingHeading from "../../component/fading-heading/FadingHeading";
import { fetchCustomers } from "../../api/customerAPI";
import { Customer } from "../../models/Customer";
import CustomerTable from "../../component/customer-table/CustomerTable";

const CustomerDetails: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const data = await fetchCustomers();

      const customerData: Customer[] = data;
      setCustomers(customerData);

      const uniqueCountries: string[] = [];
      customerData.forEach((customer) => {
        if (!uniqueCountries.includes(customer.Country)) {
          uniqueCountries.push(customer.Country);
        }
      });

      setCountries(uniqueCountries);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch customer data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCustomers = useMemo(() => {
    return selectedCountry === "All"
      ? customers
      : customers.filter((customer) => customer.Country === selectedCountry);
  }, [customers, selectedCountry]);

  const handleCountryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCountry(e.target.value);
    },
    []
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <FadingHeading />

        <select
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="All">All Countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-lg text-gray-500">Loading customers...</p>
      ) : error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : (
        <CustomerTable customers={filteredCustomers} />
      )}
    </div>
  );
};

export default CustomerDetails;
