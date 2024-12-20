<template>
    <Headers/>
    <div class="grid grid-cols-3 h-screen mt-8">
        <!-- Left Sidebar with Filters -->
        <div class="col-span-1 p-4">
            <h3 class="text-xl font-bold text-black mb-4">Filter Grades</h3>

            <!-- Filter by Subject -->
            <div class="mb-4">
                <label for="subjectFilter" class="text-black">Filter by Subject:</label>
                <select
                    id="subjectFilter"
                    v-model="subjectFilter"
                    class="w-full p-2 mt-2 bg-gray-200 rounded-md"
                >
                    <option value="">All Subjects</option>
                    <option v-for="subject in uniqueSubjects" :key="subject" :value="subject">
                        {{ subject }}
                    </option>
                </select>
            </div>

            <div class="mb-4">
                <label for="dateSort" class="text-black">Sort by Date:</label>
                <select
                    id="dateSort"
                    v-model="dateSort"
                    class="w-full p-2 mt-2 bg-gray-200 rounded-md"
                >
                    <option value="asc">Oldest to Newest</option>
                    <option value="desc">Newest to Oldest</option>
                </select>
            </div>

            <!-- Sort by Grade -->
            <div class="mb-4">
                <label for="gradeSort" class="text-black">Sort by Grade:</label>
                <select
                    id="gradeSort"
                    v-model="gradeSort"
                    class="w-full p-2 mt-2 bg-gray-200 rounded-md"
                >
                    <option value="asc">Lowest to Highest</option>
                    <option value="desc">Highest to Lowest</option>
                </select>
            </div>
        </div>
        

        <!-- Main Content (Grades Table) -->
        <div class="col-span-2 mt-4">
            <h2 class="text-xl font-bold">Your Grades</h2>
            <div v-if="filteredGrades.length > 0" class="mt-2">
                <!-- Table for grades -->
                <table class="min-w-full table-auto border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left">Subject</th>
                            <th class="px-4 py-2 text-left">Grade</th>
                            <th class="px-4 py-2 text-left">Datum Invoer</th> <!-- New Column -->
                            <th class="px-4 py-2 text-left">Block</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cijfer in filteredGrades" :key="cijfer.cijfer_id" class="border-b">
                            <td class="px-4 py-2">{{ cijfer.vak_naam }}</td>
                            <td class="px-4 py-2">{{ cijfer.cijfer }}</td>
                            <td class="px-4 py-2">{{ cijfer.datum_invoer }}</td> <!-- New Data -->
                            <td class="px-4 py-2">{{ cijfer.blok_naam }}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- Display average grade -->
                 <div class="text-center mt-20">
                    <p class="mt-4 text-3xl font-semibold">Average Grade: {{ averageGrade }}</p>
                 </div>
            </div>
            <p v-else class="text-gray-500">No grades found.</p>
        </div>
    </div>
</template>

<script lang="ts">
import Headers from '@/components/headers.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    components: {
        Headers,
    },
    data() {
        return {
            userName: '', // To store the user's name
            userId: null, // To store the user's ID
            cijfers: [], // To store the grades
            subjectFilter: '', // To filter by subject
            gradeSort: 'asc', // To sort by grade (asc or desc)
            dateSort: 'asc', // To sort by date (oldest to newest or newest to oldest)
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
                    'http://localhost:3007/cijfers/student_view',
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
                    datum: row.datum,
                    datum_invoer: row.datum_invoer, // Map datum_invoer
                    blok_naam: row.blok_naam, // Include blok_naam here
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

        // Filter and sort grades based on filters
        filteredGrades() {
        let grades = this.cijfers;

        // Filter by subject
        if (this.subjectFilter) {
            grades = grades.filter(grade => grade.vak_naam === this.subjectFilter);
        }

        // Sort by grade
        if (this.gradeSort === 'asc') {
            grades = grades.sort((a, b) => a.cijfer - b.cijfer);
        } else if (this.gradeSort === 'desc') {
            grades = grades.sort((a, b) => b.cijfer - a.cijfer);
        }

        // Sort by date
        if (this.dateSort === 'asc') {
            grades = grades.sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
        } else if (this.dateSort === 'desc') {
            grades = grades.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
        }

        return grades;
    },

        // Get unique subjects for filtering
        uniqueSubjects() {
            const subjects = this.cijfers.map(cijfer => cijfer.vak_naam);
            return [...new Set(subjects)]; // Remove duplicates
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

table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ddd;
}

th, td {
    padding: 10px;
    text-align: left;
}

thead {
    background-color: #f7fafc;
}
</style>
