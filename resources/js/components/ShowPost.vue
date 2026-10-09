<template>
  <Navbar />
  <div class="p-6 max-w-2xl mx-auto bg-white shadow rounded">
    <h1 class="text-2xl font-bold mb-4">Show Post</h1>
    <div class="border-b pb-4 mb-4">
      <h2 class="text-xl font-semibold">{{ post.title }}</h2>
    </div>
    <p class="text-gray-700">{{ post.content }}</p>
    <a :href="indexUrl" class="mt-6 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</a>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';

defineProps({
  post: Object,
  indexUrl: String
});
</script>
