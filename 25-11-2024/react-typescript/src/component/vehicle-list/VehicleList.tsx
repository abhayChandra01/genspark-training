import React from "react";
import { Vehicle } from "../../models/VehicleModel";

interface VehicleListProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: number) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Owner Name
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Contact Number
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Vehicle Model
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Registration Number
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Vehicle Color
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
              key={vehicle.id}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.ownerName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.contactNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.vehicleModel}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.registrationNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.vehicleColor}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <button
                  className="px-2 py-1 text-white bg-blue-500 rounded"
                  onClick={() => onEdit(vehicle)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded ml-2"
                  onClick={() => onDelete(vehicle.id!)}
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

export default VehicleList;
