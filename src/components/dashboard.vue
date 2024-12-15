<template>
    <div class="grid grid-cols-2 m-auto px-62 mt-4 dashboard">
        <div class="row-span-3">
            <div
                class="bg-white profile h-80 border border-gray-300 shadow-xs m-1 mt-2 p-1 rounded-xl transition-all duration-500 hover:bg-gray-500 hover:p-6 hover:h-80">
                <div class="m-auto relative w-40 h-40 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg class="absolute w-42 h-42 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div>
                    <h1>Welcome, {{ userName }}</h1> <!-- Display user's name here -->
                </div>
            </div>
        </div>

        <RouterLink to="/cijfers"
            class="grid grid-cols-3 h-40 m-2 rounded-xl items-center justify-between text-center py-2.5 px-6 text-sm border border-gray-300 shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-500 hover:p-16">
            <div><i class="fa-solid fa-list-ol fa-2xl"></i></div>
            <div class="text-2xl">Cijfers</div>
        </RouterLink>
        <RouterLink to="/settings"
            class="grid grid-cols-3 h-36 m-2 rounded-xl items-center justify-between text-center py-2.5 px-6 text-sm border border-gray-300 shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-500 hover:p-12">
            <div><i class="fa-solid fa-gear fa-2xl"></i></div>
            <div class="text-2xl">Instellingen</div>
        </RouterLink>
        <div class="col-span-2 mt-4">
            <h2 class="text-xl font-bold">Your Grades</h2>
            <div v-if="cijfers.length > 0" class="mt-2">
                <ul>
                    <li v-for="cijfer in cijfers" :key="cijfer.cijfer_id" class="border-b py-2">
                        Subject: {{ cijfer.vak_naam }} - Grade: {{ cijfer.cijfer }}
                    </li>
                </ul>
            </div>
            <p v-else class="text-gray-500">No grades found.</p>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    data() {
        return {
            userName: '', // To store the user's name
            userId: null, // To store the user's ID
            cijfers: [], // To store the grades
        };
    },
    async created() {
        try {
            // Retrieve user details from localStorage
            const storedUserId = localStorage.getItem('userId'); // Assume user ID is stored
            const storedUserName = localStorage.getItem('naam');
            if (storedUserId && storedUserName) {
                this.userId = parseInt(storedUserId, 10);
                this.userName = storedUserName;

                // Get the JWT token stored in localStorage (you'll need this for auth)
                const token = localStorage.getItem('token');
                if (token) {
                    // Fetch grades for the logged-in user
                    const response = await axios.get(`http://localhost:3007/cijfers/student_grades`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,  // Send the token for authentication
                        },
                        params: {
                            userId: this.userId, // Pass userId as a query parameter
                        },
                    });
                    this.cijfers = response.data; // Populate the grades array
                } else {
                    console.log('No token found in localStorage');
                }
            } else {
                console.log('No user data found in localStorage');
            }
        } catch (error) {
            console.error('Error fetching grades:', error);
        }
    },
};
</script>

<style>
.profile {
    height: 320px;
}

.dashboard {
    width: 1030px;
}
</style>
