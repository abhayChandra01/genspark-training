import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Vehicle } from "../../models/VehicleModel";

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle | null;
  onSave: (data: Vehicle) => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Vehicle>();

  useEffect(() => {
    if (vehicle) {
      setValue("ownerName", vehicle.ownerName);
      setValue("contactNumber", vehicle.contactNumber);
      setValue("vehicleModel", vehicle.vehicleModel);
      setValue("registrationNumber", vehicle.registrationNumber);
      setValue("vehicleColor", vehicle.vehicleColor);
    } else {
      reset();
    }
  }, [vehicle, setValue, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: Vehicle) => {
    if (vehicle?.id) {
      onSave({ ...data, id: vehicle?.id });
    } else {
      onSave(data);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">
          {vehicle ? "Edit Vehicle" : "Register Vehicle"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Owner Name</label>
            <input
              {...register("ownerName", { required: "Owner Name is required" })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.ownerName && (
              <span className="text-red-500">{errors.ownerName.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact Number</label>
            <input
              {...register("contactNumber", {
                required: "Contact Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact Number must be 10 digits",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.contactNumber && (
              <span className="text-red-500">
                {errors.contactNumber.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vehicle Model</label>
            <input
              {...register("vehicleModel", {
                required: "Vehicle Model is required",
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.vehicleModel && (
              <span className="text-red-500">
                {errors.vehicleModel.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Registration Number
            </label>
            <input
              {...register("registrationNumber", {
                required: "Registration Number is required",
                pattern: {
                  value: /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/,
                  message:
                    "Invalid Registration Number format (e.g., TS09EA1234)",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.registrationNumber && (
              <span className="text-red-500">
                {errors.registrationNumber.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vehicle Color</label>
            <input
              {...register("vehicleColor", {
                required: "Vehicle Color is required",
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.vehicleColor && (
              <span className="text-red-500">
                {errors.vehicleColor.message}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;
