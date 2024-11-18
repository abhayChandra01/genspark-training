import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("https://reqres.in/api/users/");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
