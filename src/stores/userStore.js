import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { getUsers, editUser, deleteUser } from "../services/userService";

export const useUserStore = defineStore("userStore", () => {
  const users = reactive([]);
  const searchQuery = reactive("");
  const filterActive = reactive(true);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      users.splice(0, users.length, ...fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const updatedUserData = await editUser(id, updatedUser);
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUserData;
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = computed(() => {
    return users.filter((user) => {
      const matchesSearchQuery = user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesActiveStatus = filterActive ? user.isActive : !user.isActive;
      return matchesSearchQuery && matchesActiveStatus;
    });
  });

  return {
    users,
    searchQuery,
    filterActive,
    fetchUsers,
    updateUser,
    removeUser,
    filteredUsers,
  };
});
