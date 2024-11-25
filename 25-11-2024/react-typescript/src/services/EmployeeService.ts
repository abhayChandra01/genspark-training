import axios from "axios";
import { Employee } from "../models/EmployeeModel";

const API_URL = "http://localhost:5000/employees";

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addEmployee = async (newEmployee: Employee): Promise<Employee> => {
  const response = await axios.post(API_URL, newEmployee);
  return response.data;
};

export const updateEmployee = async (
  updatedEmployee: Employee
): Promise<Employee> => {
  const response = await axios.put(
    `${API_URL}/${updatedEmployee.id}`,
    updatedEmployee
  );
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
