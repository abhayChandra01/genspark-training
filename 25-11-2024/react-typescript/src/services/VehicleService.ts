import axios from "axios";
import { Vehicle } from "../models/VehicleModel";

const API_URL = "http://localhost:5000/vehicles";

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addVehicle = async (newVehicle: Vehicle): Promise<Vehicle> => {
  const response = await axios.post(API_URL, newVehicle);
  return response.data;
};

export const updateVehicle = async (
  updatedVehicle: Vehicle
): Promise<Vehicle> => {
  const response = await axios.put(
    `${API_URL}/${updatedVehicle.id}`,
    updatedVehicle
  );
  return response.data;
};

export const deleteVehicle = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
