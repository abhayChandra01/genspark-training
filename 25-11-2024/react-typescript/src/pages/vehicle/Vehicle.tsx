import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Vehicle } from "../../models/VehicleModel";
import {
  fetchVehicles,
  deleteVehicle,
  addVehicle,
  updateVehicle,
} from "../../services/VehicleService";
import VehicleModal from "../../component/vehicle-modal/VehicleModal";
import VehicleList from "../../component/vehicle-list/VehicleList";
import toast from "react-hot-toast";

const Vehicles: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: vehicles,
    isLoading,
    isError,
  } = useQuery("vehicles", fetchVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addMutation = useMutation(addVehicle, {
    onSuccess: () => queryClient.invalidateQueries("vehicles"),
  });

  const updateMutation = useMutation(updateVehicle, {
    onSuccess: () => queryClient.invalidateQueries("vehicles"),
  });

  const deleteMutation = useMutation(deleteVehicle, {
    onSuccess: () => queryClient.invalidateQueries("vehicles"),
  });

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    setIsModalOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleSave = (vehicle: Vehicle) => {
    console.log(vehicle);
    if (vehicle.id) {
      updateMutation.mutate(vehicle);
      toast.success("Updated successfully!");
    } else {
      addMutation.mutate({ ...vehicle, id: Date.now() });
      toast.success("Added successfully!");
    }
    setIsModalOpen(false);
  };

  const handleDeleteVehicle = (id: number) => {
    if (window.confirm("Are you sure? This action can't be undone.") === true) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={handleAddVehicle}
        >
          Add Vehicle
        </button>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching vehicles!</div>}

      <VehicleList
        vehicles={vehicles || []}
        onEdit={handleEditVehicle}
        onDelete={handleDeleteVehicle}
      />

      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicle={selectedVehicle}
        onSave={handleSave}
      />
    </div>
  );
};

export default Vehicles;
