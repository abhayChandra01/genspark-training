import axios from "axios";

const BASE_URL = "http://localhost:5000/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};
