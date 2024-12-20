<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const userName = ref('');
const userId = ref(null);
const cijfers = ref([]);

const slideIndex = ref(0);

// Fetch grades and include teacher's name
const fetchGrades = async () => {
    try {
        const storedUserId = localStorage.getItem('userId');
        const storedUserName = localStorage.getItem('naam');
        const token = localStorage.getItem('token');

        if (storedUserId && storedUserName && token) {
            userId.value = parseInt(storedUserId, 10);
            userName.value = storedUserName;

            const response = await axios.get('http://localhost:3007/cijfers/student_view', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            cijfers.value = response.data.map((row) => ({
                cijfer_id: row.cijfer_id || null,
                vak_naam: row.vak_naam,
                cijfer: row.cijfer,
                docent_naam: row.docent_naam, // Include teacher's name
            }));
        } else {
            redirectToLogin();
        }
    } catch (error) {
        console.error("Error fetching grades:", error);
    }
};

const redirectToLogin = () => {
    const router = useRouter();
    router.push('/login');
};

const averageGrade = computed(() => {
    if (cijfers.value.length === 0) return 'N/A';
    const total = cijfers.value.reduce((sum, cijfer) => sum + parseFloat(cijfer.cijfer), 0);
    return (total / cijfers.value.length).toFixed(2);
});

onMounted(() => {
    fetchGrades();

    const interval = setInterval(() => {
        slideIndex.value = (slideIndex.value + 1) % slides.value.length;
    }, 2000);

    onBeforeUnmount(() => {
        clearInterval(interval);
    });
});

const slides = computed(() => {
    return cijfers.value.map((grade) => ({
        id: grade.cijfer_id,
        caption: `${grade.vak_naam} - ${grade.cijfer} (${grade.docent_naam})`, // Include teacher's name in the caption
    }));
});

const nextSlide = () => {
    slideIndex.value = (slideIndex.value + 1) % slides.value.length;
};

const prevSlide = () => {
    slideIndex.value = (slideIndex.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index) => {
    slideIndex.value = index;
};
</script>

<template>
    <div class="relative slide m-auto mx-auto max-w-screen-lg mt-1 bg-white border border-gray-300 shadow-lg rounded-xl transition-all duration-500 hover:bg-gray-500 hover:px-8">
        <!-- Slides -->
        <div class="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-lg">
            <div v-for="(slide, index) in slides" :key="slide.id" 
                class="absolute inset-0 transition-opacity duration-700 text-center text-5xl font-bold mt-32" 
                :class="{ 'opacity-100': slideIndex === index, 'opacity-0': slideIndex !== index }">
                {{ slide.caption }}
            </div>
        </div>

        <!-- Controls -->
        <button
            class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black border-2 p-2 lg:p-3 rounded-full shadow-lg hover:bg-gray-200"
            @click="prevSlide">
            ❮
        </button>
        <button
            class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black border-2 p-2 lg:p-3 rounded-full shadow-lg hover:bg-gray-200"
            @click="nextSlide">
            ❯
        </button>

        <!-- Dots -->
        <div class="flex justify-center space-x-2 p-2 -mt-12">
            <span v-for="(slide, index) in slides" :key="slide.id" class="h-3 w-3 rounded-full cursor-pointer" :class="{
                'bg-gray-800': slideIndex === index,
                'bg-gray-400': slideIndex !== index
            }" @click="goToSlide(index)"></span>
        </div>
    </div>
</template>

<style scoped>
.absolute.inset-0 {
    transition: opacity 0.7s ease-in-out;
}

.slide {
    width: 1050px;
    height: 300px;
}
</style>
