<template>
    <!-- Card start -->
    <Headers />
    <div class="flex justify-center items-center mt-28">
        <div class="max-w-sm w-full bg-gray-800 dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="text-center p-6 border-b border-gray-200 dark:border-gray-700">
                <img
                    class="h-24 w-24 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                    :src="user.avatar"
                    alt="User Avatar"
                />
                <h3 class="mt-4 text-xl font-bold text-white dark:text-white">
                    {{ user.first_name }} {{ user.last_name }}
                </h3>
                <div class="mt-2 text-white dark:text-gray-300">
                    <p>{{ user.email }}</p>
                    <p class="mt-1">Role: {{ user.role }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Card end -->
</template>

<script>
import Headers from "@/components/headers.vue";
import axios from "axios";

export default {
    components: {
        Headers,
    },
    data() {
        return {
            user: {
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                avatar: "https://via.placeholder.com/150",
            },
            loading: false,
            error: null,
        };
    },
    methods: {
        async fetchUserById(userId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`http://localhost:3007/users/${userId}`);
                this.user = response.data;
                console.log("Fetched user data:", this.user);
            } catch (err) {
                this.error = err.response?.data?.message || "Failed to fetch user data.";
                console.error("Error fetching user data:", err);
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        const userId = localStorage.getItem("userId");
        console.log("Logged-in user ID:", userId);
        if (userId) {
            this.fetchUserById(userId);
        } else {
            this.error = "User is not logged in.";
        }
    },
};
</script>

<style scoped>
/* Custom animations and tweaks can go here if needed */
</style>
