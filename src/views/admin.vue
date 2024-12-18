<template>
        <Header3 />
        <RouterView></RouterView>
</template>

<script setup>
import axios from "axios";
import Header3 from "@/components/header3.vue"
import { RouterView } from "vue-router";
</script>

<style>
.admin-page {
    margin: 2rem auto;
    width: 80%;
    max-width: 1200px;
}
</style>
