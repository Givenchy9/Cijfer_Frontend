<template>
    <Header2 />
    <main class="mx-20 my-8">
        <h1 class="text-3xl font-bold mb-4">Students in {{ vakName }}</h1>

        <!-- Student List -->
        <div v-if="leerlingen.length" class="grid grid-cols-1 gap-4">
            <div v-for="(leerling, index) in leerlingen" :key="index"
                class="p-4 border rounded bg-white shadow cursor-pointer" @click="selectStudent(leerling)">
                <h2 class="text-xl font-semibold">{{ leerling.leerling_naam }}</h2>
                <p class="text-sm">Class: {{ leerling.klas_naam }}</p>
            </div>
        </div>

        <div v-else>
            <p>No students found for this subject.</p>
        </div>

        <!-- Modal for Student Details -->
        <div v-if="selectedStudent"
            class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 class="text-2xl font-semibold mb-4">Student Details</h2>
                <p><strong>Name:</strong> {{ selectedStudent.leerling_naam }}</p>
                <p><strong>Class:</strong> {{ selectedStudent.klas_naam }}</p>

                <!-- Show Grades -->
                <h3 class="text-lg font-semibold mt-4">Grades for {{ vakName }}</h3>
                <div v-if="grades.length" class="mt-2">
                    <ul>
                        <li v-for="(grade, index) in grades" :key="index">
                            <strong>Grade:</strong> {{ grade.cijfer }}
                            <span v-if="grade.commentaar">(<em>{{ grade.commentaar }}</em>)</span>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <p>No grades available for this student.</p>
                </div>
                <div v-if="grades.length" class="mt-2">
  <ul>
    <li v-for="(grade, index) in grades" :key="index">
      <strong>Grade:</strong> {{ grade.cijfer }}
      <span v-if="grade.commentaar">(<em>{{ grade.commentaar }}</em>)</span>
      <button @click="deleteGrade(grade.id)" class="ml-4 text-red-500">Delete</button>
    </li>
  </ul>
</div>


                <!-- Add Grade Form -->
                <h3 class="text-lg font-semibold mt-4">Add Grade</h3>
                <div class="mt-2">
                    <label class="block text-sm font-medium">Grade:</label>
                    <input v-model="newGrade" type="number" step="0.05" class="border rounded p-2 w-full"
                        placeholder="Enter grade" />
                        <!-- Block Selection -->
                        <div class="mt-2">
                            <label for="blokId" class="block text-sm font-medium">Block:</label>
                            <select
                                v-model="selectedBlokId"
                                class="border rounded p-2 w-full"
                                id="blokId"
                            >
                                <option value="" disabled>Select a block</option>
                                <option v-for="blok in blokken" :key="blok.id" :value="blok.id">
                                    {{ blok.naam }} ({{ blok.start_datum }} - {{ blok.eind_datum }})
                                </option>
                            </select>
                        </div>
                    <button @click="submitGrade" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                        Add Grade
                    </button>
                </div>

                <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Header2 from "@/components/header2.vue";

// Variables
const route = useRoute();
const vakId = route.params.vakId; // Extract vakId from the route
const leerlingen = ref([]); // Students linked to the subject
const vakName = ref(""); // Name of the subject
const selectedStudent = ref(null); // To store the selected student for the modal
const grades = ref([]); // To store the selected student's grades
const newGrade = ref(""); // State for new grade input
const blokken = ref([ // Hardcoded blokken data
    { id: 1, naam: "Blok 1", start_datum: "2024-01-01", eind_datum: "2024-03-31" },
    { id: 2, naam: "Blok 2", start_datum: "2024-04-01", eind_datum: "2024-06-30" },
    { id: 3, naam: "Blok 3", start_datum: "2024-09-01", eind_datum: "2024-12-31" },
]);
const selectedBlokId = ref(""); // Selected block ID

// Fetch students and subject details when the component is mounted
// Fetch students and ensure uniqueness
onMounted(async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. User might not be authenticated.");
            return;
        }

        // Fetch students linked to the vak (subject)
        const response = await axios.get(`http://localhost:3007/vakken/${vakId}/leerlingen`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Remove duplicate students based on leerling_id
        const uniqueStudents = response.data.reduce((acc, student) => {
            if (!acc.find(item => item.leerling_id === student.leerling_id)) {
                acc.push(student);
            }
            return acc;
        }, []);

        leerlingen.value = uniqueStudents;

        // Fetch vak name
        const vakResponse = await axios.get(`http://localhost:3007/vakken/${vakId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        vakName.value = vakResponse.data.naam;

    } catch (error) {
        console.error("Error fetching students or subject name:", error);
    }
});


// Function to select a student and show the modal
const selectStudent = async (student) => {
    selectedStudent.value = student; // Set the selected student
    await fetchGrades(student.leerling_id); // Ensure to pass the correct student ID
};

// Function to fetch grades for the selected student and subject
const fetchGrades = async (studentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return;
    }

    // Fetch grades for the student and subject
    const response = await axios.get(`http://localhost:3007/vakken/${vakId}/leerlingen/${studentId}/cijfers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    grades.value = response.data; // Store the grades for the student

  } catch (error) {
    console.error("Error fetching grades:", error);
  }
};


// Function to add a new grade
const submitGrade = async () => {
    if (!newGrade.value || !selectedBlokId.value) {
        return alert("Please enter a valid grade and select a block.");
    }

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. User might not be authenticated.");
            return;
        }

        const response = await axios.post(
            "http://localhost:3007/cijfers/docenten_insert",
            {
                leerling_id: selectedStudent.value.leerling_id, // Student ID
                vak_id: vakId, // Subject ID
                blok_id: selectedBlokId.value, // Selected block ID
                cijfer: newGrade.value, // The grade to insert
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert(response.data.message);
        newGrade.value = ""; // Clear grade input
        selectedBlokId.value = ""; // Clear block selection
        fetchGrades(selectedStudent.value.leerling_id); // Refresh grades
    } catch (error) {
        console.error("Error adding grade:", error);
        if (error.response && error.response.status === 403) {
            alert("You are not authorized to add grades for this student or subject.");
        } else {
            alert("Failed to add grade.");
        }
    }
};

const deleteGrade = async (gradeId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return;
    }

    const response = await axios.delete(
      `http://localhost:3007/cijfers/${gradeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message); // Show success message
    fetchGrades(selectedStudent.value.leerling_id); // Refresh the grades
  } catch (error) {
    console.error("Error deleting grade:", error);
    alert("Failed to delete grade.");
  }
};


// Function to close the modal
const closeModal = () => {
    selectedStudent.value = null; // Reset selected student to close the modal
    grades.value = []; // Clear grades when closing the modal
};
</script>


