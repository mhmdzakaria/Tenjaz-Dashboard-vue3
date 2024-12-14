import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const editUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedUser);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`User with ID ${id} deleted successfully.`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
