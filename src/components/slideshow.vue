<script setup>
import { ref } from "vue";

const slides = [
    { id: 1, src: "img_nature_wide.jpg", caption: "Caption Text" },
    { id: 2, src: "img_snow_wide.jpg", caption: "Caption Two" },
    { id: 3, src: "img_mountains_wide.jpg", caption: "Caption Three" },
];

const slideIndex = ref(0);

const nextSlide = () => {
    slideIndex.value = (slideIndex.value + 1) % slides.length;
};

const prevSlide = () => {
    slideIndex.value = (slideIndex.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index) => {
    slideIndex.value = index;
};
</script>

<template>
    <div
        class="relative slide m-auto mx-auto max-w-screen-lg mt-1 bg-white border border-gray-300 shadow-lg rounded-xl transition-all duration-500 hover:bg-gray-500 hover:px-8">
        <!-- Slides -->
        <div class="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-lg">
            <div v-for="(slide, index) in slides" :key="slide.id"
                class="absolute inset-0 transition-opacity duration-700"
                :class="{ 'opacity-100': slideIndex === index, 'opacity-0': slideIndex !== index }">
                <img :src="slide.src" alt="Slide" class="w-full h-full object-cover" />
                <div
                    class="absolute bottom-12 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2 text-xs sm:text-sm lg:text-base">
                    {{ slide.caption }}
                </div>
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
/* Extra fallback for smooth opacity transitions */
.absolute.inset-0 {
    transition: opacity 0.7s ease-in-out;
}

.slide {
    width: 1050px;
    height: 300px;
}
</style>
