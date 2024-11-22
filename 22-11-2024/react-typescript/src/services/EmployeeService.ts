import axios from "axios";
import { Employee } from "../models/EmployeeModel";

const API_URL = process.env.REACT_APP_BASE_URL;

export const fetchEmployees = async (
  page: number,
  limit: number
): Promise<Employee[]> => {
  try {
    const response = await axios.get(`${API_URL}/employees`, {
      params: {
        _page: page,
        _limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees", error);
    return [];
  }
};

export const fetchTotalEmployees = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}/total_employees`);
    return response.data[0]?.total_employees;
  } catch (error) {
    console.error("Error fetching total employees", error);
    return 0;
  }
};

export const fetchEmployeeById = async (
  id: string
): Promise<Employee | null> => {
  try {
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID: ${id}`, error);
    return null;
  }
};
