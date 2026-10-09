<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Simple Post Manager</h1>
      
      <div class="bg-white shadow rounded-lg p-6">
        <p class="text-gray-700">This is a Vue component rendered in Laravel with Tailwind CSS.</p>
        <button 
          @click="count++" 
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Count: {{ count }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>
