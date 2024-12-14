<template>
  <div class="py-4">
    <h1 class="h2 text-center mb-5">User Management</h1>

    <div class="row mb-5">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 mb-3 mb-sm-0">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search users..."
          class="form-control"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3 col-lg-2">
        <select v-model="statusFilter" class="form-select">
          <option value="">All Users</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div v-if="loading" class="d-flex justify-content-center align-items-center h-40">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary"></div>
      </div>

      <div v-else>
        <div v-if="filteredUsers.length" class="table-responsive">
          <table class="table table-striped table-bordered text-center">
            <thead class="">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>
                  <input
                    v-if="editingUser === user.id"
                    v-model="editUser.name"
                    type="text"
                    class="form-control"
                  />
                  <span v-else>{{ user.name }}</span>
                </td>

                <td>
                  <input
                    v-if="editingUser === user.id"
                    v-model="editUser.email"
                    type="text"
                    class="form-control"
                  />
                  <span v-else>{{ user.email }}</span>
                </td>

                <td>
                  <span
                    class="badge"
                    :class="user.active ? 'bg-success' : 'bg-danger'"
                  >
                    {{ user.active ? "Active" : "Inactive" }}
                  </span>
                </td>

                <td class="text-center">
                  <div class="d-flex justify-content-center align-items-center">
                    <button
                      v-if="editingUser !== user.id"
                      @click="startEdit(user)"
                      class="mx-1 btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      v-if="editingUser === user.id"
                      @click="saveEdit(user.id)"
                      class="mx-1 btn btn-success btn-sm"
                    >
                      Save
                    </button>
                    <button
                      @click="openDeleteModal(user)"
                      class="mx-1 btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center py-10 text-muted">
          <i class="bi bi-person-x text-warning" style="font-size: 2rem;"></i>
          <p>No users found. Try adjusting your search or filters.</p>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal fade show" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <p>{{ modalMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancel
            </button>
            <button
              v-if="modalType === 'delete'"
              type="button"
              class="btn btn-danger"
              @click="confirmDelete"
            >
              Delete
            </button>
            <button
              v-if="modalType === 'update'"
              type="button"
              class="btn btn-success"
              @click="saveEdit(editingUser)"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";

export default {
  name: "Users",
  setup() {
    const store = useUserStore();
    const { users, loading, fetchUsers, updateUser, removeUser } = store;
    const editingUser = ref(null);
    const editUser = ref({ name: "", email: "" });
    const searchTerm = ref("");
    const statusFilter = ref("");
    const showModal = ref(false);
    const modalTitle = ref("");
    const modalMessage = ref("");
    const modalType = ref("");
    const userToDelete = ref(null);

    onMounted(fetchUsers);

    const filteredUsers = computed(() => {
      return users.filter((user) => {
        user.active = user.id % 2 === 0;

        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.value.toLowerCase());

        const matchesStatus = statusFilter.value
          ? statusFilter.value === "active"
            ? user.active
            : !user.active
          : true;

        return matchesSearch && matchesStatus;
      });
    });

    const startEdit = (user) => {
      editingUser.value = user.id;
      editUser.value = { ...user };
    };

    const saveEdit = async (id) => {
      try {
        await updateUser(id, editUser.value);
        editingUser.value = null;
        closeModal();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    const openDeleteModal = (user) => {
      userToDelete.value = user;
      modalTitle.value = "Delete User";
      modalMessage.value = `Are you sure you want to delete ${user.name}?`;
      modalType.value = "delete";
      showModal.value = true;
    };

    const confirmDelete = async () => {
      try {
        await removeUser(userToDelete.value.id);
        closeModal();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    const closeModal = () => {
      showModal.value = false;
      modalType.value = "";
      modalMessage.value = "";
      modalTitle.value = "";
      userToDelete.value = null;
    };

    return {
      users,
      loading,
      editingUser,
      editUser,
      searchTerm,
      statusFilter,
      filteredUsers,
      startEdit,
      saveEdit,
      openDeleteModal,
      confirmDelete,
      closeModal,
      showModal,
      modalTitle,
      modalMessage,
      modalType,
    };
  },
};
</script>

<style scoped>
.table-row:hover {
  background-color: #f8f9fa;
}

.badge {
  width: 65px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-title {

    display: flex;
    justify-content: space-between;
    width: 100%;
}

button.close {
   
    background: #dc3545;
    color: white;
    border: 1px solid white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}
</style>
