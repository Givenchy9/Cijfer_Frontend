<template>
    <div class="m-auto w-1/2 bg-red-500 mt-56">
        <h1 class="text-center text-xl">Login</h1>
        <form @submit.prevent="login" class="grid grid-rows-2 w-1/2 m-auto mt-10">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" required />
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" required />
            <button type="submit"
                class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            email: "", // Email input field
            password: "", // Password input field
            errorMessage: "", // Error message to display
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post("http://localhost:3007/login", {
                    email: this.email,
                    password: this.password,
                });

                // Log the response for debugging
                console.log("Login response:", response.data);

                // Store the token, role, and user's name in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("naam", response.data.naam); // Store user's name

                // Redirect the user based on their role
                if (response.data.role === "docent") {
                    console.log("Redirecting to docent dashboard...");
                    this.$router.push("/docent"); // Redirect to docent dashboard
                } else if (response.data.role === "leerling") {
                    console.log("Redirecting to leerling dashboard...");
                    this.$router.push("/dashboard"); // Redirect to student dashboard
                } else {
                    throw new Error("Invalid user role");
                }
            } catch (error) {
                console.error("Login error:", error.response?.data?.message || error.message);
                this.errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            }
        },
    },
};
</script>


<style>
.error {
    color: red;
    margin-top: 10px;
}
</style>