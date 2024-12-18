<template>
    <div class="admin-page">
        <h1 class="text-2xl font-bold mb-4">All Docent Users</h1>
        <table class="w-full table-auto border-collapse border border-gray-300 mb-8">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2">ID</th>
                    <th class="border border-gray-300 px-4 py-2">Name</th>
                    <th class="border border-gray-300 px-4 py-2">Email</th>
                    <th class="border border-gray-300 px-4 py-2">Role</th>
                    <th class="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in docenten" :key="user.id" class="hover:bg-gray-100">
                    <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.naam }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.role }}</td>
                    <td class="border border-gray-300 px-4 py-2">
                        <button
                            class="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                            @click="openEditModal(user)"
                        >
                            Edit
                        </button>
                        <button
                            class="bg-red-500 text-white px-3 py-1 rounded"
                            @click="deleteUser(user.id)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                <tr v-if="docenten.length === 0">
                    <td colspan="5" class="text-center text-gray-500 py-4">No users with role "docent" found.</td>
                </tr>
            </tbody>
        </table>

        <!-- Edit Modal -->
        <div
            v-if="showEditModal"
            class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
        >
            <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">Edit User</h2>
                <form @submit.prevent="updateUser">
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            v-model="editUser.naam"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            v-model="editUser.email"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">Role</label>
                        <select
                            v-model="editUser.role"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                        >
                            <option value="docent">Docent</option>
                            <option value="leerling">Leerling</option>
                        </select>
                    </div>
                    <div class="flex justify-end">
                        <button
                            type="button"
                            class="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                            @click="closeEditModal"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            docenten: [], // To store users with role "docent"
            showEditModal: false, // To toggle edit modal visibility
            editUser: null, // The user being edited
        };
    },
    async created() {
        await this.fetchUsers();
    },
    methods: {
        // Fetch users from the backend
        async fetchUsers() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3007/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.docenten = response.data.filter((user) => user.role === "docent");
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        // Open the edit modal
        openEditModal(user) {
            this.editUser = { ...user }; // Create a copy of the user for editing
            this.showEditModal = true;
        },
        // Close the edit modal
        closeEditModal() {
            this.editUser = null;
            this.showEditModal = false;
        },
        // Update user
        async updateUser() {
            try {
                const token = localStorage.getItem("token");
                await axios.put(
                    `http://localhost:3007/users/${this.editUser.id}`,
                    this.editUser,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Refresh the users list
                await this.fetchUsers();
                this.closeEditModal();
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },
        // Delete user
        async deleteUser(userId) {
            if (confirm("Are you sure you want to delete this user?")) {
                try {
                    const token = localStorage.getItem("token");
                    await axios.delete(`http://localhost:3007/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    // Refresh the users list
                    await this.fetchUsers();
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            }
        },
    },
};
</script>


<style>
.admin-page {
    margin: 2rem auto;
    width: 80%;
    max-width: 1200px;
}

table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
}

th,
td {
    padding: 0.5rem;
    border: 1px solid #ddd;
}

thead th {
    background-color: #f4f4f4;
}
</style>
