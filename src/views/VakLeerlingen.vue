<template>
    <Header2 />
    <main class="mx-20 my-8">
        <h1 class="text-3xl font-bold mb-4">Students in {{ vakName }}</h1>
        <div v-if="leerlingen.length" class="grid grid-cols-1 gap-4">
            <div v-for="(leerling, index) in leerlingen" :key="index" class="p-4 border rounded bg-white shadow">
                <h2 class="text-xl font-semibold">{{ leerling.leerling_naam }}</h2>
                <p class="text-sm">Class: {{ leerling.klas_naam }}</p>
                <p class="text-sm">Class: {{ leerling.cijfers }}</p>
            </div>
        </div>
        <div v-else>
            <p>No students found for this subject.</p>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Header2 from "@/components/header2.vue";

const route = useRoute();
const vakId = route.params.vakId; // Extract vakId from the route
const leerlingen = ref([]);
const vakName = ref("");

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

        leerlingen.value = response.data;

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
</script>
