<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main
    style="background-image: url('/src/components/img/veenhoop_10_12_07_impres.jpg'); background-size: cover; background-position: center; min-height: 100vh;">
    <div class="flex items-center justify-center min-h-full">
      <form @submit.prevent="login" class="grid grid-cols-2 w-1/2 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <p class="text-center font-bold text-2xl mb-10 col-span-2">Login</p>
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
