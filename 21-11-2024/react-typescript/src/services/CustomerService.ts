import axios from "axios";
import { Customer } from "../models/CustomerModel";

const API_URL = `${process.env.REACT_APP_BASE_URL}/customers`;

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get<Customer[]>(API_URL);
  return response.data;
};

export const createCustomer = async (
  customer: Omit<Customer, "id">
): Promise<Customer> => {
  const response = await axios.post(API_URL, customer);
  return response.data;
};

export const updateCustomer = async (
  id: string,
  customer: Partial<Customer>
): Promise<Customer> => {
  const response = await axios.put(`${API_URL}/${id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
