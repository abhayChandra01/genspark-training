import axios from "axios";
import { User } from "../models/UserModel";

const API_URL = `${process.env.REACT_APP_BASE_URL}/users`;

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const response = await axios.get<User[]>(API_URL, {
    params: { email, password },
  });
  return response.data.length > 0 ? response.data[0] : null;
};
