<template>
    <div class="admin-page">
        <!-- Combined Table for All Users -->
        <h1 class="text-2xl font-bold mb-4">All Users (alleen kijken)</h1>
        <table class="w-full table-auto border-collapse border border-gray-300 mb-8">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2">ID</th>
                    <th class="border border-gray-300 px-4 py-2">Name</th>
                    <th class="border border-gray-300 px-4 py-2">Email</th>
                    <th class="border border-gray-300 px-4 py-2">Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-100">
                    <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.naam }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.role }}</td>
                </tr>
                <tr v-if="users.length === 0">
                    <td colspan="4" class="text-center text-gray-500 py-4">No users found.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            users: [], // All users combined
        };
    },
    async created() {
        try {
            const token = localStorage.getItem("token"); // Use token for authentication if required
            const response = await axios.get("http://localhost:3007/users", {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token if needed for secure routes
                },
            });

            // Store all users in a single array
            this.users = response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
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
