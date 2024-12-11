<template>
    <Header />
    <div class="grid grid-cols-3 mt-10 m-8">
        <div class="col-span-1">
            <div class="bg-red-500 h-96 rounded-3xl">
                <div></div>
            </div>
        </div>
        <div class="col-span-2 p-6">
            <table class="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr class="bg-green-600 text-white">
                        <th class="px-4 py-2 text-left">Firstname</th>
                        <th class="px-4 py-2 text-left">Lastname</th>
                        <th class="px-4 py-2 text-left">Savings</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white">
                        <td class="px-4 py-2 border border-gray-200">Peter</td>
                        <td class="px-4 py-2 border border-gray-200">Griffin</td>
                        <td class="px-4 py-2 border border-gray-200">$100</td>
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="px-4 py-2 border border-gray-200">Lois</td>
                        <td class="px-4 py-2 border border-gray-200">Griffin</td>
                        <td class="px-4 py-2 border border-gray-200">$150</td>
                    </tr>
                    <tr class="bg-white">
                        <td class="px-4 py-2 border border-gray-200">Joe</td>
                        <td class="px-4 py-2 border border-gray-200">Swanson</td>
                        <td class="px-4 py-2 border border-gray-200">$300</td>
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="px-4 py-2 border border-gray-200">Cleveland</td>
                        <td class="px-4 py-2 border border-gray-200">Brown</td>
                        <td class="px-4 py-2 border border-gray-200">$250</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import Header from '@/components/header.vue'
</script>