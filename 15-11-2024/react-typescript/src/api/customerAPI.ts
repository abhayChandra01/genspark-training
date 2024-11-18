import axios from "axios";

export const fetchCustomers = async () => {
  try {
    const response = await axios.get(
      "https://www.w3schools.com/angular/customers.php"
    );
    return response.data.records;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
