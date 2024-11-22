import axios from "axios";
import { Department } from "../models/DepartmentModel";

const API_URL = `${process.env.REACT_APP_BASE_URL}/departments`;

export const fetchDepartments = async (): Promise<Department[]> => {
  const response = await axios.get<Department[]>(API_URL);
  return response.data;
};
