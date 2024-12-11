<template>
    <div class="mt-12 grid grid-cols-2 w-1/2 m-auto">
        <div class="row-span-3">
            <div
                class="bg-white profile h-80 border border-gray-300 shadow-xs m-1 mt-2 p-1 rounded-xl transition-all duration-500 hover:bg-gray-500 hover:p-6 hover:h-80">
                <div class="m-auto relative w-40 h-40 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg class="absolute w-42 h-42 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <!-- <div class="bg-white rounded m-2 h-40 transition-all duration-500 hover:bg-gray-500 hover:p-16">
                    <div>Information Gebruiker</div>
                </div> -->
            </div>
            <!-- <div class="bg-white rounded m-2 h-40 transition-all duration-500 hover:bg-gray-500 hover:p-16">
                <div>Information Gebruiker</div>
            </div> -->
        </div>
        <RouterLink to="/cijfers"
            class="grid grid-cols-3 h-40 m-2 rounded-xl items-center justify-between text-center py-2.5 px-6 text-sm border border-gray-300 shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-500 hover:p-16 hover:h-44">
            <div><i class="fa-solid fa-list-ol fa-2xl"></i></div>
            <div class="text-2xl">Cijfers</div>
        </RouterLink>
        <RouterLink to="/settings"
            class="grid grid-cols-3 h-36 m-2 rounded-xl items-center justify-between text-center py-2.5 px-6 text-sm border border-gray-300 shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-500 hover:p-16 hover:h-44">
            <div><i class="fa-solid fa-gear fa-2xl"></i></div>
            <div class="text-2xl">Instellingen</div>
        </RouterLink>
        <!-- <div
            class="grid grid-cols-12 col-span-2 h-40 m-2 text-center py-2.5 text-sm border border-gray-300 shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-500 hover:p-16 hover:h-44">
            <slideshow />
        </div> -->
    </div>
</template>
<script setup lang="ts">
// import slideshow from '@/components/slideshow.vue';
</script>
<style>
.profile {
    height: 320px;
}
</style>