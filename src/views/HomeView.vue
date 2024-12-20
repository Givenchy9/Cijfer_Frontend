<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'; // Make sure axios is installed

// Reactive variables for login form
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Login function
const login = async () => {
  try {
    // Send POST request to the backend for login
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email: email.value,
      password: password.value,
    });

    if (response.data.success) {
      // Save token to localStorage (or any other storage you prefer)
      localStorage.setItem('authToken', response.data.token);

      // Redirect to dashboard or another protected route
      window.location.href = '/dashboard';
    } else {
      errorMessage.value = response.data.message || 'Invalid login credentials';
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = 'An error occurred. Please try again.';
  }
};
</script>

<template>
  <main
    style="background-image: url('/src/components/img/veenhoop_10_12_07_impres.jpg'); background-size: cover; background-position: center; min-height: 100vh;">
    <div class="flex items-center justify-center min-h-full">
      <form @submit.prevent="login" class="grid grid-cols-2 w-1/2 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <p class="text-center font-bold text-2xl mb-10 col-span-2">Login</p>
        <div v-if="errorMessage" class="col-span-2 text-red-500 text-center mb-4">
          {{ errorMessage }}
        </div>
        <div class="col-span-2">
          <label class="font-bold">Studenten mail</label>
          <input type="email" v-model="email"
            class="block w-full m-auto rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            required />
        </div>
        <div class="col-span-2 mt-2">
          <label class="font-bold">Wachtwoord</label>
          <input type="password" v-model="password"
            class="block w-full m-auto rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            required />
        </div>
        <button type="submit"
          class="col-span-2 w-center mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Login
        </button>
      </form>
    </div>
  </main>
</template>