<template>
    <header class="bg-gray-800 rounded-full">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <RouterLink to="/dashboard" class="-m-1.5 p-1.5">
                    <span class="sr-only">Your Company</span>
                    <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        alt="" />
                </RouterLink>
                <RouterLink to="/admin" active-class="bg-gray-400"
                    class="text-sm/6 mx-6 font-semibold bg-cyan-800 text-gray-900 border border-gray-800 focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-900 font-medium rounded-lg text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Home</RouterLink>
            </div>
            <div class="flex lg:hidden">
                <button type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="size-6" aria-hidden="true" />
                </button>
            </div>
            <PopoverGroup class="hidden lg:flex lg:gap-x-2">
                <RouterLink to="/admin/admin_leerling" active-class="bg-gray-400"
                    class="text-sm/6 font-semibold text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Leerlingen</RouterLink>
                <RouterLink to="/admin/admin_docent" active-class="bg-gray-400"
                    class="text-sm/6 font-semibold text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Docenten</RouterLink>
                    <RouterLink to="/admin/admin_users" active-class="bg-gray-400"
                    class="text-sm/6 font-semibold text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Alles</RouterLink>
            </PopoverGroup>
            <!-- Display user's name here -->
            <div class="hidden text-white lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
                <h1>Welcome, {{ userName }}</h1> <!-- Display username -->
                <RouterLink to="/login" @click="logout"
                    class="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg px-4 py-1">
                    Logout
                </RouterLink>
            </div>
        </nav>
        <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:w-full sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <img class="h-8 w-auto"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="size-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                                <DisclosureButton
                                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                    Product
                                    <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'size-5 flex-none']"
                                        aria-hidden="true" />
                                </DisclosureButton>
                                <DisclosurePanel class="mt-2 space-y-2">
                                    <DisclosureButton v-for="item in [...products, ...callsToAction]" :key="item.name"
                                        as="a" :href="item.href"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">
                                        {{ item.name }}</DisclosureButton>
                                </DisclosurePanel>
                            </Disclosure>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
                        </div>
                        <div class="py-6">
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log
                                in</a>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/vue'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'

const products = [
    { name: 'Vak1', description: 'Naam leeraar:', to: '/vak1', icon: ChartPieIcon },
    { name: 'Vak2', description: 'Naam leeraar:', to: '/vak2', icon: CursorArrowRaysIcon },
    { name: 'Vak3', description: 'Naam leeraar:', to: '/vak3', icon: FingerPrintIcon },
    { name: 'Vak4', description: 'Naam leeraar:', to: '/vak4', icon: SquaresPlusIcon },
    { name: 'Vak5', description: 'Naam leeraar:', to: '/vak5', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Kijken wat', href: '#', icon: PlayCircleIcon },
    { name: 'Kijken wat', href: '#', icon: PhoneIcon },
]

const mobileMenuOpen = ref(false)
const users = ref([]); // Reactive variable to store the list of users
const userName = ref(''); // Reactive variable to store the username

const logout = () => {
    try {
        // Clear user data from localStorage
        localStorage.removeItem('naam');
        alert("You have been logged out.");
    } catch (error) {
        console.error("Error during logout:", error);
        alert("Failed to log out. Please try again.");
    }
};
const fetchUsers = async () => {
    try {
        const response = await axios.get("http://localhost:3007/users");
        users.value = response.data; // Update the reactive variable
    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users.");
    }
};

// Retrieve the user's name from localStorage
onMounted(() => {
    const storedUserName = localStorage.getItem('naam');
    if (storedUserName) {
        userName.value = storedUserName; // Set the username to the reactive variable
    }
    fetchUsers();
});
</script>
