<template>
    <Header2 />
    <main class="mx-20 my-8">
        <div class="main grid grid-cols-4 bg-red-500 h-80 overflow-auto">
            <RouterLink v-for="(vak, index) in vakken" :key="index" :to="vak.link"
                class="grid grid-cols-3 h-72 m-2 rounded-xl items-center justify-between text-center py-2.5 px-6 text-sm border border-gray-300 shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-500 hover:p-32 hover:rounded">
                <div><i :class="vak.icon"></i></div>
                <div class="text-2xl">{{ vak.name }}</div>
            </RouterLink>
        </div>
    </main>
</template>

<script setup>
import Header2 from "@/components/header2.vue";

// Define an array of objects representing the data for each button
const vakken = [
    { name: "Leerling1", icon: "fa-solid fa-list-ol fa-2xl", link: "/leerlingen" },
    { name: "Leerling1", icon: "fa-solid fa-list-ol fa-2xl", link: "/leerlingen" },
    { name: "Leerling1", icon: "fa-solid fa-list-ol fa-2xl", link: "/leerlingen" },
    { name: "Leerling1", icon: "fa-solid fa-list-ol fa-2xl", link: "/leerlingen" },
];
</script>
<style>
.main {
    height: 600px;
}
</style>
