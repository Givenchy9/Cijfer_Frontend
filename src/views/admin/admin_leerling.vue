<template>
    <div class="admin-page">
      <h1 class="text-2xl font-bold mb-4">All Leerling Users</h1>
      <table class="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Name</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in leerlingen"
            :key="user.id"
            class="hover:bg-gray-100 cursor-pointer"
            @click="fetchGrades(user.id)"
          >
            <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.naam }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.role }}</td>
          </tr>
          <tr v-if="leerlingen.length === 0">
            <td colspan="4" class="text-center text-gray-500 py-4">
              No users with role "leerling" found.
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Popup for displaying grades -->
      <div
        v-if="showGradesPopup"
        class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50"
      >
        <div class="bg-white p-4 rounded shadow-lg w-1/2">
          <h2 class="text-2xl font-bold mb-4">{{ selectedUser.naam }}'s Grades</h2>
          <table class="w-full table-auto border-collapse border border-gray-300 mb-4">
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-gray-300 px-4 py-2">Subject</th>
                <th class="border border-gray-300 px-4 py-2">Grade</th>
                <th class="border border-gray-300 px-4 py-2">Block</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="grade in grades" :key="grade.cijfer_id">
                <td class="border border-gray-300 px-4 py-2">{{ grade.vak_naam }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ grade.cijfer }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ grade.blok_naam }}</td>
              </tr>
              <tr v-if="grades.length === 0">
                <td colspan="3" class="text-center text-gray-500 py-4">
                  No grades found for this student.
                </td>
              </tr>
            </tbody>
          </table>
          <button
            @click="closeGradesPopup"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        leerlingen: [], // To store users with role "leerling"
        showGradesPopup: false, // To toggle visibility of grades popup
        selectedUser: {}, // The user whose grades will be shown
        grades: [], // The grades for the selected user
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
  
        // Filter users with role "leerling"
        this.leerlingen = response.data.filter((user) => user.role === "leerling");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    methods: {
        async fetchGrades(userId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3007/cijfers/student_view?leerling_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    this.selectedUser = this.leerlingen.find((user) => user.id === userId);
    this.grades = response.data;
    this.showGradesPopup = true;
  } catch (error) {
    console.error("Error fetching grades:", error);
  }
},
      closeGradesPopup() {
        this.showGradesPopup = false; // Close the popup
        this.selectedUser = {};
        this.grades = [];
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
  
  .cursor-pointer:hover {
    background-color: #f0f0f0;
  }
  </style>
  