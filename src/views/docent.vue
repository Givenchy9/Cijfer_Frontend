<template>
    <Header2 />
    <main class="mx-20 my-8">
        <p class="text-center text-3xl font-bold mb-4">Vakken</p>
        <div class="grid grid-cols-2">
            <!-- Render each subject dynamically -->
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
import { ref, onMounted } from "vue";
import axios from "axios";

const vakken = ref([]);

onMounted(async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. User might not be authenticated.");
            return;
        }

        const response = await axios.get("http://localhost:3007/docent_vakken", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        vakken.value = response.data.map((vak) => ({
            name: vak.naam,
            icon: "fa-solid fa-list-ol fa-2xl",
            link: `/vak/${vak.id}/leerlingen`,
        }));
    } catch (error) {
        console.error("Error fetching teacher's subjects:", error);
    }
});
</script>

// const vakken = [
// { name: "Vak1", icon: "fa-solid fa-list-ol fa-2xl", link: "/klassen" },
// { name: "Vak2", icon: "fa-solid fa-list-ol fa-2xl", link: "/klassen" },
// { name: "Vak3", icon: "fa-solid fa-list-ol fa-2xl", link: "/klassen" },
// { name: "Vak4", icon: "fa-solid fa-list-ol fa-2xl", link: "/klassen" },
// ];
