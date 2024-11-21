import React, { useState, useEffect } from "react";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/CustomerService";
import { Customer } from "../../models/CustomerModel";
import Modal from "../../component/modal/Modal";
import CustomerTable from "../../component/customer-table/CustomerTable";

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Partial<Customer>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
    setFilteredCustomers(data);

    const uniqueCities = Array.from(
      new Set(data.map((customer) => customer.city))
    );
    setCities(uniqueCities);
  };

  const filterCustomersByCity = () => {
    if (selectedCity === "All") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) => customer.city === selectedCity
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleCreateOrUpdate = async (customer: Omit<Customer, "id">) => {
    if (isEditMode && currentCustomer.id) {
      await updateCustomer(currentCustomer.id, customer);
    } else {
      await createCustomer(customer);
    }
    fetchCustomers();
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  const openModal = (customer?: Customer) => {
    setCurrentCustomer(customer || {});
    setIsEditMode(!!customer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCustomer({});
    setModalOpen(false);
    setIsEditMode(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomersByCity();
  }, [selectedCity, customers]);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <label htmlFor="city" className="text-gray-700 font-medium">
              Filter by City:
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="All">All</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Customer
          </button>
        </div>
      </div>

      <CustomerTable
        customers={filteredCustomers}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <Modal
          onClose={closeModal}
          onSubmit={handleCreateOrUpdate}
          customer={currentCustomer}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default CustomerManagement;
