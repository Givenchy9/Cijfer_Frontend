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
                <div class="text-center">
                    <h1 class="text-xl mt-2">{{ userName }}</h1> <!-- Display user's name here -->
                    <div class="col-span-2 mt-4">
                            <div v-if="cijfers.length > 0" class="mt-2">
                                <div class="hidden">
                                    <ul>
                                        <li v-for="cijfer in cijfers" :key="cijfer.cijfer_id" class="border-b py-2">
                                            Subject: {{ cijfer.vak_naam }} - Grade: {{ cijfer.cijfer }}
                                        </li>
                                    </ul>
                                </div>
                                <!-- Display average grade -->
                                <p class="mt-4 text-5xl font-semibold">{{ averageGrade }}</p>
                            </div>
                            <p v-else class="text-gray-500">No grades found.</p>
                        </div>
                    </div>
            </div>
        </div>

        <RouterLink to="/cijfers"
            class="grid grid-cols-3 h-40 m-2 rounded-xl items-center justify-between text-center py-2.5 px-6 text-sm border border-gray-300 shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-500 hover:p-16">
            <div><i class="fa-solid fa-list-ol fa-2xl"></i></div>
            <div class="text-2xl">Cijfers</div>
        </RouterLink>
        <RouterLink to="/profile"
            class="grid grid-cols-3 h-36 m-2 rounded-xl items-center justify-between text-center py-2.5 px-6 text-sm border border-gray-300 shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-500 hover:p-12">
            <div><i class="fa-solid fa-gear fa-2xl"></i></div>
            <div class="text-2xl">Account</div>
        </RouterLink>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            userName: '', // To store the user's name
            userId: null, // To store the user's ID
            cijfers: [], // To store the grades
        };
    },
    created() {
        this.initializeUserData();
    },
    methods: {
        async initializeUserData() {
            try {
                const storedUserId = localStorage.getItem('userId');
                const storedUserName = localStorage.getItem('naam');
                const token = localStorage.getItem('token');

                if (storedUserId && storedUserName && token) {
                    this.userId = parseInt(storedUserId, 10);
                    this.userName = storedUserName;
                    await this.fetchGrades(token); // Fetch grades once user data is initialized
                } else {
                    console.log('User data not found. Redirecting to login.');
                    this.redirectToLogin(); // Handle redirection to login page
                }
            } catch (error) {
                console.error('Error initializing user data:', error);
            }
        },
        async fetchGrades(token: string) {
            try {
                const response = await axios.get(
                    `http://localhost:3007/cijfers/student_view`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in request
                        },
                    }
                );

                this.cijfers = response.data.map((row: any) => ({
                    cijfer_id: row.cijfer_id || null,
                    vak_naam: row.vak_naam,
                    cijfer: row.cijfer,
                }));
            } catch (error) {
                console.error('Error fetching grades:', error);
            }
        },
        redirectToLogin() {
            const router = useRouter();
            router.push('/login'); // Redirect to login page if data is missing
        },
    },
    computed: {
        // Compute the average grade
        averageGrade(): string {
            if (this.cijfers.length === 0) return 'N/A';
            const total = this.cijfers.reduce((sum, cijfer) => sum + cijfer.cijfer, 0);
            const average = total / this.cijfers.length;
            return average.toFixed(2); // Format to 2 decimal places
        },
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
