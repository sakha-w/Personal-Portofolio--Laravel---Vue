<template>
  <div>
    <div v-if="loading" class="glass rounded-2xl p-8 text-sm text-slate-400">Loading education...</div>
    <div v-else-if="error" class="glass rounded-2xl p-8 text-sm text-red-400">{{ error }}</div>
    <div v-else class="space-y-6">
      <div v-for="edu in educations" :key="edu.id" class="glass rounded-2xl p-6 sm:p-8">
        <h3 class="font-bold text-white text-lg">{{ edu.degree }}</h3>
        <p class="text-sm font-medium text-indigo-400">{{ edu.institution }}</p>
        <p class="text-xs text-slate-500 mt-1">{{ edu.location }} · {{ edu.period }} · GPA {{ edu.gpa }}</p>
        <p v-if="edu.thesis" class="text-xs text-slate-400 mt-3 italic">Thesis: "{{ edu.thesis }}"</p>
        <p v-if="edu.description" class="text-sm text-slate-300 mt-2">{{ edu.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_BASE = 'http://localhost:8000/api';
const educations = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/educations`);
    const json = await res.json();
    educations.value = json.data ?? [];
  } catch {
    error.value = 'Could not load education. Make sure the Laravel API is running.';
  } finally {
    loading.value = false;
  }
});
</script>
