import React, { useState } from "react";
import { Customer } from "../../models/CustomerModel";

type Props = {
  onClose: () => void;
  onSubmit: (customer: Omit<Customer, "id">) => void;
  customer: Partial<Customer>;
  isEditMode: boolean;
};

const Modal: React.FC<Props> = ({
  onClose,
  onSubmit,
  customer,
  isEditMode,
}) => {
  const [formData, setFormData] = useState<Omit<Customer, "id">>({
    customerId: customer.customerId || "",
    name: customer.name || "",
    city: customer.city || "",
    contactNumber: customer.contactNumber || "",
    year: customer.year || new Date().getFullYear(),
    photo: customer.photo || "",
    totalPurchasesPerYear: customer.totalPurchasesPerYear || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    return (
      formData.customerId &&
      formData.name &&
      formData.city &&
      /^\d{10}$/.test(formData.contactNumber) &&
      formData.totalPurchasesPerYear >= 0
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[50vw]">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Customer" : "Add Customer"}
        </h2>
        <div className="flex items-center mb-4 justify-between gap-4">
          <div className="w-full">
            <label className="block mb-1 font-bold">Customer ID</label>
            <input
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-bold">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </div>
        <div className="flex items-center mb-4 justify-between gap-4">
          <div className="w-full">
            <label className="block mb-1 font-bold">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-bold">Contact Number</label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </div>
        <div className="flex items-center mb-4 justify-between gap-4">
          <div className="w-full">
            <label className="block mb-1 font-bold">Year</label>
            <input
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-bold">Photo URL</label>
            <input
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Total Purchases</label>
          <input
            name="totalPurchasesPerYear"
            type="number"
            value={formData.totalPurchasesPerYear}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          {isEditMode ? "Update" : "Create"}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
